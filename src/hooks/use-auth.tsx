"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
    onAuthStateChanged, 
    signOut, 
    type User, 
    type AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signInWithRedirect,
    getRedirectResult,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from './use-toast';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

async function getAuthToken() {
    if (auth?.currentUser) {
        return await auth.currentUser.getIdToken();
    }
    return null;
}

// We need to override fetch to include the auth token in headers
// for our Server Actions to be authenticated.
const originalFetch = global.fetch;
global.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const token = await getAuthToken();
    const headers = new Headers(init?.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return originalFetch(input, { ...init, headers });
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Handle the redirect result from Google login
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          // This is a new user signing in via redirect.
          const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
          if (isNewUser) {
            router.push('/profile');
          }
        }
      })
      .catch((error) => {
        const authError = error as AuthError;
        console.error("Error getting redirect result: ", authError);
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred during login. Please try again.",
          variant: "destructive",
        });
      });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const loginWithGoogle = async () => {
  if (!auth || !googleProvider) {
    toast({
        title: "Login Unavailable",
        description: "Authentication is not configured. Please check the setup.",
        variant: "destructive",
    });
    return;
  }
  try {
    // Use signInWithRedirect instead of signInWithPopup
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error logging in with Google: ", authError);
    if (authError.code === 'auth/unauthorized-domain') {
        toast({
            title: "Domain Not Authorized",
            description: "This app's domain is not authorized for Firebase login. Please add it to your Firebase project's Authentication settings.",
            variant: "destructive",
        });
    } else {
        toast({
            title: "Login Failed",
            description: "An unexpected error occurred during login. Please try again.",
            variant: "destructive",
        });
    }
  }
};

const getFirebaseAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'No user found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/email-already-in-use':
            return 'An account already exists with this email address.';
        case 'auth/weak-password':
            return 'The password is too weak. Please use a stronger password.';
        default:
            return 'An unexpected authentication error occurred. Please try again.';
    }
}


export const loginWithEmail = async (email: string, password: string) => {
    if (!auth) {
        return { success: false, error: "Firebase not configured." };
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        const authError = error as AuthError;
        return { success: false, error: getFirebaseAuthErrorMessage(authError.code) };
    }
}

export const signupWithEmail = async (email: string, password: string, displayName: string) => {
    if (!auth) {
        return { success: false, error: "Firebase not configured." };
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        // After signup, redirect to profile page
        const isNewUser = userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime;
        if(isNewUser){
            const router = useRouter();
            router.push('/profile');
        }
        return { success: true };
    } catch (error) {
        const authError = error as AuthError;
        return { success: false, error: getFirebaseAuthErrorMessage(authError.code) };
    }
}

export const logout = async () => {
  if (!auth) {
    console.error("Firebase is not configured. Please add your credentials to .env to enable authentication.");
    return;
  }
  try {
    await signOut(auth);
  } catch (error)
  {
    console.error("Error signing out: ", error);
  }
};
