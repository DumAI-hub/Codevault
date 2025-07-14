
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "firebase-admin";
import { getFirebaseAdminApp } from "./firebase-admin";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import { summarizeGithubRepo } from "@/ai/flows/summarize-github-repo";
import type { Project, Profile } from "./types";
import { projectSchema, profileSchema } from "./types";

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
        authorName: 'Ada Lovelace',
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
        authorName: 'Grace Hopper',
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
        authorName: 'Ada Lovelace',
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
        authorName: 'Alan Turing',
        authorPhotoURL: 'https://placehold.co/100x100.png',
        reputation: 5,
    },
];

const userProfilesDb: Record<string, Profile> = {
    'user1': { name: "Ada Lovelace", batchYear: 2024, domain: "Computer Science", about: "I am a passionate developer who loves building things for the web."},
    'user2': { name: "Grace Hopper", batchYear: 2023, domain: "Software Engineering", about: "I enjoy backend systems and database architecture."},
    'user3': { name: "Alan Turing", batchYear: 2023, domain: "Artificial Intelligence", about: "Exploring the frontiers of machine learning."},
}

async function getAuthenticatedUser(idToken: string) {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;

    try {
        const decodedToken = await auth(adminApp).verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error("Error verifying ID token:", error);
        return null;
    }
}


export async function getProjects(): Promise<Project[]> {
    // In a real app, you would fetch from your database.
    return Promise.resolve(projectsDb);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
    return Promise.resolve(projectsDb.find(p => p.id === id));
}

export async function addProject(
    data: Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation'>,
    idToken: string
) {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { success: false, error: "Authentication required." };
    }

    const validatedData = projectSchema.omit({ id: true, summary: true, authorId: true, authorName: true, authorPhotoURL: true, reputation: true }).safeParse(data);
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
            authorName: user.name || user.email || 'Anonymous',
            authorPhotoURL: user.picture || '',
            reputation: 0,
        };

        // In a real app, you would save to your database.
        projectsDb.unshift(newProject);
        
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

export async function updateUserProfile(data: Omit<Profile, 'name'>, idToken: string) {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { success: false, error: "Authentication required." };
    }
    
    const adminApp = getFirebaseAdminApp();
     if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }

    // name is now omitted, as it's part of the form, not the db model for this part
    const validatedData = profileSchema.omit({name: true}).safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid profile data." };
    }
    
    try {
        // In a real app, you'd save this to a database like Firestore
        const currentProfile = userProfilesDb[user.uid] || {};
        userProfilesDb[user.uid] = { ...currentProfile, ...validatedData.data };
        
        revalidatePath("/profile");
        revalidatePath("/"); // Revalidate home page in case author names are shown there

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile." };
    }
}

export async function updateUserProfileName(name: string, idToken: string) {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { success: false, error: "Authentication required." };
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }

    if (!name || name.length < 2) {
        return { success: false, error: "Name must be at least 2 characters long." };
    }

    try {
        // Update name in Firebase Auth
        await auth(adminApp).updateUser(user.uid, {
            displayName: name,
        });

        // Update name in our mock DB
        const currentProfile = userProfilesDb[user.uid] || {};
        userProfilesDb[user.uid] = { ...currentProfile, name: name };

        revalidatePath("/profile");
        // Revalidate other paths where the name might be displayed
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error updating profile name:", error);
        return { success: false, error: "Failed to update profile name." };
    }
}


export async function getCurrentUserProfile(idToken: string): Promise<Profile | null> {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return null;
    }
    // In a real app, you would fetch this from your database
    const profile = userProfilesDb[user.uid] || {};
    
    // Combine db profile with Firebase Auth profile info
    return {
        name: user.name || '',
        batchYear: profile.batchYear || 0,
        domain: profile.domain || '',
        about: profile.about || ''
    };
}
