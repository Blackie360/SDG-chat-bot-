import { Card, CardContent } from '@/components/ui/card';
import type { Repository } from '@/types/github';
import {
  Eye,
  GitFork,
  MessageSquare,
  Star
} from 'lucide-react';

interface StatsCardsProps {
  repos: Repository[];
}

export function StatsCards({ repos }: StatsCardsProps) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchers_count, 0);
  const totalIssues = repos.reduce((sum, repo) => sum + repo.open_issues_count, 0);

  const stats = [
    {
      label: 'Total Stars',
      value: totalStars,
      icon: Star,
    },
    {
      label: 'Total Forks',
      value: totalForks,
      icon: GitFork,
    },
    {
      label: 'Watchers',
      value: totalWatchers,
      icon: Eye,
    },
    {
      label: 'Open Issues',
      value: totalIssues,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-2">
              <stat.icon className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}