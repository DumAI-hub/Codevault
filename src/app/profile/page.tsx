
"use client";

import { Header } from "@/components/Header";
import { ProfileForm } from "@/components/ProfileForm";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/hooks/use-auth";
import { UserProjects } from "@/components/UserProjects";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <AuthGuard>
            <Header />
            <main className="container mx-auto max-w-4xl px-4 py-8">
                <div className="space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                    <p className="text-muted-foreground">
                        Update your personal information and view your contributions.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                       <ProfileForm />
                    </div>
                    <div className="lg:col-span-1">
                        {user && <UserProjects authorId={user.uid} />}
                    </div>
                </div>
            </main>
        </AuthGuard>
    );
}
