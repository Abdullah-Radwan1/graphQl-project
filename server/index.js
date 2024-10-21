import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mergedResolvers from "./resolvers/resovler.js";
import mergedDefs from "./typeDefs/typeDefs.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import cors from "cors";
dotenv.config();
const app = express();

app.use(
 "/graphql",
 cors({
  credentials: true,
  origin: "http://localhost:3000",
 })
);
const httpServer = http.createServer(app);
const server = new ApolloServer({
 typeDefs: mergedDefs,
 resolvers: mergedResolvers,
 context: async ({ req }) => ({ token: req.headers.token }),
 plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const mongoStore = ConnectMongoDBSession(session);
const store = new mongoStore({
 collection: "sessions",
 uri: process.env.URI,
});
store.on("error", (error) => {
 console.log(error);
});
const connect = async () => {
 try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connect to DB");
 } catch (err) {
  console.error("MongoDB connection error:", err);
 }
};

app.use(
 session({
  secret: process.env.SECRET,
  cookie: {
   maxAge: 1000 * 60,
   httpOnly: true,
   secure: true,
   sameSite: "strict",
  },
  store: store,
  resave: false,
  saveUninitialized: false,
 })
);
app.use(passport.initialize);
app.use(passport.session());
app.use(
 "/graphql",
 cors({
  origin: "http://localhost:3000",
  credentials: true,
 }),
 express.json(),
 // expressMiddleware accepts the same arguments:
 // an Apollo Server instance and optional configuration options
 expressMiddleware(server, {
  context: async ({ req, res }) => buildContext({ req, res }),
 })
);
connect();
await server.start();
server.applyMiddleware({ app });
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
