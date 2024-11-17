import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GithubAuthProvider, 
  Auth,
  browserLocalPersistence
} from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD3rBYuzeSLOOdRzLOqUjkLwn8nnetggxU",
  authDomain: "auth-333bc.firebaseapp.com",
  projectId: "auth-333bc",
  storageBucket: "auth-333bc.appspot.com",
  messagingSenderId: "905826499291",
  appId: "1:905826499291:web:d1fdea4db605b9e9162afe"
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