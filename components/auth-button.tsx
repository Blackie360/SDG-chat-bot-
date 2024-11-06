"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button disabled>
        <Github className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <Button variant="outline" onClick={() => signOut()}>
        <img src={session.user?.image!} alt="" className="w-4 h-4 mr-2 rounded-full" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn("github")}>
      <Github className="mr-2 h-4 w-4" />
      Sign in with GitHub
    </Button>
  );
}