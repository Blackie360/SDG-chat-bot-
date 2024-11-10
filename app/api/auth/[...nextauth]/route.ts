// /app/api/auth/[...nextauth]/route.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { AuthOptions, DefaultSession, Session } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { GitHubData } from "@/types/github"
import { GitHubRepo } from "@/types/github"
import { GitHubProfile } from "@/types/github"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      githubId: string
      repos?: GitHubRepo[]
      recentActivity?: any[]
      stars?: number
      forks?: number
    } & DefaultSession["user"]
  }

  interface User {
    githubId: string
    repos?: GitHubRepo[]
    recentActivity?: any[]
    stars?: number
    forks?: number
  }
}

const prisma = new PrismaClient()

async function fetchGitHubData(accessToken: string): Promise<GitHubData> {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github.v3+json',
  }

  try {
    // Fetch user data
    const userResponse = await fetch('https://api.github.com/user', { headers })
    const userData = await userResponse.json()

    // Fetch repositories
    const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', { headers })
    const reposData = await reposResponse.json()

    // Fetch recent activity
    const activitiesResponse = await fetch(`https://api.github.com/users/${userData.login}/events/public?per_page=30`, { headers })
    const activitiesData = await activitiesResponse.json()

    return {
      user: userData,
      repos: reposData,
      activities: activitiesData,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    throw error
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
          scope: "read:user user:email repo",
        }
      },
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubId: profile.id.toString(),
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }): Promise<Session> {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          githubId: true,
          repos: true,
          recentActivity: true,
          stars: true,
          forks: true,
        },
      })

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          githubId: user.githubId,
          repos: dbUser?.repos as GitHubRepo[],
          recentActivity: dbUser?.recentActivity as any[],
          stars: dbUser?.stars || 0,
          forks: dbUser?.forks || 0,
        },
      }
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && account.access_token) {
        try {
          const githubData = await fetchGitHubData(account.access_token)
          
          await prisma.user.upsert({
            where: { 
              githubId: (profile as GitHubProfile).id.toString() 
            },
            update: {
              githubData: profile as any,
              repos: githubData.repos as any,
              recentActivity: githubData.activities as any,
              stars: githubData.repos.reduce((acc: number, repo: GitHubRepo) => 
                acc + (repo.stargazers_count || 0), 0),
              forks: githubData.repos.reduce((acc: number, repo: GitHubRepo) => 
                acc + (repo.forks_count || 0), 0),
              updatedAt: new Date(),
            },
            create: {
              githubId: (profile as GitHubProfile).id.toString(),
              name: (profile as GitHubProfile).name || (profile as GitHubProfile).login,
              email: (profile as GitHubProfile).email,
              image: (profile as GitHubProfile).avatar_url,
              githubData: profile as any,
              repos: githubData.repos as any,
              recentActivity: githubData.activities as any,
              stars: githubData.repos.reduce((acc: number, repo: GitHubRepo) => 
                acc + (repo.stargazers_count || 0), 0),
              forks: githubData.repos.reduce((acc: number, repo: GitHubRepo) => 
                acc + (repo.forks_count || 0), 0),
            },
          })
          return true
        } catch (error) {
          console.error("Error saving GitHub data:", error)
          return true // Still allow sign in even if saving extra data fails
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

