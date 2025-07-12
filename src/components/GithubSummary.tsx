"use client";

import { useState, useEffect } from 'react';
import { getGithubSummary } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Lightbulb, Terminal, ServerCrash } from 'lucide-react';
import { SummarizeGithubRepoOutput } from '@/ai/flows/summarize-github-repo';

interface GithubSummaryProps {
  githubLink: string;
}

export function GithubSummary({ githubLink }: GithubSummaryProps) {
  const [summary, setSummary] = useState<SummarizeGithubRepoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      if (!githubLink) {
        setError("No GitHub repository link provided.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      const result = await getGithubSummary(githubLink);

      if (result.success) {
        setSummary(result.data!);
      } else {
        setError(result.error || 'An unexpected error occurred.');
      }
      setIsLoading(false);
    }

    fetchSummary();
  }, [githubLink]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-6 w-6" />
          AI-Powered Repo Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <p>Analyzing repository... this may take a moment.</p>
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <ServerCrash className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )}
        {summary && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Repository Summary</h3>
              <p className="text-muted-foreground text-sm">{summary.repoSummary}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Suggested Improvements
              </h3>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-sm">
                {summary.futureImprovements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
