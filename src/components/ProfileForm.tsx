
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, type Profile } from "@/lib/types";
import { updateUserProfile } from "@/lib/actions";
import { Loader2, PartyPopper, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "./ui/badge";

const getReputationTier = (reputation: number) => {
    if (reputation >= 300) return { name: "Mentor", color: "bg-purple-500" };
    if (reputation >= 150) return { name: "Innovator", color: "bg-blue-500" };
    if (reputation >= 50) return { name: "Contributor", color: "bg-green-500" };
    return { name: "Newbie", color: "bg-gray-500" };
};

interface ProfileFormProps {
    initialProfile: Profile;
}

const formSchema = profileSchema.omit({ reputation: true });
type ProfileFormData = z.infer<typeof formSchema>;


export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshProfile } = useAuth();
  const isSetup = searchParams.get('setup') === 'true';
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: initialProfile.name || '',
        batchYear: initialProfile.batchYear || new Date().getFullYear(),
        domain: initialProfile.domain || '',
        about: initialProfile.about || '',
        linkedinUrl: initialProfile.linkedinUrl || '',
        githubUrl: initialProfile.githubUrl || '',
        websiteUrl: initialProfile.websiteUrl || '',
    },
  });

  useEffect(() => {
    form.reset({
        name: initialProfile.name || '',
        batchYear: initialProfile.batchYear || new Date().getFullYear(),
        domain: initialProfile.domain || '',
        about: initialProfile.about || '',
        linkedinUrl: initialProfile.linkedinUrl || '',
        githubUrl: initialProfile.githubUrl || '',
        websiteUrl: initialProfile.websiteUrl || '',
    });
  }, [initialProfile, form]);


  async function onSubmit(values: ProfileFormData) {
    if (!user) {
        toast({ title: "Not Authenticated", description: "You must be logged in.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
      console.log('Submitting profile form with values:', values);
      const idToken = await user.getIdToken();
      const result = await updateUserProfile(values, idToken);
      console.log('Profile update result:', result);

      if (result.success) {
        await refreshProfile();
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

  const reputation = initialProfile.reputation || 0;
  const tier = getReputationTier(reputation);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Edit Profile Information</CardTitle>
                <CardDescription>Update your personal and professional details. This information will be displayed on your projects and profile.</CardDescription>
            </div>
            <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-5 w-5" />
                    <span className="font-bold text-lg">{reputation}</span>
                 </div>
                 <Badge className={`${tier.color} text-white`}>{tier.name}</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {isSetup && (
             <Alert className="mb-6 border-green-500 bg-green-50 text-green-800">
                <PartyPopper className="h-5 w-5 text-green-500" />
                <AlertTitle className="font-semibold text-green-900">Welcome to CodeVault!</AlertTitle>
                <AlertDescription>
                   Just one more step. Complete your profile to get started.
                </AlertDescription>
            </Alert>
        )}
        
        {/* Email Display Section */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-medium">Email Address</label>
                    <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                    <p>To change your email, update it in your</p>
                    <p>account settings in Firebase Auth</p>
                </div>
            </div>
        </div>

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
                    <FormLabel>Primary Domain/Specialization</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Full Stack Development, Machine Learning, Data Science, Mobile Development" {...field} />
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
                    placeholder="Tell us about yourself, your interests, experience, and what you're passionate about. This helps others understand your background and expertise."
                    className="min-h-[120px]"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div>
                <h3 className="text-lg font-medium mb-2">Professional Links</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Add your professional profiles to help others connect with you and view your work.
                </p>
                <div className="space-y-6">
                    <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://linkedin.com/in/your-profile" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>GitHub Profile URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://github.com/your-username" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Personal Website/Portfolio URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://your-portfolio.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>

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
