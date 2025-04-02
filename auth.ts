import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exampl@user.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }

        if (!existingUser.password) {
          return null;
        }

        const isValidPassword = await compare(
          credentials.password,
          existingUser.password
        );

        if (!isValidPassword) {
          return null;
        }
        return {
          id: `${existingUser.id}`,
          email: `${existingUser.email}`,
          name: existingUser.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback", token, user);
      console.log("User", user);
         // Merge user data into token during initial sign-in
    if (user) {
      return {
        ...token,
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
    
    // Subsequent calls: return existing token
    return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name,
        }
      };
    },
  },
});
