
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { auth } from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from "./firebase-admin";
import { summarizeProjectDescription } from "@/ai/flows/summarize-project-description";
import { summarizeGithubRepo } from "@/ai/flows/summarize-github-repo";
import type { Project, Profile, Comment } from "./types";
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
    data: Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation' | 'upvotes' | 'upvoterIds' | 'createdAt'>,
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

    const validatedData = projectSchema.omit({ id: true, summary: true, authorId: true, authorName: true, authorPhotoURL: true, reputation: true, upvotes: true, upvoterIds: true, createdAt: true }).safeParse(data);
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
        const userRef = db.collection("users").doc(user.uid);
        const userProfileDoc = await userRef.get();
        const userProfile = userProfileDoc.data() as Profile | undefined;

        const newProjectData = {
            ...validatedData.data,
            summary,
            authorId: user.uid,
            authorName: userProfile?.name || user.name || user.email || 'Anonymous',
            authorPhotoURL: user.picture || '',
            reputation: 0,
            upvotes: 0,
            upvoterIds: [],
            createdAt: FieldValue.serverTimestamp(),
        };

        const projectRef = db.collection("projects").doc();

        const batch = db.batch();
        batch.set(projectRef, newProjectData);
        batch.set(userRef, { reputation: FieldValue.increment(10) }, { merge: true }); 
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

export async function updateProject(
    projectId: string,
    data: Omit<Project, 'id' | 'summary' | 'authorId' | 'authorName' | 'authorPhotoURL' | 'reputation' | 'upvotes' | 'upvoterIds' | 'createdAt'>,
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
    const projectRef = db.collection("projects").doc(projectId);

    const projectDoc = await projectRef.get();
    if (!projectDoc.exists || projectDoc.data()?.authorId !== user.uid) {
        return { success: false, error: "Permission denied. You can only edit your own projects." };
    }

    const validatedData = projectSchema.omit({ id: true, summary: true, authorId: true, authorName: true, authorPhotoURL: true, reputation: true, upvotes: true, upvoterIds: true, createdAt: true }).safeParse(data);
    if (!validatedData.success) {
        return { success: false, error: "Invalid data" };
    }
    
    let summary;
    if (projectDoc.data()?.description !== validatedData.data.description) {
        try {
            const result = await summarizeProjectDescription({
                projectDescription: validatedData.data.description,
            });
            summary = result.summary;
        } catch (error) {
            console.error("AI summarization failed during update, but proceeding:", error);
            summary = projectDoc.data()?.summary;
        }
    } else {
        summary = projectDoc.data()?.summary;
    }


    try {
        const updatedProjectData = {
            ...validatedData.data,
            summary,
        };

        await projectRef.update(updatedProjectData);

        revalidatePath(`/project/${projectId}`);
        revalidatePath(`/profile/${user.uid}`);
        
        return { success: true };
    } catch (error) {
        console.error("Failed to update project in Firestore:", error);
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

export async function updateUserProfile(data: Omit<Profile, 'reputation'>, idToken: string) {
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

    const validatedData = profileSchema.omit({ reputation: true }).safeParse(data);
    if (!validatedData.success) {
        console.error("Profile validation failed:", validatedData.error);
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
        revalidatePath(`/profile/${user.uid}`);

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
        linkedinUrl: "",
        githubUrl: "",
        websiteUrl: "",
    };
}


export async function getProfileById(userId: string): Promise<(Profile & {id: string, email: string, photoURL: string}) | null> {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return null;

    try {
        const userRecord = await auth(adminApp).getUser(userId);
        const db = getFirestore(adminApp);
        const profileDoc = await db.collection("users").doc(userId).get();
        
        const profileData = profileDoc.exists
            ? profileDoc.data() as Profile 
            : {
                name: userRecord.displayName || 'Anonymous',
                batchYear: new Date().getFullYear(),
                domain: '',
                about: '',
                reputation: 0,
                linkedinUrl: "",
                githubUrl: "",
                websiteUrl: "",
            };

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

export async function upvoteProject(projectId: string, idToken: string) {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return { success: false, error: "Server configuration error." };

    const decodedToken = await auth(adminApp).verifyIdToken(idToken);
    if (!decodedToken) return { success: false, error: "Authentication required." };
    
    const db = getFirestore(adminApp);
    const projectRef = db.collection("projects").doc(projectId);
    const upvoterId = decodedToken.uid;

    try {
        const result = await db.runTransaction(async (transaction) => {
            const projectDoc = await transaction.get(projectRef);
            if (!projectDoc.exists) {
                throw new Error("Project not found");
            }

            const project = projectDoc.data() as Project;
            const authorRef = db.collection("users").doc(project.authorId);

            if (project.upvoterIds?.includes(upvoterId)) {
                transaction.update(projectRef, {
                    upvotes: FieldValue.increment(-1),
                    reputation: FieldValue.increment(-1),
                    upvoterIds: FieldValue.arrayRemove(upvoterId),
                });
                transaction.set(authorRef, { reputation: FieldValue.increment(-5) }, { merge: true });
                return { upvoted: false, newCount: (project.upvotes || 1) - 1 };
            } else {
                transaction.update(projectRef, {
                    upvotes: FieldValue.increment(1),
                    reputation: FieldValue.increment(1),
                    upvoterIds: FieldValue.arrayUnion(upvoterId),
                });
                transaction.set(authorRef, { reputation: FieldValue.increment(5) }, { merge: true });
                return { upvoted: true, newCount: (project.upvotes || 0) + 1 };
            }
        });
        
        revalidatePath(`/project/${projectId}`);
        revalidatePath(`/profile/${projectRef.id}`);
        return { success: true, ...result };

    } catch (error) {
        console.error("Upvote transaction failed:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function addCommentToProject(projectId: string, text: string, idToken: string) {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return { success: false, error: "Server configuration error." };

    const decodedToken = await auth(adminApp).verifyIdToken(idToken);
    if (!decodedToken) return { success: false, error: "Authentication required." };

    if (!text || text.trim().length === 0) {
        return { success: false, error: "Comment cannot be empty." };
    }

    const db = getFirestore(adminApp);
    const projectRef = db.collection("projects").doc(projectId);
    const commentRef = projectRef.collection("comments").doc();
    const authorRef = db.collection("users").doc(decodedToken.uid);


    const newComment = {
        id: commentRef.id,
        text,
        authorId: decodedToken.uid,
        authorName: decodedToken.name || "Anonymous",
        authorPhotoURL: decodedToken.picture || "",
        projectId,
        createdAt: FieldValue.serverTimestamp(),
    };

    try {
        const batch = db.batch();
        batch.set(commentRef, newComment);
        batch.set(authorRef, { reputation: FieldValue.increment(1) }, { merge: true });
        
        await batch.commit();

        revalidatePath(`/project/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to add comment:", error);
        return { success: false, error: "Could not post comment." };
    }
}

export async function getCommentsForProject(projectId: string): Promise<Comment[]> {
    const adminApp = getFirebaseAdminApp();
    if (!adminApp) return [];

    const db = getFirestore(adminApp);
    const commentsSnapshot = await db
        .collection("projects")
        .doc(projectId)
        .collection("comments")
        .orderBy("createdAt", "desc")
        .get();

    const comments: Comment[] = [];
    commentsSnapshot.forEach((doc) => {
        const data = doc.data();
        comments.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        } as Comment);
    });

    return comments;
}
