
"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileForm } from "@/components/ProfileForm";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/use-auth";
import { UserProjects } from "@/components/UserProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        // Force a page refresh to reload auth state and profile data
        window.location.reload();
    };

    // Debug logging
    console.log('Profile page state:', { user: !!user, profile, loading });

    return (
        <AuthGuard>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
                <div className="space-y-2 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                            <p className="text-muted-foreground">
                                Update your personal information and view your contributions.
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleRefresh}
                            disabled={refreshing || loading}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                       {loading ? (
                           <div className="space-y-4">
                               <Skeleton className="h-8 w-48" />
                               <Skeleton className="h-32 w-full" />
                               <Skeleton className="h-10 w-24" />
                           </div>
                       ) : profile ? (
                           <ProfileForm initialProfile={profile} />
                       ) : user ? (
                           <div className="text-center py-8 space-y-4">
                               <p className="text-muted-foreground">No profile data available. This might be a temporary issue.</p>
                               <div className="text-sm text-muted-foreground">
                                   <p>User ID: {user.uid}</p>
                                   <p>Email: {user.email}</p>
                               </div>
                               <Button onClick={handleRefresh} variant="outline">
                                   <RefreshCw className="h-4 w-4 mr-2" />
                                   Try Again
                               </Button>
                           </div>
                       ) : (
                           <div className="text-center py-8 space-y-4">
                               <p className="text-muted-foreground">You need to be logged in to view and edit your profile.</p>
                               <div className="flex gap-2 justify-center">
                                   <Button onClick={() => window.location.href = '/login'}>
                                       Sign In
                                   </Button>
                                   <Button onClick={handleRefresh} variant="outline">
                                       <RefreshCw className="h-4 w-4 mr-2" />
                                       Refresh
                                   </Button>
                               </div>
                           </div>
                       )}
                    </div>
                    <div className="lg:col-span-1">
                        {user && <UserProjects authorId={user.uid} />}
                    </div>
                </div>
            </main>
            <Footer />
            </div>
        </AuthGuard>
    );
}
