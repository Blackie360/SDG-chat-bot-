import { useState, useEffect } from 'react';
import type { GitHubUser, Repository, LanguageStats } from '@/types/github';

interface GitHubAPIProps {
  username: string;
  token?: string | null;
}

export function useGitHubAPI({ username, token }: GitHubAPIProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResponse.ok) throw new Error('User not found');
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();

        // Calculate language statistics
        const langStats: LanguageStats = {};
        await Promise.all(
          reposData.map(async (repo: Repository) => {
            if (repo.language) {
              langStats[repo.language] = (langStats[repo.language] || 0) + 1;
            }
          })
        );

        setUser(userData);
        setRepos(reposData);
        setLanguages(langStats);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch GitHub data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, token]);

  return { user, repos, languages, loading, error };
}