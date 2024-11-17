import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, UserCheck, UserMinus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Follower {
  login: string;
  avatar_url: string;
  html_url: string;
  id: number; // Added for key prop uniqueness
}

interface FollowerAnalysisProps {
  username: string;
  token?: string;
}

interface GitHubErrorResponse {
  message: string;
  documentation_url?: string;
}

export function FollowerAnalysis({ username, token }: FollowerAnalysisProps) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [following, setFollowing] = useState<Follower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      if (!username) {
        setError('Username is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const [followersRes, followingRes] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}/followers?per_page=100`, {
            headers,
          }),
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}/following?per_page=100`, {
            headers,
          }),
        ]);

        if (!followersRes.ok || !followingRes.ok) {
          const errorData = (await followersRes.json()) as GitHubErrorResponse;
          throw new Error(errorData.message || 'Failed to fetch GitHub data');
        }

        const followersData = (await followersRes.json()) as Follower[];
        const followingData = (await followingRes.json()) as Follower[];

        setFollowers(followersData);
        setFollowing(followingData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching data';
        setError(errorMessage);
        console.error('Error fetching followers:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchFollowers();
  }, [username, token]);

  const mutualFollowers = followers.filter((follower) =>
    following.some((f) => f.login === follower.login)
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Follower Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <div>
              <div className="text-2xl font-bold">{followers.length}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <div>
              <div className="text-2xl font-bold">{following.length}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserMinus className="h-4 w-4" />
            <div>
              <div className="text-2xl font-bold">{mutualFollowers.length}</div>
              <div className="text-sm text-muted-foreground">Mutual</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Mutual Followers</h4>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {mutualFollowers.slice(0, 5).map((follower) => (
                  <a
                    key={follower.id}
                    href={follower.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={follower.avatar_url} alt={follower.login} />
                      <AvatarFallback>
                        {follower.login.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{follower.login}</span>
                  </a>
                ))}
                {mutualFollowers.length === 0 && (
                  <div className="text-sm text-muted-foreground p-2">
                    No mutual followers found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}