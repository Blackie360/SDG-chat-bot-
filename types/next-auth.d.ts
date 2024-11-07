
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      githubData?: {
        name: string;
        githubId: string;
        followers: Array<any>;
        repos: Array<any>;
        issues: Array<any>;
        prs: Array<any>;
        recentActivity: Array<any>;
      };
    };
  }

  interface User {
    githubData?: {
      name: string;
      githubId: string;
      followers: Array<any>;
      repos: Array<any>;
      issues: Array<any>;
      prs: Array<any>;
      recentActivity: Array<any>;
    };
  }
}
