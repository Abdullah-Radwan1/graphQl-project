import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergedResolvers from "./resolvers/resovler.js";
import mergeDefs from "./typeDefs/typeDefs.js";
const server = new ApolloServer({
 typeDefs: mergeDefs,
 resolvers: mergedResolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
