import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import bodyParser from 'body-parser';
import cors from "cors";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { startStandaloneServer } from '@apollo/server/standalone';
dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: 4000 },
});
