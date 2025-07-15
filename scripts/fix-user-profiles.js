#!/usr/bin/env node

// Load environment variables first
require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = {
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

async function backfillUserProfiles() {
    console.log('🔧 Starting user profile backfill...\n');

    try {
        // Get all Firebase Auth users
        console.log('1. Fetching all Firebase Auth users...');
        let authUsers = [];
        let nextPageToken;
        
        do {
            const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
            authUsers.push(...listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log(`Found ${authUsers.length} users in Firebase Auth\n`);

        // Process each user
        let created = 0;
        let updated = 0;
        let skipped = 0;

        for (const authUser of authUsers) {
            console.log(`Processing user: ${authUser.uid} (${authUser.email})`);
            
            const profileRef = db.collection('users').doc(authUser.uid);
            const profileDoc = await profileRef.get();
            
            if (!profileDoc.exists) {
                // Create missing profile
                console.log('  ❌ No profile found - creating...');
                
                const newProfile = {
                    name: authUser.displayName || authUser.email?.split('@')[0] || 'User',
                    batchYear: new Date().getFullYear(),
                    domain: '',
                    about: '',
                    reputation: 0,
                    linkedinUrl: '',
                    githubUrl: '',
                    websiteUrl: '',
                };
                
                await profileRef.set(newProfile);
                console.log('  ✅ Profile created');
                created++;
            } else {
                // Check if existing profile needs updating
                const profileData = profileDoc.data();
                let needsUpdate = false;
                const updates = {};
                
                // Check for missing required fields
                if (!profileData.name) {
                    updates.name = authUser.displayName || authUser.email?.split('@')[0] || 'User';
                    needsUpdate = true;
                }
                
                if (!profileData.batchYear || profileData.batchYear === 'N/A') {
                    updates.batchYear = new Date().getFullYear();
                    needsUpdate = true;
                }
                
                if (!profileData.domain && profileData.domain !== '') {
                    updates.domain = '';
                    needsUpdate = true;
                }
                
                if (!profileData.about && profileData.about !== '') {
                    updates.about = '';
                    needsUpdate = true;
                }
                
                if (profileData.reputation === undefined || profileData.reputation === null) {
                    updates.reputation = 0;
                    needsUpdate = true;
                }
                
                if (!profileData.linkedinUrl && profileData.linkedinUrl !== '') {
                    updates.linkedinUrl = '';
                    needsUpdate = true;
                }
                
                if (!profileData.githubUrl && profileData.githubUrl !== '') {
                    updates.githubUrl = '';
                    needsUpdate = true;
                }
                
                if (!profileData.websiteUrl && profileData.websiteUrl !== '') {
                    updates.websiteUrl = '';
                    needsUpdate = true;
                }
                
                if (needsUpdate) {
                    console.log('  🔄 Profile exists but needs updates...');
                    console.log('    Updates:', Object.keys(updates).join(', '));
                    await profileRef.update(updates);
                    console.log('  ✅ Profile updated');
                    updated++;
                } else {
                    console.log('  ✅ Profile exists and is complete');
                    skipped++;
                }
            }
            
            console.log('');
        }

        console.log('📊 Backfill Summary:');
        console.log(`   Created: ${created} profiles`);
        console.log(`   Updated: ${updated} profiles`);
        console.log(`   Skipped: ${skipped} profiles (already complete)`);
        console.log(`   Total processed: ${authUsers.length} users`);

        // Verify the results
        console.log('\n🔍 Verification: Checking all profiles after backfill...');
        const usersSnapshot = await db.collection('users').get();
        console.log(`✅ Total profiles in Firestore: ${usersSnapshot.size}`);
        
        let completeProfiles = 0;
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.name && data.batchYear && data.domain !== undefined && data.about !== undefined) {
                completeProfiles++;
            }
        });
        
        console.log(`✅ Complete profiles: ${completeProfiles}`);
        console.log(`📈 Success rate: ${Math.round((completeProfiles / usersSnapshot.size) * 100)}%`);

    } catch (error) {
        console.error('❌ Error during backfill:', error);
        throw error;
    }
}

backfillUserProfiles().then(() => {
    console.log('\n🎉 User profile backfill completed successfully!');
    process.exit(0);
}).catch(error => {
    console.error('💥 Backfill failed:', error);
    process.exit(1);
});
