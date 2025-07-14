
"use client";

import { useState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCommentsForProject, addCommentToProject } from '@/lib/actions';
import { type Comment } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserCircle, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCommentsProps {
  projectId: string;
}

const commentFormSchema = z.object({
  text: z.string().min(1, 'Comment cannot be empty.').max(1000, 'Comment is too long.'),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

export function ProjectComments({ projectId }: ProjectCommentsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { text: '' },
  });

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
      const fetchedComments = await getCommentsForProject(projectId);
      setComments(fetchedComments);
      setLoading(false);
    }
    fetchComments();
  }, [projectId]);

  async function onSubmit(data: CommentFormData) {
    if (!user) {
        toast({ title: "Not logged in", description: "You must be logged in to comment.", variant: "destructive" });
        return;
    }

    startTransition(async () => {
        const idToken = await user.getIdToken();
        const result = await addCommentToProject(projectId, data.text, idToken);

        if (result.success) {
            form.reset();
            // Refetch comments
            const fetchedComments = await getCommentsForProject(projectId);
            setComments(fetchedComments);
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {user && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
              <Avatar className="hidden sm:block">
                <AvatarImage src={user.photoURL ?? ''} />
                <AvatarFallback><UserCircle className="h-5 w-5"/></AvatarFallback>
              </Avatar>
              <div className='w-full space-y-2'>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Add a comment..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="flex justify-end">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Post Comment
                    </Button>
                 </div>
              </div>
            </form>
          </Form>
        )}
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-4"><Loader2 className="h-6 w-6 animate-spin"/></div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.authorPhotoURL} />
                   <AvatarFallback><UserCircle className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{comment.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Be the first to comment.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
