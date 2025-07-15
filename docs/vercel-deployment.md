# Vercel Deployment Guide

This guide will help you deploy your CodeVault application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Firebase project set up with required credentials
4. Google AI API key (for Genkit features)

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository and includes:
- ✅ `vercel.json` configuration file
- ✅ `.env.example` with all required variables
- ✅ Updated `package.json` with Vercel-optimized scripts

### 2. Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Choose your Git provider and repository
4. Vercel will automatically detect it's a Next.js project

### 3. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

#### Firebase Configuration (Public)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Firebase Admin (Private)
```
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your_project.iam.gserviceaccount.com
```

#### Google AI (Private)
```
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Deploy

1. Click "Deploy" in Vercel
2. Vercel will build and deploy your application
3. You'll get a live URL once deployment is complete

## Important Notes

### Firebase Private Key
When adding the `FIREBASE_PRIVATE_KEY` to Vercel:
- Include the full key with `\n` newline characters
- Wrap the entire key in quotes
- Example: `"-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"`

### Domain Configuration
After deployment:
1. Update your Firebase project's authorized domains
2. Add your Vercel domain (e.g., `your-app.vercel.app`) to Firebase Auth settings

### Custom Domain (Optional)
1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain and follow DNS configuration instructions

## Troubleshooting

### Build Errors
- Check that all environment variables are set correctly
- Ensure TypeScript/ESLint errors don't block the build (already configured in `next.config.ts`)

### Firebase Connection Issues
- Verify Firebase configuration in Vercel environment variables
- Check that your Firebase project has the correct authorized domains

### Genkit AI Issues
- Ensure `GOOGLE_GENAI_API_KEY` is set in Vercel
- Check that your Google AI API quota is not exceeded

## Post-Deployment Checklist

- [ ] Application loads correctly on Vercel URL
- [ ] Firebase authentication works
- [ ] Database operations function properly
- [ ] AI features (Genkit) are working
- [ ] All pages and routes are accessible
- [ ] Environment variables are properly configured

## Continuous Deployment

Vercel automatically redeploys when you push changes to your connected Git repository. No additional setup required!

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Review Firebase and Google AI API configurations
4. Check the Vercel documentation for Next.js apps
