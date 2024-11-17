import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  signInWithPopup, 
  signOut, 
  GithubAuthProvider, 
  UserCredential, 
  AuthError,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, githubProvider } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export function useGitHubAuth() {
  const [user, loading, error] = useAuthState(auth);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const updateToken = async () => {
      if (user) {
        const credential = GithubAuthProvider.credentialFromResult(user as unknown as UserCredential);
        setGithubToken(credential?.accessToken ?? null);
      } else {
        setGithubToken(null);
      }
    };

    updateToken();
  }, [user]);

  const login = async (): Promise<void> => {
    try {
      // Set persistence to local
      await auth.setPersistence(browserLocalPersistence);

      // Configure GitHub provider
      githubProvider.setCustomParameters({
        allow_signup: 'false',
        prompt: 'consent'
      });
      
      // Show a toast to inform users about the popup
      toast({
        title: 'GitHub Sign In',
        description: 'Please allow the popup to sign in with GitHub.',
      });

      const result: UserCredential = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      
      if (credential?.accessToken) {
        setGithubToken(credential.accessToken);
        toast({
          title: 'Success',
          description: 'Successfully signed in with GitHub!',
        });
      } else {
        throw new Error('Failed to get GitHub access token');
      }
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      
      if (error instanceof Error) {
        const authError = error as AuthError;
        
        switch (authError.code) {
          case 'auth/popup-blocked':
            toast({
              title: 'Popup Blocked',
              description: 'Please allow popups in your browser and try again.',
              variant: 'destructive',
            });
            break;
          case 'auth/popup-closed-by-user':
            toast({
              title: 'Authentication Cancelled',
              description: 'Sign in was cancelled. Please try again.',
              variant: 'destructive',
            });
            break;
          default:
            toast({
              title: 'Authentication Error',
              description: authError.message || 'Failed to sign in with GitHub',
              variant: 'destructive',
            });
        }
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setGithubToken(null);
      toast({
        title: 'Signed Out',
        description: 'Successfully signed out.',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      if (error instanceof Error) {
        toast({
          title: 'Sign Out Error',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  return { 
    user, 
    loading, 
    error, 
    githubToken, 
    login, 
    logout 
  };
}