"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useSearchParams } from 'next/navigation'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, type Profile } from "@/lib/types";
import { updateUserProfile } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PartyPopper } from "lucide-react";

type ProfileFormData = Profile;

interface ProfileFormProps {
    profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      domain: profile?.domain || "",
      batchYear: profile?.batchYear || new Date().getFullYear(),
      about: profile?.about || "",
    },
  });

  function onSubmit(values: ProfileFormData) {
    startTransition(async () => {
      const result = await updateUserProfile(values);
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
