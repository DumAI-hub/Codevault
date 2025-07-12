"use client";

import { useAuth, loginWithGoogle } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Authentication Required</h1>
        <p className="text-muted-foreground">You must be logged in to view this page.</p>
        <Button onClick={loginWithGoogle}>Login with Google</Button>
      </div>
    );
  }

  return <>{children}</>;
}
