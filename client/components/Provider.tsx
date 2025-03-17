"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

// Create and export Apollo Client instance
export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URI,
  cache: new InMemoryCache(),
  credentials: "include",
});

// Optional: Create an initializeApollo function if dynamic reinitialization is needed
export function initializeApollo() {
  return client;
}

// Provider component for wrapping your app
const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
