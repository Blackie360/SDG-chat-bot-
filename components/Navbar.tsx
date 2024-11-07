"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Github } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect user to dashboard on successful sign-in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <nav className="flex items-center justify-between p-4  text-white shadow-md">
      <div className="text-lg font-semibold">GitSync</div>

      <div>
        {status === "loading" ? (
          <Button disabled className="flex items-center gap-2 px-4 py-2 bg-gray-600">
            <Github className="h-5 w-5" />
            Loading...
          </Button>
        ) : session ? (
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
          >
            <Image
              width={24}
              height={24}
              src={session.user?.image!}
              alt="User profile picture"
              className="w-6 h-6 rounded-full"
            />
            <span>Sign Out</span>
          </Button>
        ) : (
          <Button
            onClick={() => signIn("github")}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-600"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </Button>
        )}
      </div>
    </nav>
  );
}
