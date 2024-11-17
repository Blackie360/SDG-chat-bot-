import { Repository } from '@/types/github';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, GitFork, Eye, CircleDot } from 'lucide-react';

interface RepositoryListProps {
  repos: Repository[];
}

export function RepositoryList({ repos }: RepositoryListProps) {
  const sortedRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {sortedRepos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 rounded-lg border bg-card text-card-foreground"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  {repo.private && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      Private
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <CircleDot className="h-4 w-4" />
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {repo.watchers_count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}