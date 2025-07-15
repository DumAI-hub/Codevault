#!/usr/bin/env node

const admin = require('firebase-admin');

// Load environment variables first
require('dotenv').config({ path: '.env.local' });

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

async function testUserProfileStorage() {
    console.log('🔍 Testing Firebase user profile storage...\n');

    try {
        // Test 1: Check if we can write to Firestore
        console.log('1. Testing Firestore write permissions...');
        const testDoc = await db.collection('test').doc('write-test').set({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            test: true
        });
        console.log('✅ Firestore write successful\n');

        // Test 2: Check existing users
        console.log('2. Checking existing users in Firestore...');
        const usersSnapshot = await db.collection('users').get();
        console.log(`📊 Found ${usersSnapshot.size} user(s) in Firestore:`);
        
        usersSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`   - User ID: ${doc.id}`);
            console.log(`     Name: ${data.name || 'N/A'}`);
            console.log(`     Domain: ${data.domain || 'N/A'}`);
            console.log(`     Batch Year: ${data.batchYear || 'N/A'}`);
            console.log(`     Reputation: ${data.reputation || 0}`);
            console.log('');
        });

        // Test 3: Check Firebase Auth users
        console.log('3. Checking Firebase Auth users...');
        let authUsers = [];
        let nextPageToken;
        
        do {
            const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
            authUsers.push(...listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log(`👥 Found ${authUsers.length} user(s) in Firebase Auth:`);
        
        for (const user of authUsers) {
            console.log(`   - Auth User ID: ${user.uid}`);
            console.log(`     Email: ${user.email || 'N/A'}`);
            console.log(`     Display Name: ${user.displayName || 'N/A'}`);
            console.log(`     Created: ${user.metadata.creationTime}`);
            
            // Check if this auth user has a Firestore profile
            const profileDoc = await db.collection('users').doc(user.uid).get();
            if (profileDoc.exists) {
                console.log(`     ✅ Has Firestore profile`);
            } else {
                console.log(`     ❌ Missing Firestore profile`);
            }
            console.log('');
        }

        // Test 4: Create a test profile
        console.log('4. Testing profile creation...');
        const testUserId = 'test-user-' + Date.now();
        const testProfile = {
            name: 'Test User',
            batchYear: 2024,
            domain: 'Software Engineering',
            about: 'This is a test profile',
            reputation: 0,
            linkedinUrl: '',
            githubUrl: '',
            websiteUrl: '',
        };

        await db.collection('users').doc(testUserId).set(testProfile);
        console.log('✅ Test profile created successfully');

        // Verify the test profile
        const createdProfile = await db.collection('users').doc(testUserId).get();
        if (createdProfile.exists) {
            console.log('✅ Test profile verified in Firestore');
            console.log('   Data:', createdProfile.data());
        } else {
            console.log('❌ Test profile not found after creation');
        }

        // Clean up test profile
        await db.collection('users').doc(testUserId).delete();
        console.log('🧹 Test profile cleaned up');

        // Clean up test collection
        await db.collection('test').doc('write-test').delete();
        console.log('🧹 Test collection cleaned up');

    } catch (error) {
        console.error('❌ Error during testing:', error);
        
        if (error.code === 'permission-denied') {
            console.log('\n💡 This looks like a Firestore security rules issue.');
            console.log('   Make sure your Firestore rules allow writes to the "users" collection.');
        }
        
        if (error.code === 'unauthenticated') {
            console.log('\n💡 This looks like an authentication issue.');
            console.log('   Check your Firebase service account credentials.');
        }
    }
}

// Load environment variables first
require('dotenv').config({ path: '.env.local' });

testUserProfileStorage().then(() => {
    console.log('\n✨ Profile storage test completed!');
    process.exit(0);
}).catch(error => {
    console.error('💥 Test failed:', error);
    process.exit(1);
});
