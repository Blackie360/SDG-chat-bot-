import { GitHubUser } from '@/types/github';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Star, 
  GitPullRequest, 
  Building2, 
  MapPin, 
  Mail, 
  Link as LinkIcon 
} from 'lucide-react';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="p-6 mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-items-center">
        <Avatar className="h-32 w-32 md:h-24 md:w-24 mb-4">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="col-span-3 md:col-span-1 text-center md:text-left">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <a 
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              @{user.login}
            </a>
          </div>
          
          {user.bio && <p className="text-muted-foreground mb-4">{user.bio}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{user.followers} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{user.following} following</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>{user.public_repos} repositories</span>
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4" />
              <span>{user.public_gists} gists</span>
            </div>
          </div>
          
          <div className="grid gap-2">
            {user.company && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${user.email}`} className="hover:text-primary">
                  {user.email}
                </a>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
