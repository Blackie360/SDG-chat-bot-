// 3. Create types/next-auth.d.ts to extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
      githubId: string
    }
  }
  interface User {
    githubId: string
  }
}