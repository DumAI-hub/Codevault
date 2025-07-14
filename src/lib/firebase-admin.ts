
import * as admin from 'firebase-admin';

// This is a singleton to ensure we only initialize the app once.
export function getFirebaseAdminApp() {
    // Prevent crashes if the admin SDK was not initialized due to missing credentials.
    if (!admin) {
        return null;
    }
    
    if (admin.apps.length > 0) {
        return admin.app();
    }

    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
        console.warn(
            'Firebase admin credentials not found. Server-side auth and database features will be disabled.'
        );
        return null;
    }
    
    try {
        const serviceAccount: admin.ServiceAccount = {
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
        };

        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
        console.error('Firebase Admin Initialization Error:', error.message);
        return null;
    }
}
