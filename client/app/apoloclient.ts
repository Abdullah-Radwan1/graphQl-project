import { ApolloClient, InMemoryCache } from "@apollo/client";

export function initializeApollo() {
 return new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
  credentials: "include", // This ensures cookies are sent with requests
 });
}
