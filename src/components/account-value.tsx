import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import type { Repository } from '@/types/github';

interface AccountValueProps {
  repos: Repository[];
  followers: number;
}

export function AccountValue({ repos, followers }: AccountValueProps) {
  // Calculate account value based on various metrics
  const calculateValue = () => {
    const starsValue = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) * 10;
    const forksValue = repos.reduce((sum, repo) => sum + repo.forks_count, 0) * 15;
    const followersValue = followers * 5;
    const reposValue = repos.length * 100;
    
    return starsValue + forksValue + followersValue + reposValue;
  };

  const accountValue = calculateValue();
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(accountValue);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Estimated Account Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-center">{formattedValue}</div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <div className="font-medium">Based on:</div>
            <ul className="list-disc list-inside mt-2">
              <li>{repos.length} repositories</li>
              <li>{followers} followers</li>
              <li>{repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)} total stars</li>
              <li>{repos.reduce((sum, repo) => sum + repo.forks_count, 0)} total forks</li>
            </ul>
          </div>
          <div className="text-xs">
            <p>* This is an estimated value based on various metrics and should not be considered as actual monetary value.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}