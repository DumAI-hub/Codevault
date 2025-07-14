
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "./firebase-admin";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import { summarizeGithubRepo } from "@/ai/flows/summarize-github-repo";
import type { Project, Profile } from "./types";
import { projectSchema, profileSchema } from "./types";

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
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return [];
    
    const db = getFirestore(adminApp);
    const projectsSnapshot = await db.collection("projects").orderBy("createdAt", "desc").get();
    
    const projects: Project[] = [];
    projectsSnapshot.forEach(doc => {
        const data = doc.data();
        projects.push({
            id: doc.id,
            ...data,
             // Firestore timestamp to JSON-serializable format
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Project);
    });

    return projects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return undefined;
    
    const db = getFirestore(adminApp);
    const projectDoc = await db.collection("projects").doc(id).get();

    if (!projectDoc.exists) {
        return undefined;
    }

    const data = projectDoc.data()!;
    return {
        id: projectDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    } as Project;
}

export async function addProject(
    data: Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation' | 'createdAt'>,
    idToken: string
) {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { success: false, error: "Authentication required." };
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }
    const db = getFirestore(adminApp);

    const validatedData = projectSchema.omit({ id: true, summary: true, authorId: true, authorName: true, authorPhotoURL: true, reputation: true, createdAt: true }).safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid data" };
    }
    
    let summary = "";
    try {
        const result = await summarizeProjectDescription({
            projectDescription: validatedData.data.description,
        });
        summary = result.summary;
    } catch (error) {
        console.error("AI summarization failed, but proceeding with submission:", error);
        // We will proceed to submit the project without a summary.
    }

    try {
        const newProjectData = {
            ...validatedData.data,
            summary,
            authorId: user.uid,
            authorName: user.name || user.email || 'Anonymous',
            authorPhotoURL: user.picture || '',
            reputation: 0,
            createdAt: FieldValue.serverTimestamp(),
        };

        const projectRef = await db.collection("projects").add(newProjectData);
        
        revalidatePath("/");
        revalidatePath(`/project/${projectRef.id}`);
        
        return { success: true };
    } catch (error) {
        console.error("Failed to add project to Firestore:", error);
        return { success: false, error: "Failed to save project to the database." };
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

export async function updateUserProfile(data: Profile, idToken: string) {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { success: false, error: "Authentication required." };
    }
    
    const adminApp = getFirebaseAdminApp();
     if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }
    const db = getFirestore(adminApp);

    const validatedData = profileSchema.safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid profile data." };
    }
    
    try {
        const userRecord = await auth(adminApp).getUser(user.uid);
        // Update name in Firebase Auth first if it has changed
        if (userRecord.displayName !== validatedData.data.name) {
             await auth(adminApp).updateUser(user.uid, {
                displayName: validatedData.data.name,
            });
        }
       
        // Create or update the profile in the 'users' collection
        await db.collection("users").doc(user.uid).set(validatedData.data, { merge: true });
        
        revalidatePath("/profile");
        revalidatePath("/"); // Revalidate home page in case author names are shown there

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile." };
    }
}

export async function getCurrentUserProfile(idToken: string): Promise<Profile | null> {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return null;
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;
    const db = getFirestore(adminApp);
    
    const profileDoc = await db.collection("users").doc(user.uid).get();
    const profileFromDb = profileDoc.exists ? profileDoc.data() : {};
    
    // Combine db profile with Firebase Auth profile info as a fallback
    return {
        name: user.name || (profileFromDb as Profile)?.name || "",
        batchYear: (profileFromDb as Profile)?.batchYear || new Date().getFullYear(),
        domain: (profileFromDb as Profile)?.domain || "",
        about: (profileFromDb as Profile)?.about || ""
    };
}
