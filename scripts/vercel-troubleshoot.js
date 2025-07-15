#!/usr/bin/env node

/**
 * Vercel Deployment Troubleshooting Script
 * This script helps identify common deployment issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vercel Deployment Troubleshooting\n');

// Check 1: Environment variables
console.log('1. Checking environment variables...');
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('   Create .env.local with your environment variables');
} else {
  console.log('✅ .env.local file exists');
}

// Check 2: Conflicting files
console.log('\n2. Checking for conflicting files...');
const conflictingFiles = [
  'firebase.json',
  'apphosting.yaml',
  '.firebaserc',
  'public/index.html'
];

let conflicts = [];
conflictingFiles.forEach(file => {
  if (fs.existsSync(file)) {
    conflicts.push(file);
  }
});

if (conflicts.length > 0) {
  console.log('⚠️  Found conflicting files:');
  conflicts.forEach(file => console.log(`   - ${file}`));
  console.log('   These files might interfere with Vercel deployment');
} else {
  console.log('✅ No conflicting files found');
}

// Check 3: Package.json structure
console.log('\n3. Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ Build script found');
  } else {
    console.log('❌ Build script missing');
  }
  
  if (packageJson.dependencies && packageJson.dependencies.next) {
    console.log('✅ Next.js dependency found');
  } else {
    console.log('❌ Next.js dependency missing');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Check 4: Next.js app structure
console.log('\n4. Checking Next.js app structure...');
const requiredDirs = ['src/app'];
const requiredFiles = ['src/app/layout.tsx', 'src/app/page.tsx'];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir} directory exists`);
  } else {
    console.log(`❌ ${dir} directory missing`);
  }
});

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Check 5: Vercel configuration
console.log('\n5. Checking Vercel configuration...');
if (fs.existsSync('vercel.json')) {
  console.log('✅ vercel.json exists');
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    if (vercelConfig.framework === 'nextjs') {
      console.log('✅ Framework set to nextjs');
    } else {
      console.log('⚠️  Framework not set to nextjs');
    }
  } catch (error) {
    console.log('❌ Error reading vercel.json:', error.message);
  }
} else {
  console.log('✅ vercel.json exists (Vercel will auto-detect Next.js)');
}

// Check 6: Dependencies that might cause issues
console.log('\n6. Checking for problematic dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const problematicDeps = [
    'genkit',
    '@genkit-ai/core',
    '@opentelemetry/sdk-node'
  ];
  
  const foundProblematic = problematicDeps.filter(dep => allDeps[dep]);
  
  if (foundProblematic.length > 0) {
    console.log('⚠️  Found dependencies that may need special handling:');
    foundProblematic.forEach(dep => console.log(`   - ${dep}`));
    console.log('   These are configured in next.config.ts serverExternalPackages');
  } else {
    console.log('✅ No problematic dependencies found');
  }
} catch (error) {
  console.log('❌ Error checking dependencies:', error.message);
}

console.log('\n📋 Common Vercel Deployment Issues & Solutions:');
console.log('');
console.log('1. Build Timeout:');
console.log('   - Increase memory allocation in vercel.json');
console.log('   - Use NODE_OPTIONS="--max-old-space-size=4096"');
console.log('');
console.log('2. Environment Variables:');
console.log('   - Ensure all required env vars are set in Vercel dashboard');
console.log('   - Check variable names match exactly (case-sensitive)');
console.log('');
console.log('3. Firebase Private Key:');
console.log('   - Ensure private key includes newline characters (\\n)');
console.log('   - Wrap the entire key in quotes');
console.log('');
console.log('4. Module Resolution Issues:');
console.log('   - Check next.config.ts serverExternalPackages');
console.log('   - Verify webpack externals configuration');
console.log('');
console.log('5. Framework Detection:');
console.log('   - Ensure Vercel detects this as a Next.js project');
console.log('   - Check that src/app/page.tsx exists');

console.log('\n🚀 Next Steps:');
console.log('1. Fix any issues identified above');
console.log('2. Commit and push changes to your repository');
console.log('3. Redeploy on Vercel');
console.log('4. Check Vercel deployment logs for specific error messages');
