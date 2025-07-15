#!/usr/bin/env node

/**
 * Pre-deployment cleanup script for Vercel
 * This script ensures clean deployment by removing potential conflicts
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up for Vercel deployment...\n');

// Files that might interfere with Vercel deployment
const potentialConflicts = [
  'firebase.json',
  'apphosting.yaml',
  '.firebaserc',
  'public/index.html', // Firebase default page
  'index.html', // Root level index.html
];

let cleanedFiles = [];

potentialConflicts.forEach(file => {
  if (fs.existsSync(file)) {
    const backupFile = `${file}.backup`;
    if (!fs.existsSync(backupFile)) {
      fs.renameSync(file, backupFile);
      cleanedFiles.push(file);
      console.log(`📦 Backed up: ${file} → ${backupFile}`);
    } else {
      console.log(`⚠️  Backup already exists: ${backupFile}`);
    }
  }
});

// Check for problematic static files in public directory
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  const htmlFiles = publicFiles.filter(file => file.endsWith('.html'));
  
  if (htmlFiles.length > 0) {
    console.log('⚠️  Found HTML files in public directory:');
    htmlFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
    console.log('   These might override Next.js routing in Vercel');
  }
}

// Verify Next.js app structure
const requiredDirs = ['src/app', 'src/components', 'src/lib'];
const missingDirs = requiredDirs.filter(dir => !fs.existsSync(dir));

if (missingDirs.length > 0) {
  console.log('❌ Missing required directories:');
  missingDirs.forEach(dir => console.log(`   - ${dir}`));
} else {
  console.log('✅ Next.js app structure verified');
}

// Check for main page
if (fs.existsSync('src/app/page.tsx')) {
  console.log('✅ Main page (src/app/page.tsx) found');
} else {
  console.log('❌ Main page (src/app/page.tsx) not found');
}

console.log('\n🚀 Cleanup complete! Your app is ready for Vercel deployment.');

if (cleanedFiles.length > 0) {
  console.log('\n📝 Note: Firebase files have been backed up and can be restored later if needed.');
  console.log('💡 To restore Firebase files for local development:');
  cleanedFiles.forEach(file => {
    console.log(`   mv ${file}.backup ${file}`);
  });
}
