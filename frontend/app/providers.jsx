"use client";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient"; // yaha tumhara apollo client import karo

export default function Providers({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
