import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();
const baseUrl = "http://localhost:3000"; // Ensure this is your correct base URL

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:follow',
        },
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After a successful login, redirect to the dashboard
      return `${baseUrl}/dashboard`;  // Redirects to /dashboard
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
});

export { handler as GET, handler as POST };
