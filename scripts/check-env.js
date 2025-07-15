#!/usr/bin/env node

/**
 * Environment validation script for Vercel deployment
 * Run this script to check if all required environment variables are configured
 */

// Load environment variables from .env.local if it exists
const path = require('path');
const fs = require('fs');

const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && values.length > 0) {
      process.env[key] = values.join('=');
    }
  });
}

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL',
];

const optionalEnvVars = [
  'GOOGLE_GENAI_API_KEY',
  'GEMINI_API_KEY',
];

console.log('🔍 Checking environment variables...\n');

let missingRequired = [];
let missingOptional = [];

// Check required variables
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingRequired.push(varName);
  } else {
    console.log(`✅ ${varName}`);
  }
});

// Check optional variables
optionalEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingOptional.push(varName);
  } else {
    console.log(`✅ ${varName}`);
  }
});

console.log('\n📋 Results:');

if (missingRequired.length === 0) {
  console.log('🎉 All required environment variables are configured!');
} else {
  console.log('❌ Missing required environment variables:');
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

if (missingOptional.length > 0) {
  console.log('⚠️  Missing optional environment variables:');
  missingOptional.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

console.log('\n📚 See .env.example for reference values');
console.log('📖 Check docs/vercel-deployment.md for deployment guide');

if (missingRequired.length > 0) {
  process.exit(1);
}
