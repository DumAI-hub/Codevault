
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { auth } from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "./firebase-admin";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import { summarizeGithubRepo } from "@/ai/flows/summarize-github-repo";
import type { Project, Profile } from "./types";
import { projectSchema, profileSchema } from "./types";

async function getAuthenticatedUser() {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;

    const idToken = cookies().get('idToken')?.value;
    if (!idToken) {
        return null;
    }

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

export async function getProjectsByAuthor(authorId: string): Promise<Project[]> {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return [];

    const db = getFirestore(adminApp);
    const projectsSnapshot = await db.collection("projects")
        .where("authorId", "==", authorId)
        .orderBy("createdAt", "desc")
        .get();

    const projects: Project[] = [];
    projectsSnapshot.forEach(doc => {
        const data = doc.data();
        projects.push({
            id: doc.id,
            ...data,
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
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }
    
    const decodedToken = await auth(adminApp).verifyIdToken(idToken);
    if (!decodedToken) {
        return { success: false, error: "Authentication required." };
    }
    const user = decodedToken;

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

        const userRef = db.collection("users").doc(user.uid);
        const projectRef = db.collection("projects").doc();

        // Use a batch to perform atomic write
        const batch = db.batch();
        batch.set(projectRef, newProjectData);
        batch.update(userRef, { reputation: FieldValue.increment(10) }); // +10 points for submission
        await batch.commit();

        revalidatePath("/");
        revalidatePath(`/project/${projectRef.id}`);
        revalidatePath(`/profile/${user.uid}`);
        
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
    const adminApp = getFirebaseAdminApp();
     if (!adminApp) {
        return { success: false, error: "Server configuration error." };
    }
    
    const decodedToken = await auth(adminApp).verifyIdToken(idToken);
    if (!decodedToken) {
        return { success: false, error: "Authentication required." };
    }
    const user = decodedToken;

    const db = getFirestore(adminApp);

    const validatedData = profileSchema.safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid profile data." };
    }
    
    try {
        const userRecord = await auth(adminApp).getUser(user.uid);
        if (userRecord.displayName !== validatedData.data.name) {
             await auth(adminApp).updateUser(user.uid, {
                displayName: validatedData.data.name,
            });
        }
       
        await db.collection("users").doc(user.uid).set(validatedData.data, { merge: true });
        
        revalidatePath("/profile");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile." };
    }
}

export async function getCurrentUserProfile(): Promise<Profile | null> {
    const user = await getAuthenticatedUser();
    if (!user) {
        return null;
    }

    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;
    const db = getFirestore(adminApp);
    
    const profileDoc = await db.collection("users").doc(user.uid).get();
    
    if (profileDoc.exists) {
        return profileDoc.data() as Profile;
    }
    
    return {
        name: user.name || "",
        batchYear: new Date().getFullYear(),
        domain: "",
        about: "",
        reputation: 0,
    };
}


export async function getProfileById(userId: string): Promise<(Profile & {id: string, email: string, photoURL: string}) | null> {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;

    try {
        const userRecord = await auth(adminApp).getUser(userId);
        const db = getFirestore(adminApp);
        const profileDoc = await db.collection("users").doc(userId).get();
        
        if (!profileDoc.exists) {
             // Fallback for users who might not have a firestore doc yet
            return {
                id: userId,
                email: userRecord.email || '',
                photoURL: userRecord.photoURL || '',
                name: userRecord.displayName || 'Anonymous',
                batchYear: new Date().getFullYear(),
                domain: '',
                about: '',
                reputation: 0,
            };
        }

        const profileData = profileDoc.data() as Profile;
        return {
            id: userId,
            email: userRecord.email || '',
            photoURL: userRecord.photoURL || '',
            ...profileData,
        };

    } catch (error) {
        console.error("Error fetching user profile by ID:", error);
        return null;
    }
}
