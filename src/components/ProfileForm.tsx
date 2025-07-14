
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, type Profile } from "@/lib/types";
import { updateUserProfile, getCurrentUserProfile } from "@/lib/actions";
import { Loader2, PartyPopper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";

export function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const isSetup = searchParams.get('setup') === 'true';
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      batchYear: new Date().getFullYear(),
      domain: "",
      about: "",
    },
  });

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      setIsLoadingProfile(true);
      try {
        const idToken = await user.getIdToken();
        const profile = await getCurrentUserProfile(idToken);
        if (profile) {
          form.reset(profile);
        } else {
           // Fallback to user display name if profile doesn't exist yet
           form.setValue('name', user.displayName || '');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch your profile data.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingProfile(false);
      }
    }
    fetchProfile();
  }, [user, form, toast]);


  async function onSubmit(values: Profile) {
    if (!user) {
        toast({ title: "Not Authenticated", description: "You must be logged in.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
      const idToken = await user.getIdToken();
      const result = await updateUserProfile(values, idToken);
      if (result.success) {
        toast({
          title: "Profile Updated!",
          description: "Your profile has been saved successfully.",
        });
        if (isSetup) {
            router.push("/");
        } else {
            router.refresh();
        }
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    });
  }
  
  if (isLoadingProfile) {
    return (
        <Card>
            <CardContent className="p-6 space-y-8">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {isSetup && (
             <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
                <PartyPopper className="h-5 w-5 text-green-500" />
                <AlertTitle className="font-semibold text-green-900">Welcome to CodeVault!</AlertTitle>
                <AlertDescription>
                   Just one more step. Complete your profile to get started.
                </AlertDescription>
            </Alert>
        )}
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Ada Lovelace" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="batchYear"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Batch Year</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g., 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Primary Domain</FormLabel>
                    <FormControl>
                        <Input placeholder="Web Development, ML, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
                <FormItem>
                <FormLabel>About Me</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Tell us a little bit about yourself."
                    className="min-h-[120px]"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Saving..." : "Save Changes"}
            </Button>
        </form>
        </Form>
      </CardContent>
    </Card>

  );
}
