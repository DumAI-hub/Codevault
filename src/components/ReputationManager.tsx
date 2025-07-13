"use client";

import { useState, useTransition } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { rateProject } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface ReputationManagerProps {
    projectId: string;
}

export function ReputationManager({ projectId }: ReputationManagerProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [voted, setVoted] = useState(false);


    const handleVote = () => {
        startTransition(async () => {
            const result = await rateProject(projectId);
            if (result.success) {
                toast({
                    title: "Vote Counted!",
                    description: "Thanks for your feedback!"
                });
                setVoted(true);
            } else {
                toast({
                    title: "Vote Failed",
                    description: result.error,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Rate this Project</CardTitle>
                <CardDescription>
                    Find this project useful? Let the author know!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button 
                    onClick={handleVote} 
                    disabled={isPending || voted} 
                    className="w-full"
                >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {voted ? "Thanks for voting!" : "Upvote Project"}
                </Button>
            </CardContent>
        </Card>
    );
}
