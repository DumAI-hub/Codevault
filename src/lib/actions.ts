"use server";

import { revalidatePath } from "next/cache";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import { summarizeGithubRepo } from "@/ai/flows/summarize-github-repo";
import type { Project, UserProfile } from "./types";
import { projectSchema } from "./types";

// This is a mock database. In a real application, you would use a database
// like Firestore, PostgreSQL, etc.
const projectsDb: Project[] = [
    {
        id: "1",
        title: "Portfolio Website V2",
        description: "A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills. It features a clean design, smooth animations, and is fully responsive. It is deployed on Vercel.",
        techStack: "Next.js,React,Tailwind CSS,TypeScript",
        domain: "Web Development",
        batchYear: 2024,
        githubLink: "https://github.com/firebase/firebase-ios-sdk",
        demoLink: "https://github.com/",
        summary: "A personal portfolio website using Next.js and Tailwind CSS to showcase projects, featuring a clean, responsive design with smooth animations.",
        authorId: 'user1',
        authorName: 'Jane Doe',
        authorPhotoURL: 'https://placehold.co/100x100.png',
        reputation: 15,
    },
    {
        id: "2",
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform developed using the MERN stack (MongoDB, Express, React, Node.js). It includes features like user authentication, product catalog, shopping cart, and Stripe integration for payments. The state is managed with Redux.",
        techStack: "React,Node.js,MongoDB,Express,Stripe",
        domain: "Web Development",
        batchYear: 2023,
        githubLink: "https://github.com/vercel/next.js",
        summary: "A full-stack MERN e-commerce site with user authentication, a product catalog, and Stripe payment integration, using Redux for state management.",
        authorId: 'user2',
        authorName: 'John Smith',
        authorPhotoURL: 'https://placehold.co/100x100.png',
        reputation: 25,
    },
    {
        id: "3",
        title: "HealthConnect Mobile App",
        description: "An Android application developed with Kotlin that connects patients with doctors. The app uses Firebase for real-time chat, authentication, and database. It helps users book appointments and manage their medical records.",
        techStack: "Kotlin,Android,Firebase",
        domain: "Mobile Development",
        batchYear: 2024,
        githubLink: "https://github.com/google/genkit",
        summary: "An Android app built with Kotlin and Firebase that allows patients to book appointments, chat with doctors in real-time, and manage medical records.",
        authorId: 'user1',
        authorName: 'Jane Doe',
        authorPhotoURL: 'https://placehold.co/100x100.png',
        reputation: 15,
    },
    {
        id: "4",
        title: "Sentiment Analysis of Movie Reviews",
        description: "A machine learning project that performs sentiment analysis on a dataset of movie reviews. Built with Python using Scikit-learn and NLTK for natural language processing. The model is deployed as a simple web app using Flask.",
        techStack: "Python,Flask,Scikit-learn,Machine Learning",
        domain: "Machine Learning",
        batchYear: 2023,
        githubLink: "https://github.com/tensorflow/tensorflow",
        demoLink: "https://github.com/",
        summary: "A Python-based machine learning project that analyzes movie review sentiment using Scikit-learn and NLTK, deployed as a Flask web application.",
        authorId: 'user3',
        authorName: 'Alex Johnson',
        authorPhotoURL: 'https://placehold.co/100x100.png',
        reputation: 5,
    },
];

const usersDb: Record<string, UserProfile> = {
    'user1': { id: 'user1', name: 'Jane Doe', photoURL: 'https://placehold.co/100x100.png', reputation: 15 },
    'user2': { id: 'user2', name: 'John Smith', photoURL: 'https://placehold.co/100x100.png', reputation: 25 },
    'user3': { id: 'user3', name: 'Alex Johnson', photoURL: 'https://placehold.co/100x100.png', reputation: 5 },
};

export async function getProjects(): Promise<Project[]> {
    // In a real app, you would fetch from your database.
    return Promise.resolve(projectsDb);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
    return Promise.resolve(projectsDb.find(p => p.id === id));
}

export async function addProject(
    data: Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation'>, 
    user: { uid: string; displayName: string | null; photoURL: string | null }
) {
    const validatedData = projectSchema.safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid data" };
    }
    
    try {
        const { summary } = await summarizeProjectDescription({
            projectDescription: validatedData.data.description,
        });

        const newProject: Project = {
            id: new Date().getTime().toString(),
            ...validatedData.data,
            summary,
            authorId: user.uid,
            authorName: user.displayName || 'Anonymous',
            authorPhotoURL: user.photoURL || 'https://placehold.co/100x100.png',
            reputation: 0,
        };

        // In a real app, you would save to your database.
        projectsDb.unshift(newProject);
        
        // Give user reputation for submitting a project
        if (usersDb[user.uid]) {
            usersDb[user.uid].reputation += 5;
        } else {
            usersDb[user.uid] = {
                id: user.uid,
                name: user.displayName || 'Anonymous',
                photoURL: user.photoURL || 'https://placehold.co/100x100.png',
                reputation: 5
            }
        }
        
        revalidatePath("/");
        revalidatePath(`/project/${newProject.id}`);
        
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to create project summary." };
    }
}

export async function getGithubSummary(githubLink: string) {
    if (!githubLink) {
        return { success: false, error: "No GitHub link provided." };
    }

    try {
        const result = await summarizeGithubRepo({ githubLink });
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Failed to get summary from GitHub." };
    }
}


export async function rateProject(projectId: string) {
    const project = projectsDb.find(p => p.id === projectId);
    if (!project) {
        return { success: false, error: "Project not found" };
    }

    // Business logic: increase project and author reputation
    project.reputation = (project.reputation || 0) + 1;
    const author = usersDb[project.authorId];
    if (author) {
        author.reputation = (author.reputation || 0) + 1;
    }

    revalidatePath(`/project/${projectId}`);
    return { success: true, newReputation: project.reputation };
}
