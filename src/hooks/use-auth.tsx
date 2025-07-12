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
  try {
    if (!auth || !googleProvider) {
        throw new Error("Firebase not initialized");
    }
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error logging in with Google: ", error);
  }
};

export const logout = async () => {
  try {
    if (!auth) {
        throw new Error("Firebase not initialized");
    }
    await signOut(auth);
  } catch (error)
  {
    console.error("Error signing out: ", error);
  }
};
