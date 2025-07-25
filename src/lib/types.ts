
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
  reputation: z.number().default(0),
  upvotes: z.number().default(0),
  upvoterIds: z.array(z.string()).default([]),
  createdAt: z.string().optional(), // Stored as a timestamp, retrieved as an ISO string
});

export type Project = z.infer<typeof projectSchema>;

export const commentSchema = z.object({
  id: z.string(),
  text: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string(),
  authorName: z.string(),
  authorPhotoURL: z.string().url().or(z.literal('')),
  projectId: z.string(),
  createdAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  
export type SignupData = z.infer<typeof signupSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  batchYear: z.coerce.number().min(2000, "Invalid year").max(currentYear + 1, "Year cannot be too far in the future"),
  domain: z.string().min(2, "Domain must be at least 2 characters long"),
  about: z.string().min(10, "Must be at least 10 characters").max(500, "Cannot exceed 500 characters").optional().or(z.literal('')),
  reputation: z.number().default(0),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal('')),
  githubUrl: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal('')),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
});

export type Profile = z.infer<typeof profileSchema>;
