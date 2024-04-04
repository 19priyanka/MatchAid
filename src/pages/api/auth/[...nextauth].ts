import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserType } from "../../../CustomTypes/UserType";

async function auth(request: NextApiRequest, response: NextApiResponse) {
  return NextAuth(request, response, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "username",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials) {
          if (
            credentials?.username === UserType.GUEST &&
            credentials?.password === UserType.GUEST
          ) {
            return {
              name: UserType.GUEST,
              email: UserType.GUEST,
              userType: UserType.GUEST,
            };
          }

          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (res.ok && user) {
            return {
              ...user,
              name: user.userType,
            };
          }
          return null;
        },
      }),
    ],
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
    },
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ account }) {
        if (account?.provider === "credentials") {
          return true;
        }

        return false;
      },

      async session({ session }) {
        return session;
      },
    },
    secret: process.env.NEXT_AUTH_SECRET,
  });
}

export default auth;
