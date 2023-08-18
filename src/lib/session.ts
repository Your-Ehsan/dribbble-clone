import jsonwebtoken from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { SessionInterface, UserProfile } from "@/types";
import { createUser, getUser } from "./actions";

const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        // authorization: {
        //   params: {
        //     prompt: "consent",
        //     access_type: "offline",
        //     response_type: "code",
        //   },
        // },
      }),
    ],

    jwt: {
      encode: ({ secret, token }) => {
        return jsonwebtoken.sign(
          {
            ...token,
            iss: "grafbase",
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          secret,
        );
      },
      decode: async ({ secret, token }) => {
        return jsonwebtoken.verify(token!, secret) as JWT;
      },
    },

    theme: {
      colorScheme: "auto",
      logo: "/assets/logo.png",
    },

    callbacks: {
      async session({ session }) {
        const email = session?.user?.email as string;

        try {
          const data = (await getUser(email)) as { user?: UserProfile };

          return {
            ...session,
            user: {
              ...session.user,
              ...data?.user,
            },
          };
        } catch (error: any) {
          console.error("Error retrieving user data: ", error.message);
          return session;
        }
      },

      async signIn({ user }: { user: AdapterUser | User }) {
        try {
          const userExists = (await getUser(user?.email as string)) as {
            user?: UserProfile;
          };

          if (!userExists.user) {
            await createUser(
              user.name as string,
              user.email as string,
              user.image as string,
            );
          }

          return true;
        } catch (error: any) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      },
    },
  },
  getCurrentUser = async () => {
    const session = (await getServerSession(authOptions)) as SessionInterface;
    return session;
  };

export { authOptions, getCurrentUser };
