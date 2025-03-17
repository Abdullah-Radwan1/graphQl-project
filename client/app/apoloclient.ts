import { ApolloClient, InMemoryCache } from "@apollo/client";

export function initializeApollo() {
  return new ApolloClient({
    uri: process.env.URI, // Replace with your GraphQL server URI
    cache: new InMemoryCache(),
    credentials: "include", // This ensures cookies are sent with requests
  });
}
