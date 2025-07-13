"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { projectSchema, type Project } from "@/lib/types";
import { addProject } from "@/lib/actions";
import { Loader2 } from "lucide-react";

type ProjectFormData = Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation'>;

// Omit fields that are auto-generated
const projectFormSchema = projectSchema.omit({ 
    id: true, 
    summary: true, 
    authorId: true,
    authorName: true,
    authorPhotoURL: true,
    reputation: true,
});

export function ProjectForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: "",
      domain: "",
      batchYear: new Date().getFullYear(),
      githubLink: "",
      demoLink: "",
    },
  });

  function onSubmit(values: ProjectFormData) {
    startTransition(async () => {
      const result = await addProject(values);
      if (result.success) {
        toast({
          title: "Project Submitted!",
          description: "Your project has been added to the vault.",
        });
        router.push("/");
      } else {
        toast({
          title: "Submission Failed",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., CodeVault Archive" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project in detail. What does it do? What problems does it solve?"
                  className="min-h-[120px]"
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
            name="techStack"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tech Stack</FormLabel>
                <FormControl>
                    <Input placeholder="React, Firebase, Next.js" {...field} />
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
                <FormLabel>Domain</FormLabel>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
                <FormItem>
                <FormLabel>GitHub Link (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="demoLink"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Demo Link (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="https://live-demo.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>


        <Button type="submit" disabled={isPending} className="w-full md:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Submitting..." : "Submit Project"}
        </Button>
      </form>
    </Form>
  );
}
