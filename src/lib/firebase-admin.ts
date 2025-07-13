import * as admin from 'firebase-admin';

const serviceAccount: admin.ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

export function getFirebaseAdminApp() {
    // Check if all required service account details are present
    const hasCredentials = serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail;

    if (hasCredentials && !admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } catch (error: any) {
            console.error("Firebase Admin initialization error:", error.message);
            // Return null or a marker to indicate failure
            return null;
        }
    }
    
    if (!admin.apps.length) {
        return null;
    }

    return admin.app();
}
