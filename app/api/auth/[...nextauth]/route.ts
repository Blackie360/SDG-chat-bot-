import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";  // Import the centralized authOptions

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Check if the user is coming from the root or login page and force redirect to /dashboard
      if (url === baseUrl || url === '/') {
        return `${baseUrl}/dashboard`;  // Redirect to /dashboard after successful login
      }
      return url;  // If there's a custom redirect URL, honor it
    },
    async session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;  // Attach user ID to the session object
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
