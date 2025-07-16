# 🗃️ CodeVault

> **A Digital Archive for Student Innovation**

CodeVault is a modern web platform where students can showcase their innovative projects, discover inspiring work from peers worldwide, and build a community of learners and creators. Built with cutting-edge technology and designed for the next generation of developers.

![CodeVault Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)

## ✨ Features

### 🚀 **Core Platform**
- **Project Showcase**: Upload and display your best academic projects with rich descriptions
- **Smart Discovery**: Advanced filtering by technology, domain, and batch year
- **User Profiles**: Complete student profiles with academic information and social links
- **Community Interaction**: Upvote quality projects and build your reputation
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices

### 🤖 **AI-Powered Features**
- **GitHub Integration**: Automatic repository analysis and summary generation
- **Smart Summarization**: AI-generated project descriptions using Google Gemini
- **Content Enhancement**: Intelligent project categorization and tagging

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful translucent cards with backdrop blur effects
- **Gradient Themes**: Eye-catching color gradients throughout the interface
- **Smooth Animations**: Micro-interactions and transitions for enhanced user experience
- **Dark/Light Mode**: Adaptive theming for user preference
- **Professional Layout**: Clean, organized presentation of project information

### 🔐 **Security & Authentication**
- **Google OAuth**: Secure authentication with Google accounts
- **Protected Routes**: User-specific content access and modification
- **Data Privacy**: GDPR-compliant data handling and user rights
- **Firebase Security**: Industry-standard data protection and access control

## 🏗️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 18, TypeScript |
| **Styling** | Tailwind CSS, Radix UI, Custom CSS |
| **Backend** | Firebase Firestore, Firebase Auth |
| **AI/ML** | Google Genkit, Gemini API |
| **Deployment** | Vercel, Firebase Hosting |
| **Development** | ESLint, Prettier, TypeScript |

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed on your machine
- **npm** or **yarn** package manager
- **Firebase project** with Firestore and Authentication enabled
- **Google AI API key** for Genkit features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DumAI-hub/codevault.git
   cd codevault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your credentials in `.env.local`:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Firebase Admin (Server-side)
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your_project.iam.gserviceaccount.com
   
   # Google AI
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication-related pages
│   ├── profile/           # User profile pages
│   ├── project/           # Project detail and edit pages
│   └── globals.css        # Global styles and utilities
├── components/            # Reusable React components
│   ├── ui/               # Radix UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and configurations
│   ├── firebase-client.ts # Firebase client configuration
│   ├── firebase-admin.ts  # Firebase admin configuration
│   ├── actions.ts        # Server actions
│   └── types.ts          # TypeScript type definitions
├── ai/                   # Google Genkit AI flows
│   ├── flows/           # AI processing workflows
│   └── genkit.ts        # Genkit configuration
└── hooks/               # Custom React hooks
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev              # Start development server (port 9002)
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run typecheck       # TypeScript type checking
```

### AI Development
```bash
npm run genkit:dev      # Start Genkit development server
npm run genkit:watch    # Start Genkit in watch mode
```

### Utilities
```bash
npm run check-env       # Validate environment variables
npm run test-profiles   # Test user profile functionality
npm run fix-profiles    # Fix user profile issues
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy automatically

3. **Environment Variables**
   Add all variables from `.env.local` to your Vercel project settings.

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 📊 Features Overview

### For Students
- 📝 **Project Submission**: Easy-to-use forms for uploading project details
- 🔍 **Discovery**: Browse projects by technology, domain, or batch year
- 👤 **Profile Management**: Showcase your academic journey and achievements
- ⭐ **Reputation System**: Build credibility through community engagement
- 💬 **Community**: Connect with peers and share knowledge

### For Educators
- 📈 **Student Tracking**: Monitor student project submissions and progress
- 📚 **Resource Discovery**: Find examples for teaching and inspiration
- 🎯 **Quality Assessment**: Review student work and provide feedback
- 📊 **Analytics**: Understand trends in student project development

### For Employers
- 🔎 **Talent Discovery**: Find talented students through their project portfolios
- 💼 **Skill Assessment**: Evaluate practical skills through real projects
- 🎓 **Campus Recruitment**: Connect with students from various institutions
- 📋 **Project Quality**: Assess problem-solving and technical abilities

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation for significant changes
- Ensure your code passes all linting and type checks

## 🐛 Bug Reports & Feature Requests

- **Bug Reports**: [Create an issue](https://github.com/DumAI-hub/codevault/issues/new?template=bug_report.md)
- **Feature Requests**: [Request a feature](https://github.com/DumAI-hub/codevault/issues/new?template=feature_request.md)
- **Questions**: [Start a discussion](https://github.com/DumAI-hub/codevault/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase Team** for the excellent backend infrastructure
- **Vercel Team** for seamless deployment platform  
- **Google AI Team** for powerful Gemini API
- **Radix UI Team** for beautiful, accessible components
- **Tailwind CSS Team** for the amazing utility-first framework
- **Open Source Community** for continuous inspiration and support

## 📞 Contact & Support

- **Developer**: [Dibakar Patar](https://linkedin.com/in/dibakarpatar)
- **Email**: patard50@gmail.com
- **GitHub**: [@DumAI-hub](https://github.com/DumAI-hub)

---


**Built with ❤️ by students, for students**

[Live Demo](https://codevault.vercel.app) • [Documentation](https://github.com/DumAI-hub/codevault/wiki) • [Report Bug](https://github.com/DumAI-hub/codevault/issues) • [Request Feature](https://github.com/DumAI-hub/codevault/issues)


