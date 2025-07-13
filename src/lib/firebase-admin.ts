import * as admin from 'firebase-admin';

// These are populated from environment variables.
// The private key needs to have its newlines restored.
const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

export function getFirebaseAdminApp() {
    // Check if all required service account details are present in the environment.
    const hasCredentials = serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail;

    if (hasCredentials && !admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } catch (error: any) {
            console.error("Firebase Admin initialization error:", error.message);
            // Return null to indicate failure, preventing crashes downstream.
            return null;
        }
    }
    
    // If there are no credentials or the app is already initialized,
    // return the app instance (or null if it couldn't be initialized).
    if (!admin.apps.length) {
        return null;
    }

    return admin.app();
}
