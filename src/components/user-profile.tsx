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
    <Card className="p-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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