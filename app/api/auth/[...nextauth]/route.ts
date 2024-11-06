import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient();
}
prisma = global.prisma;

const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

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
      return `${baseUrl}/dashboard`;
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
  debug: true, // Enable detailed logs
});

export { handler as GET, handler as POST };
