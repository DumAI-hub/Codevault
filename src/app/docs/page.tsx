import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Upload, Settings, Eye, MessageCircle } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <BookOpen className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn how to make the most of CodeVault. From getting started to advanced features.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Quick Start Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card className="card-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-6 w-6 text-primary" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Create your account and set up your profile to start showcasing your projects.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="card-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Upload className="h-6 w-6 text-primary" />
                    Submit Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Share your innovative projects with the community and get valuable feedback.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="card-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-primary" />
                    Discover Work
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Explore amazing projects from students worldwide and get inspired.
                  </p>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardContent>
              </Card>
            </div>

            {/* Getting Started */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <User className="h-6 w-6" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">1. Create Your Account</h3>
                  <p className="text-muted-foreground mb-4">
                    Sign up using your Google account for quick and secure authentication. We use Google OAuth 
                    to protect your data and make the signup process seamless.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Tip:</strong> Use your academic email if available - it helps identify you as a student 
                      and builds trust within the community.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">2. Complete Your Profile</h3>
                  <p className="text-muted-foreground mb-4">
                    Fill out your profile with your academic information, domain of study, batch year, and links 
                    to your professional profiles. This helps others connect with you and understand your background.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Add your name and domain (e.g., Computer Science, Design, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Include your batch year to connect with peers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Link your GitHub, LinkedIn, and personal website</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Write a brief bio about your interests and goals</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Submitting Projects */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <Upload className="h-6 w-6" />
                  Submitting Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Project Information</h3>
                  <p className="text-muted-foreground mb-4">
                    When submitting a project, provide comprehensive information to help others understand 
                    and appreciate your work:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Title:</strong> Clear, descriptive name for your project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Description:</strong> Detailed explanation of what your project does</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Tech Stack:</strong> Technologies, frameworks, and tools used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Links:</strong> GitHub repository, live demo, or documentation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Best Practices</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Do</h4>
                      <ul className="space-y-1 text-green-700 dark:text-green-300 text-sm">
                        <li>• Provide clear, detailed descriptions</li>
                        <li>• Include working links to demos or repositories</li>
                        <li>• Use proper tags and categories</li>
                        <li>• Share projects you're proud of</li>
                        <li>• Give credit to collaborators and inspirations</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Don't</h4>
                      <ul className="space-y-1 text-red-700 dark:text-red-300 text-sm">
                        <li>• Submit projects that violate academic integrity policies</li>
                        <li>• Include broken or inaccessible links</li>
                        <li>• Share incomplete or non-functional projects</li>
                        <li>• Copy other people's work without attribution</li>
                        <li>• Use offensive or inappropriate content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <MessageCircle className="h-6 w-6" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Interacting with Others</h3>
                  <p className="text-muted-foreground mb-4">
                    CodeVault is built on respect, learning, and collaboration. Here's how to be a great community member:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Be respectful and constructive in your feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Share knowledge and help others learn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Appreciate good work by upvoting quality projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Connect with peers through their professional links</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Academic Integrity</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Always ensure that sharing your projects complies with your institution's academic integrity 
                      policies. Some assignments may not be suitable for public sharing. When in doubt, consult 
                      with your instructors before posting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="card-glass border-gradient backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <Settings className="h-6 w-6" />
                  Technical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Platform Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">🔍 Search & Filter</h4>
                      <p className="text-sm text-muted-foreground">
                        Find projects by technology, domain, or batch year
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">⭐ Reputation System</h4>
                      <p className="text-sm text-muted-foreground">
                        Upvote quality projects and build your reputation
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">🔗 GitHub Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic repository summaries and contribution tracking
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">📱 Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Works seamlessly on desktop, tablet, and mobile
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Security & Privacy</h3>
                  <p className="text-muted-foreground mb-4">
                    Your data is protected with industry-standard security measures:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Google OAuth authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Encrypted data transmission and storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Firebase security rules for data access control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No sharing of personal email addresses</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
