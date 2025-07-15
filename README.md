# CodeVault

A Next.js application with Firebase integration, AI-powered features using Genkit, and a modern UI built with Tailwind CSS and Radix UI.

## Features

- 🔥 Firebase Authentication & Firestore
- 🤖 AI-powered features with Google Genkit
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- 📱 Responsive design
- 🔒 Protected routes and authentication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project
- Google AI API key (for Genkit features)

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in your Firebase and Google AI credentials in `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment

### Vercel Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `GOOGLE_GENAI_API_KEY`

4. Deploy! Vercel will automatically build and deploy your application.

### Environment Variables

See `.env.example` for all required environment variables. Make sure to set these in your Vercel project settings.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - React components
- `src/lib/` - Utility functions and configurations
- `src/ai/` - Genkit AI flows and configurations
- `src/hooks/` - Custom React hooks

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Genkit
- **Deployment**: Vercel

To get started, take a look at src/app/page.tsx.
