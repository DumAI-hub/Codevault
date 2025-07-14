
import * as admin from 'firebase-admin';

// This is a singleton to ensure we only initialize the app once.
export function getFirebaseAdminApp() {
    if (!admin.apps.length) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

        if (!privateKey || !clientEmail) {
            console.warn(
                'Firebase admin credentials not found. Server-side auth features will be disabled.'
            );
            return null; // Return null if credentials are not available
        }
        
        const serviceAccount: admin.ServiceAccount = {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
        };

        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } catch (error: any) {
            // This can happen in cases of misconfiguration.
            console.error('Firebase Admin Initialization Error:', error.message);
            return null;
        }
    }
    return admin.app();
}
