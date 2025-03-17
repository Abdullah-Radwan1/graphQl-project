import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import passport from "passport";
import mergedResolvers from "./resolvers/resovler.js";
import mergedDefs from "./typeDefs/typeDefs.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/userModel.js";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./passport/passport.js";
dotenv.config();
configurePassport();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start(); // This is required before using expressMiddleware
//creating sesion collection in mongoDB
const mongoStore = ConnectMongoDBSession(session);
const store = new mongoStore({
  collection: "sessions",
  uri: process.env.MONGO_URI,
});
store.on("error", (error) => {
  console.log(error);
});

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// Use sessions

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure to true only in production
      sameSite: "strict",
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID into session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id); // Find user by ID
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Apply Apollo Server middleware with express
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

connect();

// Listen to HTTP server
httpServer.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
);
