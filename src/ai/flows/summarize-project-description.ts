'use server';
/**
 * @fileOverview An AI agent that summarizes project descriptions.
 *
 * - summarizeProjectDescription - A function that summarizes a project description.
 * - SummarizeProjectDescriptionInput - The input type for the summarizeProjectDescription function.
 * - SummarizeProjectDescriptionOutput - The return type for the summarizeProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDescriptionInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project to summarize.'),
});
export type SummarizeProjectDescriptionInput = z.infer<typeof SummarizeProjectDescriptionInputSchema>;

const SummarizeProjectDescriptionOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the project description.'),
});
export type SummarizeProjectDescriptionOutput = z.infer<typeof SummarizeProjectDescriptionOutputSchema>;

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  return summarizeProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProjectDescriptionPrompt',
  input: {schema: SummarizeProjectDescriptionInputSchema},
  output: {schema: SummarizeProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant for CodeVault, a digital archive of college student projects.

Your task is to summarize the following technical project description in 1–2 concise, professional sentences.

Make sure the summary:
- Clearly states what the project does
- Mentions key technologies used (e.g., Firebase, React, Python)
- Includes the domain or purpose (e.g., Web Development, Machine Learning, Android App)
- Uses simple language, so juniors or non-technical readers can understand
- Avoids unnecessary technical jargon or repetition

Here is the project description:
{{{projectDescription}}}`,
});

const summarizeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDescriptionFlow',
    inputSchema: SummarizeProjectDescriptionInputSchema,
    outputSchema: SummarizeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
