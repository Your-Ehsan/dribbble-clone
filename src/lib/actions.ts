import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";

// 📐 Action setup for grafbase
const isProduction: boolean = process.env.NODE_ENV === "production",
  apiUrl: string = isProduction
    ? process.env.GRAFBASE_API_URL || ""
    : "http://127.0.0.1:4000/graphql",
  apikey: string = isProduction
    ? process.env.GRAFBASE_API_KEY || ""
    : "1234567890abcdefghijklmnopqrstuvwxyz",
  serverUrl: string | undefined = isProduction
    ? process.env.GRAFBASE_ADMIN_API_URL
    : "http://localhost:3000",
  client = new GraphQLClient(apiUrl),
  makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
      return await client.request(query, variables);
    } catch (error: any) {
      throw error;
    }
  };

//🎬 actions for grafbase
const getUser = async (email: string) => {
    try {
      client.setHeader("x-api-key", apikey);
      return await makeGraphQLRequest(getUserQuery, { email });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createUser = async (name: string, email: string, avatarUrl: string) => {
    client.setHeader("x-api-key", apikey);
    return makeGraphQLRequest(createUserMutation, {
      input: {
        name: name,
        email: email,
        avatarUrl: avatarUrl,
      },
    });
  };

export { getUser, createUser };
