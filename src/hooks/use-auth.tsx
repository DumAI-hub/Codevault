
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
import { getCurrentUserProfile, createInitialUserProfile } from "@/lib/actions";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  signupWithEmail: (data: SignupData) => Promise<void>;
  loginWithEmail: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthContextWithRefresh extends AuthContextType {
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextWithRefresh | undefined>(undefined);

const noOpPromise = () => Promise.resolve();

// Helper function to set authentication cookie
async function setAuthCookie(idToken: string) {
  try {
    console.log(`Setting auth cookie with token (length: ${idToken.length})`);
    const response = await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to set auth cookie');
    }
    
    const result = await response.json();
    console.log('Auth cookie set successfully:', result);
    return result;
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    throw error;
  }
}

async function fetchProfileData(idToken?: string, retryCount = 0): Promise<Profile | null> {
    try {
      console.log(`Fetching profile data (attempt ${retryCount + 1})${idToken ? ' with token' : ' via cookie'}...`);
      const userProfile = await getCurrentUserProfile(idToken);
      console.log('Profile data fetched:', userProfile);
      return userProfile;
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      // Retry once if this is the first attempt and we get an auth error
      if (retryCount === 0 && error instanceof Error && error.message.includes('auth')) {
        console.log('Retrying profile fetch due to auth error...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        return fetchProfileData(idToken, 1);
      }
      return null;
    }
}


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
        if (!auth) return;
        
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log(`Google login successful for user: ${result.user.uid}`);
          
          // Ensure profile exists for Google login users
          try {
            const idToken = await result.user.getIdToken();
            const profileResult = await createInitialUserProfile(idToken);
            console.log("Profile creation result after Google login:", profileResult);
          } catch (profileError) {
            console.error("Failed to create profile after Google login:", profileError);
          }
          
          toast({
            title: "Logged In!",
            description: `Welcome back, ${result.user.displayName}!`,
          });
          
          const userProfile = await fetchProfileData();
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
      }
    };
    
    handleRedirect();
  }, [router, toast]);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', { user: !!user, uid: user?.uid, email: user?.email });
      setLoading(true);
      if (user) {
        console.log(`Setting user state for: ${user.uid}`);
        setUser(user);
        
        // Get ID token for immediate operations
        const idToken = await user.getIdToken();
        console.log(`Getting ID token for user ${user.uid}, token length: ${idToken.length}`);
        
        // Set the authentication cookie to sync client and server (for subsequent requests)
        try {
          await setAuthCookie(idToken);
          console.log('Authentication cookie set successfully');
        } catch (error) {
          console.error('Failed to set authentication cookie:', error);
        }
        
        // Fetch profile using the idToken directly (no cookie dependency)
        let userProfile = await fetchProfileData(idToken);
        console.log(`Profile fetch result for ${user.uid}:`, userProfile);
        
        // If no profile exists, create an initial one
        if (!userProfile) {
          console.log(`No profile found for user ${user.uid}, creating initial profile...`);
          try {
            const result = await createInitialUserProfile(idToken);
            console.log("Initial profile creation result:", result);
            
            if (result.success) {
              // Fetch the newly created profile using the same token
              userProfile = await fetchProfileData(idToken);
              console.log("Fetched new profile:", userProfile);
            } else {
              console.error("Failed to create initial profile:", result.error);
              toast({
                title: "Profile Setup Error",
                description: "Could not create your profile. Please try refreshing the page.",
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error("Failed to create initial profile:", error);
            toast({
              title: "Profile Setup Error", 
              description: "Could not create your profile. Please try refreshing the page.",
              variant: "destructive",
            });
          }
        }
        
        console.log(`Setting profile state for ${user.uid}:`, userProfile);
        setProfile(userProfile);
      } else {
        console.log('User logged out, clearing state');
        setUser(null);
        setProfile(null);
        
        // Clear the authentication cookie
        try {
          await fetch('/api/auth/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: null }),
          });
        } catch (error) {
          console.error('Failed to clear auth cookie:', error);
        }
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
      } else if (authError.code === 'auth/popup-closed-by-user') {
          description = "Login canceled. If you are using a pop-up blocker, please disable it for this site.";
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create initial profile for the new user
      console.log(`Creating initial profile for new user: ${userCredential.user.uid}`);
      const idToken = await userCredential.user.getIdToken();
      const result = await createInitialUserProfile(idToken);
      
      if (result.success) {
        console.log("Initial profile created successfully");
        toast({
          title: "Account Created!",
          description: "You have successfully signed up.",
        });
        router.push("/profile?setup=true");
      } else {
        console.error("Failed to create initial profile:", result.error);
        toast({
          title: "Account Created",
          description: "Account created but profile setup failed. Please complete your profile.",
          variant: "destructive",
        });
        router.push("/profile?setup=true");
      }
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Ensure profile exists for email login users
      try {
        const idToken = await userCredential.user.getIdToken();
        const profileResult = await createInitialUserProfile(idToken);
        console.log("Profile creation result after email login:", profileResult);
      } catch (profileError) {
        console.error("Failed to create profile after email login:", profileError);
      }
      
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


  // Manual profile refresh function
  const refreshProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const userProfile = await fetchProfileData(idToken);
      setProfile(userProfile);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
    setLoading(false);
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
        refreshProfile,
      }
    : {
        user: null,
        profile: null,
        loading,
        loginWithGoogle: noOpPromise,
        signupWithEmail: noOpPromise,
        loginWithEmail: noOpPromise,
        logout: noOpPromise,
        refreshProfile: async () => {},
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
