"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { type UserProfile, userProfileSchema } from "@/lib/types";
import { updateUserProfile } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// We only want to edit a subset of the fields
const profileFormSchema = userProfileSchema.pick({
    name: true,
    domain: true,
    batchYear: true,
    about: true,
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
    userProfile: UserProfile | null;
}

export function ProfileForm({ userProfile }: ProfileFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { user } = useAuth();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile?.name || user?.displayName || "",
      domain: userProfile?.domain || "",
      batchYear: userProfile?.batchYear || new Date().getFullYear(),
      about: userProfile?.about || "",
    },
  });

  function onSubmit(values: ProfileFormData) {
    if (!user) {
        toast({
            title: "Authentication Required",
            description: "You must be logged in to update your profile.",
            variant: "destructive",
        });
        return;
    }

    startTransition(async () => {
      const result = await updateUserProfile(values);
      if (result.success) {
        toast({
          title: "Profile Updated!",
          description: "Your profile has been saved successfully.",
        });
        router.push("/");
        router.refresh(); // Refresh to update user info in header
      } else {
        toast({
          title: "Update Failed",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself, your skills, and your interests."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Primary Domain</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Web Development" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
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
        </div>

        <Button type="submit" disabled={isPending || !user} className="w-full md:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
