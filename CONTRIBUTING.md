# Contributing to CodeVault

Thank you for your interest in contributing to CodeVault! We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/codevault.git
   cd codevault
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables** (see README.md)
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and **what behavior you expected**
- **Include screenshots** if applicable
- **Specify your environment** (OS, browser, Node.js version)

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested feature
- **Explain why this feature would be useful** to CodeVault users
- **Include mockups or examples** if applicable

### 🔧 Code Contributions

#### Types of Contributions We're Looking For

- **Bug fixes**
- **New features** that align with the project vision
- **Performance improvements**
- **Documentation improvements**
- **UI/UX enhancements**
- **Test coverage improvements**
- **Accessibility improvements**

## Development Guidelines

### 🏗️ Project Structure

```
src/
├── app/                 # Next.js pages (App Router)
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── forms/          # Form components
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
├── ai/                 # AI/ML related code
└── types/              # TypeScript type definitions
```

### 📝 Coding Standards

#### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

#### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces
- Implement proper error boundaries when needed

#### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design (mobile-first approach)
- Use semantic HTML elements

#### Code Style

- Use ESLint and Prettier configurations
- Follow consistent naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for components and types
  - `kebab-case` for file names
- Write self-documenting code with clear comments when necessary

### 🧪 Testing

- Write tests for new features and bug fixes
- Ensure existing tests pass before submitting
- Test across different browsers and devices
- Test with various user permissions and states

### 📖 Documentation

- Update documentation for any new features
- Include JSDoc comments for complex functions
- Update README.md if adding new dependencies or setup steps

## Pull Request Process

### Before Submitting

1. **Ensure your code follows** the project's coding standards
2. **Run tests** and ensure they pass:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
3. **Update documentation** as needed
4. **Test your changes** thoroughly

### Submitting Your PR

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub

### PR Title and Description

- Use a clear, descriptive title
- Reference any related issues (e.g., "Fixes #123")
- Describe what changes you made and why
- Include screenshots for UI changes
- List any breaking changes

### Example PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for new functionality
- [ ] Tested in multiple browsers

## Screenshots (if applicable)
[Include screenshots of UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings or errors
```

## Issue Guidelines

### Issue Labels

We use labels to categorize issues:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `priority-high`: Urgent issues
- `ui/ux`: User interface and experience

### Working on Issues

1. **Check if the issue is assigned** before starting work
2. **Comment on the issue** to let others know you're working on it
3. **Ask questions** if anything is unclear
4. **Reference the issue** in your commit messages and PR

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Project documentation
- Special mentions in release notes

## Questions?

If you have questions about contributing:

- **Check existing documentation** first
- **Search existing issues** for similar questions
- **Create a new discussion** on GitHub
- **Contact maintainers** directly if needed

---

Thank you for contributing to CodeVault! Your efforts help make this platform better for students worldwide. 🚀
