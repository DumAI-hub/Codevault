"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

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
  if (!auth || !googleProvider) {
    console.error("Firebase is not configured. Please add your credentials to .env to enable authentication.");
    return;
  }
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error logging in with Google: ", error);
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
