"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";

export default function AuthFixPage() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter();

    const clearAllAuth = async () => {
        try {
            // Clear client-side auth
            if (auth) {
                await auth.signOut();
            }
            
            // Clear all cookies
            document.cookie.split(";").forEach((c) => {
                const eqPos = c.indexOf("=");
                const name = eqPos > -1 ? c.substr(0, eqPos) : c;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
            
            // Clear localStorage
            localStorage.clear();
            sessionStorage.clear();
            
            // Reload page
            window.location.href = "/login";
        } catch (error) {
            console.error("Error clearing auth:", error);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Authentication Fix</h1>
            
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Current Auth State</CardTitle>
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

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Problem Detection</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                            <h3 className="font-semibold text-yellow-800">Issue Detected</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                                There appears to be a mismatch between client-side and server-side authentication states.
                                The server logs show different user IDs than what the client displays.
                            </p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                            <h3 className="font-semibold text-blue-800">Solution</h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Clear all authentication data and log in fresh to synchronize the authentication state.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Fix Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Button 
                            onClick={clearAllAuth}
                            className="w-full"
                            variant="destructive"
                        >
                            Clear All Authentication Data & Restart
                        </Button>
                        
                        <div className="text-sm text-muted-foreground">
                            <p><strong>This will:</strong></p>
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li>Sign out from Firebase Auth</li>
                                <li>Clear all authentication cookies</li>
                                <li>Clear browser localStorage and sessionStorage</li>
                                <li>Redirect you to the login page</li>
                            </ul>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                            <p><strong>After clicking the button above:</strong></p>
                            <ol className="list-decimal list-inside ml-4 mt-1">
                                <li>You'll be redirected to the login page</li>
                                <li>Log in with your account (sikutech575@gmail.com)</li>
                                <li>Your profile should load correctly</li>
                                <li>You can then edit your profile details</li>
                            </ol>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
