"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthDebugPage() {
    const { user, profile, loading } = useAuth();

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>
            
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Auth State</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
                        <p><strong>User:</strong> {user ? 'Authenticated' : 'Not authenticated'}</p>
                        {user && (
                            <div className="pl-4 border-l-2 border-gray-200">
                                <p><strong>UID:</strong> {user.uid}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Display Name:</strong> {user.displayName || 'None'}</p>
                            </div>
                        )}
                        <p><strong>Profile:</strong> {profile ? 'Loaded' : 'Not loaded'}</p>
                        {profile && (
                            <div className="pl-4 border-l-2 border-gray-200">
                                <p><strong>Name:</strong> {profile.name}</p>
                                <p><strong>Domain:</strong> {profile.domain || 'None'}</p>
                                <p><strong>Batch Year:</strong> {profile.batchYear}</p>
                                <p><strong>Reputation:</strong> {profile.reputation}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button onClick={() => window.location.reload()}>
                            Refresh Page
                        </Button>
                        <Button variant="outline" onClick={() => {
                            console.log('Current auth state:', { user: !!user, profile: !!profile, loading });
                            console.log('User object:', user);
                            console.log('Profile object:', profile);
                        }}>
                            Log Auth State to Console
                        </Button>
                        {!user && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-sm">
                                    No user detected. You may need to log in again.
                                    <br />
                                    <a href="/login" className="text-blue-600 underline">Go to Login</a>
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
