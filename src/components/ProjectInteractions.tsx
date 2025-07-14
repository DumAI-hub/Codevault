
"use client";

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Loader2 } from 'lucide-react';
import { type Project } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { upvoteProject } from '@/lib/actions';

interface ProjectInteractionsProps {
  project: Project;
}

export function ProjectInteractions({ project }: ProjectInteractionsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  
  const initialUpvoted = user ? project.upvoterIds?.includes(user.uid) : false;
  const initialCount = project.upvotes || 0;

  const [upvoted, setUpvoted] = useState(initialUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(initialCount);
  
  const handleUpvote = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "You must be logged in to upvote projects.",
        variant: "destructive",
      });
      return;
    }
    
    // Optimistic UI update
    setUpvoted(!upvoted);
    setUpvoteCount(prev => upvoted ? prev - 1 : prev + 1);

    startTransition(async () => {
        const idToken = await user.getIdToken();
        const result = await upvoteProject(project.id!, idToken);

        if (!result.success) {
            // Revert optimistic update on failure
            setUpvoted(upvoted);
            setUpvoteCount(prev => upvoted ? prev + 1 : prev - 1);
            toast({
                title: "Error",
                description: result.error || "Could not process your upvote.",
                variant: "destructive",
            });
        } else {
            // Can optionally sync state with server response if needed
            // setUpvoted(result.upvoted);
            // setUpvoteCount(result.newCount);
        }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={upvoted ? "default" : "outline"} 
        size="sm"
        onClick={handleUpvote}
        disabled={isPending || !user}
        aria-pressed={upvoted}
      >
        {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <ThumbsUp className="h-4 w-4" />
        )}
      </Button>
      <span className="text-sm font-semibold min-w-[20px] text-center">
        {upvoteCount}
      </span>
    </div>
  );
}
