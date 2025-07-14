
"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useToast } from "@/hooks/use-toast";
import {
  type SignupData,
  type LoginData,
  type Profile,
} from "@/lib/types";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile } from "@/lib/actions";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  signupWithEmail: (data: SignupData) => Promise<void>;
  loginWithEmail: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const noOpPromise = () => Promise.resolve();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  // Handle redirect result on initial load
  useEffect(() => {
    if (!auth) return;

    const handleRedirect = async () => {
      try {
        setLoading(true);
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          toast({
            title: "Logged In!",
            description: `Welcome back, ${result.user.displayName}!`,
          });
          const userProfile = await getCurrentUserProfile();
          if (!userProfile?.domain) {
            router.push("/profile?setup=true");
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
        toast({
          title: "Login Failed",
          description: "Could not complete login. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    handleRedirect();
  }, [router, toast]);

  // Listen for auth state changes
  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        try {
          const userProfile = await getCurrentUserProfile();
          setProfile(userProfile);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) return;
    const googleProvider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error logging in with Google: ", authError);
      let description = "An unknown error occurred.";
      if (authError.code === 'auth/unauthorized-domain') {
          description = "This domain is not authorized for login. Please contact support.";
      }
      toast({
        title: "Login Failed",
        description: description,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const signupWithEmail = async ({ email, password }: SignupData) => {
    if (!auth) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account Created!",
        description: "You have successfully signed up.",
      });
      router.push("/profile?setup=true");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing up: ", authError);
      toast({
        title: "Signup Failed",
        description: authError.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async ({ email, password }: LoginData) => {
    if (!auth) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged In!",
        description: `Welcome back!`,
      });
      router.push("/");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error logging in: ", authError);
      toast({
        title: "Login Failed",
        description: authError.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!auth) return;
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = auth
    ? {
        user,
        profile,
        loading,
        loginWithGoogle,
        signupWithEmail,
        loginWithEmail,
        logout,
      }
    : {
        user: null,
        profile: null,
        loading,
        loginWithGoogle: noOpPromise,
        signupWithEmail: noOpPromise,
        loginWithEmail: noOpPromise,
        logout: noOpPromise,
      };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
