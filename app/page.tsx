"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Github, Search, Trophy, Users, GitFork, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Git<span className="text-primary text-green-600">Sync</span>
            </h1>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Discover insights about any GitHub profile. Analyze stats, earn trophies, and manage your connections.
            </p>
          </div>

          <div className="w-full max-w-md flex space-x-2">
            <div className="relative flex-1">
              <Input
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button onClick={fetchGitHubData} disabled={loading}>
              {loading ? "Loading..." : "Search"}
            </Button>
          </div>

          {userData && (
            <div className="w-full max-w-4xl space-y-8">
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <Image
                    width={50}
                    height={50}
                    src={userData?.avatar_url}
                    alt={username}
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                    <p className="text-muted-foreground">@{userData.login}</p>
                    <p className="mt-2">{userData.bio}</p>
                  </div>
                </div>
              </Card>

              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="trophies">Trophies</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="stats">
                  <Card className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Followers</p>
                          <p className="text-2xl font-bold">{userData.followers}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GitFork className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Public Repos</p>
                          <p className="text-2xl font-bold">{userData.public_repos}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Following</p>
                          <p className="text-2xl font-bold">{userData.following}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="trophies">
                  <Card className="p-6">
                    <div className="flex justify-center">
                      <Image
                        width={500}
                        height={500}
                        src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=onedark&column=4`}
                        alt="GitHub Trophies"
                        className="max-w-full"
                      />
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="insights">
                  <Card className="p-6">
                    <div className="text-center">
                      <Trophy className="h-12 w-12 mx-auto text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Connect with GitHub</h3>
                      <p className="text-muted-foreground mb-4">
                        Sign in with GitHub to unlock advanced insights and management features
                      </p>
                      <Button
                        onClick={() => signIn("github")}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Connect GitHub
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
