import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GitCommit } from 'lucide-react';
import type { Commit } from '@/types/github';

interface LiveCommitFeedProps {
  username: string;
  token?: string | null;
}

interface GitHubEvent {
  type: string;
  payload: {
    commits: Array<{
      sha: string;
      message: string;
      author: {
        name: string;
        email: string;
      };
      timestamp: string;
    }>;
  };
  created_at: string;
}

export function LiveCommitFeed({ username, token }: LiveCommitFeedProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      if (!username) return;

      try {
        const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(
          `https://api.github.com/users/${username}/events?per_page=30`,
          { headers }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch commits');
        }

        const events: GitHubEvent[] = await response.json();
        const pushEvents = events
          .filter((event) => event.type === 'PushEvent' && event.payload?.commits)
          .flatMap((event) => 
            event.payload.commits.map((commit) => ({
              sha: commit.sha,
              commit: {
                message: commit.message || 'No message provided',
                author: {
                  name: commit.author?.name || 'Unknown',
                  date: event.created_at
                }
              }
            }))
          );
        
        setCommits(pushEvents);
      } catch (error) {
        console.error('Error fetching commits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
    const interval = setInterval(fetchCommits, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [username, token]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="h-5 w-5" />
            Live Commit Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">Loading commits...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCommit className="h-5 w-5" />
          Live Commit Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {commits.length > 0 ? (
            <div className="space-y-4">
              {commits.map((commit) => (
                <div
                  key={commit.sha}
                  className="p-3 rounded-lg border bg-card text-card-foreground"
                >
                  <p className="font-medium truncate">
                    {commit.commit.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>{commit.commit.author.name}</span>
                    <span>•</span>
                    <span>
                      {new Date(commit.commit.author.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No recent commits found</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}