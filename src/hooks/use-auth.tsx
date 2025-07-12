"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User, type AuthError } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
  const { toast } = useToast();
  if (!auth || !googleProvider) {
    console.error("Firebase is not configured. Please add your credentials to .env to enable authentication.");
    toast({
        title: "Login Unavailable",
        description: "Authentication is not configured. Please check the setup.",
        variant: "destructive",
    });
    return;
  }
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    const authError = error as AuthError;
    if (authError.code === 'auth/popup-closed-by-user') {
        toast({
            title: "Login Canceled",
            description: "The sign-in popup was closed. Please check your browser's popup blocker and try again.",
            variant: "destructive",
        });
    } else {
        console.error("Error logging in with Google: ", authError);
        toast({
            title: "Login Failed",
            description: "An unexpected error occurred during login. Please try again.",
            variant: "destructive",
        });
    }
  }
};

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