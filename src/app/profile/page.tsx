import { Header } from "@/components/Header";
import { ProfileForm } from "@/components/ProfileForm";
import { AuthGuard } from "@/components/AuthGuard";
import { getCurrentUserProfile, hasProfile } from "@/lib/actions";

export default async function ProfilePage() {
    const profile = await getCurrentUserProfile();
    const profileExists = await hasProfile();

    return (
        <AuthGuard>
            <Header />
            <main className="container mx-auto max-w-2xl px-4 py-8">
                <div className="space-y-2 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {profileExists ? 'Edit Your Profile' : 'Complete Your Profile'}
                    </h1>
                    <p className="text-muted-foreground">
                        {profileExists 
                            ? 'Update your personal information below.' 
                            : 'Welcome! Let’s get your profile set up so you can start sharing your work.'}
                    </p>
                </div>
                <ProfileForm userProfile={profile} />
            </main>
        </AuthGuard>
    );
}
