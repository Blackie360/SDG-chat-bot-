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
import Loading from './components/Loading';

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
      {/* Responsive header with proper padding */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              <h1 className="text-lg sm:text-xl font-bold">Git<span className="text-xl sm:text-2xl text-red-600">Sync</span></h1>
            </div>
            
            {!authLoading && (
              user ? (
                <Button onClick={logout} variant="outline" className="text-sm sm:text-base">
                  Sign Out
                </Button>
              ) : (
                <Button onClick={login} variant="default" className="text-sm sm:text-base">
                  <Github className="h-4 w-4 mr-2" />
                  Sign in with GitHub
                </Button>
              )
            )}
          </div>
        </div>
      </header>

      {/* Main content with responsive padding and spacing */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-full max-w-lg">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {dataLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-destructive p-4">{error.message}</div>
        ) : githubUser ? (
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {/* User profile with full width */}
            <div className="w-full">
              <UserProfile user={githubUser} />
            </div>
            
            {repos.length > 0 && (
              <>
                {/* Stats cards with responsive grid */}
                <div className="w-full">
                  <StatsCards repos={repos} />
                </div>
                
                {/* Two-column layout that stacks on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="w-full">
                    <LanguageChart languages={languages} />
                  </div>
                  <div className="w-full">
                    <PullRequestAnalytics 
                      username={githubUser.login} 
                      token={githubToken ?? undefined}
                    />
                  </div>
                </div>

                {/* Full-width calendar */}
                <div className="w-full">
                  <ContributionCalendar username={githubUser.login} />
                </div>

                {/* Two-column layout that stacks on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="w-full">
                    <LiveCommitFeed 
                      username={githubUser.login}
                      token={githubToken ?? undefined}
                    />
                  </div>
                  <div className="w-full">
                    <RepositoryList repos={repos} />
                  </div>
                </div>

                {/* Two-column layout that stacks on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="w-full">
                    <AccountValue 
                      repos={repos}
                      followers={githubUser.followers}
                    />
                  </div>
                  <div className="w-full">
                    <FollowerAnalysis
                      username={githubUser.login}
                      token={githubToken ?? undefined}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-4">
            Search for a GitHub user to see their analytics
          </div>
        )}
      </main>
    </div>
  );
}

export default App;