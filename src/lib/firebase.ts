import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GithubAuthProvider, 
  Auth,
  browserLocalPersistence
} from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const githubProvider: GithubAuthProvider = new GithubAuthProvider();
export const database: Database = getDatabase(app);

// Configure GitHub provider with required scopes
githubProvider.addScope('repo');
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');

// Set persistence to local to improve sign-in reliability
auth.setPersistence(browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });