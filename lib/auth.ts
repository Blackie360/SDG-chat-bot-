import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";

// Initialize Prisma client outside to avoid multiple instances.
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:follow repo", // Adjust the scope to fetch followers, repos, etc.
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        // Attach the user ID to the session object
        session.user.id = user.id;

        // Fetch the user's GitHub data and attach it to the session
        const githubData = await fetchGitHubData(user.accessToken); // You need to define this function

        session.user.githubData = githubData;
      }
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

// Define the function to fetch the GitHub data
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

  const recentActivity = [...followers, ...repos, ...issues, ...prs]; // Example combining activities

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
