import { z } from "zod";

const currentYear = new Date().getFullYear();

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  techStack: z.string().min(1, "Please provide at least one technology, separated by commas"),
  domain: z.string().min(1, "Please specify a domain"),
  batchYear: z.coerce.number().min(2000, "Invalid year").max(currentYear + 1, "Year cannot be too far in the future"),
  githubLink: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal('')),
  demoLink: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  summary: z.string().optional(),
  authorId: z.string(),
  authorName: z.string(),
  authorPhotoURL: z.string().url().or(z.literal('')),
  reputation: z.number().optional().default(0),
});

export type Project = z.infer<typeof projectSchema>;
