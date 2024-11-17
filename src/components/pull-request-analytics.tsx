import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { PullRequest } from '@/types/github';
import { GitPullRequest, Check, X } from 'lucide-react';

interface PullRequestAnalyticsProps {
  username: string;
  token?: string | null;
}

export function PullRequestAnalytics({ username, token }: PullRequestAnalyticsProps) {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPRs = async () => {
      if (!username) return;

      try {
        // Ensure headers are correctly typed
        const headers: { [key: string]: string } = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=100`,
          { headers }
        );
        const data = await response.json();

        // Check if 'data.items' exists and is an array
        if (Array.isArray(data.items)) {
          setPrs(data.items);
        } else {
          console.error('Invalid API response', data);
        }
      } catch (error) {
        console.error('Error fetching PRs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPRs();
  }, [username, token]);

  // Defensive check for prs if it's empty or undefined
  const mergedPRs = prs.filter((pr) => pr.merged_at).length;
  const closedPRs = prs.filter((pr) => pr.state === 'closed' && !pr.merged_at).length;
  const openPRs = prs.filter((pr) => pr.state === 'open').length;

  const prData = [
    { name: 'Merged', value: mergedPRs },
    { name: 'Closed', value: closedPRs },
    { name: 'Open', value: openPRs },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitPullRequest className="h-5 w-5" />
          Pull Request Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{mergedPRs}</div>
              <div className="text-sm text-muted-foreground">Merged</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-red-500" />
            <div>
              <div className="text-2xl font-bold">{closedPRs}</div>
              <div className="text-sm text-muted-foreground">Closed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{openPRs}</div>
              <div className="text-sm text-muted-foreground">Open</div>
            </div>
          </div>
        </div>

        {/* Show loading indicator or chart */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor' }}
                />
                <YAxis tick={{ fill: 'currentColor' }} axisLine={{ stroke: 'currentColor' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                    color: 'hsl(var(--foreground))',
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
