"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
const client = new ApolloClient({
 uri: "http://localhost:4000/graphql",
 cache: new InMemoryCache(),
 credentials: "include",
});
const Provider = ({ children }: { children: React.ReactNode }) => {
 return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
