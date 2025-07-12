'use server';
/**
 * @fileOverview An AI agent that summarizes a GitHub repository.
 *
 * - summarizeGithubRepo - A function that summarizes a repository and suggests improvements.
 * - SummarizeGithubRepoInput - The input type for the summarizeGithubRepo function.
 * - SummarizeGithubRepoOutput - The return type for the summarizeGithubRepo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGithubRepoInputSchema = z.object({
  githubLink: z.string().url().describe('The URL of the GitHub repository.'),
});
export type SummarizeGithubRepoInput = z.infer<typeof SummarizeGithubRepoInputSchema>;

const SummarizeGithubRepoOutputSchema = z.object({
  repoSummary: z.string().describe('A summary of the GitHub repository, based on its README and file structure.'),
  futureImprovements: z.array(z.string()).describe('A list of potential future improvements for the project.'),
});
export type SummarizeGithubRepoOutput = z.infer<typeof SummarizeGithubRepoOutputSchema>;


export async function summarizeGithubRepo(
  input: SummarizeGithubRepoInput
): Promise<SummarizeGithubRepoOutput> {
  return summarizeGithubRepoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGithubRepoPrompt',
  input: {schema: SummarizeGithubRepoInputSchema},
  output: {schema: SummarizeGithubRepoOutputSchema},
  prompt: `You are an expert code reviewer and project manager. Your task is to analyze a GitHub repository and provide a summary and suggestions for improvement.

You cannot access the code files directly. Your analysis will be based on the information I provide about the project and its README file. Assume the README is a good representation of the project's state.

Based on the provided GitHub repository URL (which you can use for context about the project's name and purpose), and the user's project description, generate:
1.  A concise summary of the project's purpose and key features.
2.  A list of 3-5 actionable future improvements or new features that could be added.

GitHub Repository: {{{githubLink}}}

Your response should be based on common patterns and best practices for a project of this type. For example, if it's a web app, you might suggest adding authentication, a database, or more interactive features. If it's a data science project, you could suggest trying different models or deploying it as an API.
`,
});

const summarizeGithubRepoFlow = ai.defineFlow(
  {
    name: 'summarizeGithubRepoFlow',
    inputSchema: SummarizeGithubRepoInputSchema,
    outputSchema: SummarizeGithubRepoOutputSchema,
  },
  async input => {
    // In a real-world scenario, you might use a tool here to fetch the
    // repository's README.md file content and pass it to the prompt.
    // For this prototype, we'll rely on the model's general knowledge
    // and the context from the GitHub link.
    const {output} = await prompt(input);
    return output!;
  }
);
