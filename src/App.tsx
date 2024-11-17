import { useState } from 'react';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';
import { useGitHubAPI } from '@/hooks/useGitHubAPI';
import { SearchBar } from '@/components/ui/search-bar';
import { UserProfile } from '@/components/user-profile';
import { LanguageChart } from '@/components/language-chart';
import { RepositoryList } from '@/components/repository-list';
import { StatsCards } from '@/components/stats-cards';
import { PullRequestAnalytics } from '@/components/pull-request-analytics';
import { ContributionCalendar } from '@/components/contribution-calendar';
import { LiveCommitFeed } from '@/components/live-commit-feed';
import { AccountValue } from '@/components/account-value';
import { FollowerAnalysis } from '@/components/follower-analysis';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

function App() {
  const { user, loading: authLoading, githubToken, login, logout } = useGitHubAuth();
  const [searchUsername, setSearchUsername] = useState<string>('');
  
  const { 
    user: githubUser, 
    repos, 
    languages,
    loading: dataLoading,
    error 
  } = useGitHubAPI({ 
    username: searchUsername || (user?.providerData[0]?.uid ?? ''),
    token: githubToken 
  });

  const handleSearch = (username: string) => {
    setSearchUsername(username);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-6 w-6" />
              <h1 className="text-xl font-bold">Git<span className='text-2xl text-red-600'>Scope</span></h1>
            </div>
            
            {!authLoading && (
              user ? (
                <Button onClick={logout} variant="outline">
                  Sign Out
                </Button>
              ) : (
                <Button onClick={login} variant="default">
                  <Github className="h-4 w-4 mr-2" />
                  Sign in with GitHub
                </Button>
              )
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {dataLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-destructive">{error.message}</div>
        ) : githubUser ? (
          <div className="grid gap-8">
            <UserProfile user={githubUser} />
            
            {repos.length > 0 && (
              <>
                <StatsCards repos={repos} />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <LanguageChart languages={languages} />
                  <PullRequestAnalytics 
                    username={githubUser.login} 
                    token={githubToken ?? undefined}
                  />
                </div>

                <ContributionCalendar username={githubUser.login} />

                <div className="grid md:grid-cols-2 gap-8">
                  <LiveCommitFeed 
                    username={githubUser.login}
                    token={githubToken ?? undefined}
                  />
                  <RepositoryList repos={repos} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <AccountValue 
                    repos={repos}
                    followers={githubUser.followers}
                  />
                  <FollowerAnalysis
                    username={githubUser.login}
                    token={githubToken ?? undefined}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Search for a GitHub user to see their analytics
          </div>
        )}
      </main>
    </div>
  );
}

export default App;