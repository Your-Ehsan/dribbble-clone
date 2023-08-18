import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from "@/graphql";
import { ProjectForm } from "@/types";
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
    ? process.env.NEXT_PUBLIC_SERVER_URL
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
  },
  uploadImage = async (imagePath: string) => {
    try {
      const res = await fetch(`${serverUrl}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ path: imagePath }),
      });
      return res.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  createNewProject = async (
    form: ProjectForm,
    creatorId: string,
    token: string,
  ) => {
    try {
      const { url } = await uploadImage(form?.image);
      if (url) {
        client.setHeader("Authorization", `Bearer ${token}`);
        return makeGraphQLRequest(createProjectMutation, {
          input: {
            ...form,
            image: url,
            createdBy: {
              link: creatorId,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  fetchToken = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/auth/token`);
      return res.json();
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export { getUser, createUser, createNewProject, fetchToken };
