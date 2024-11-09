// auth.ts
import { AuthOptions, DefaultSession, getServerSession, Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      githubData?: any;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:follow repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: any; user?: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;

        // Fetch and attach the user's GitHub data to the session
        if (session.user.accessToken) {
          const githubData = await fetchGitHubData(session.user.accessToken);
          session.user.githubData = githubData;
        }
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

// Function to fetch GitHub data
async function fetchGitHubData(accessToken: string) {
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userData = await res.json();

  const followersRes = await fetch(userData.followers_url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const followers = await followersRes.json();

  const reposRes = await fetch(userData.repos_url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const repos = await reposRes.json();

  const issuesRes = await fetch("https://api.github.com/issues", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const issues = await issuesRes.json();

  const prsRes = await fetch("https://api.github.com/pulls", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const prs = await prsRes.json();

  const recentActivity = [...followers, ...repos, ...issues, ...prs];

  return {
    name: userData.name,
    githubId: userData.id,
    followers,
    repos,
    issues,
    prs,
    recentActivity,
  };
}
