import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, FileText, Star, Users, Shield } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <FileText className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Submission Guidelines
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these guidelines to create high-quality project submissions that showcase your best work 
              and contribute positively to the CodeVault community.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Quick Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quality First</h3>
                  <p className="text-sm text-muted-foreground">Submit your best work with clear documentation</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Community Focus</h3>
                  <p className="text-sm text-muted-foreground">Share work that benefits and inspires others</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Academic Integrity</h3>
                  <p className="text-sm text-muted-foreground">Respect institutional policies and guidelines</p>
                </CardContent>
              </Card>
            </div>

            {/* Project Quality Standards */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <Star className="h-6 w-6" />
                  Project Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">What Makes a Great Submission</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <h4 className="font-semibold text-green-800 dark:text-green-200 flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Excellent Projects Include:
                        </h4>
                        <ul className="space-y-1 text-green-700 dark:text-green-300 text-sm">
                          <li>• Clear, descriptive project titles</li>
                          <li>• Comprehensive project descriptions</li>
                          <li>• Working demo links or screenshots</li>
                          <li>• Well-documented GitHub repositories</li>
                          <li>• Complete tech stack information</li>
                          <li>• Professional presentation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          Areas for Improvement:
                        </h4>
                        <ul className="space-y-1 text-yellow-700 dark:text-yellow-300 text-sm">
                          <li>• Vague or unclear descriptions</li>
                          <li>• Broken or missing links</li>
                          <li>• Incomplete project information</li>
                          <li>• Poor documentation</li>
                          <li>• Non-functional demos</li>
                          <li>• Missing attribution</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Project Information Checklist</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Project Title</h4>
                        <p className="text-sm text-muted-foreground">Clear, descriptive name that explains what your project does</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Description</h4>
                        <p className="text-sm text-muted-foreground">Detailed explanation of purpose, features, and target audience</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Technology Stack</h4>
                        <p className="text-sm text-muted-foreground">Complete list of languages, frameworks, and tools used</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Links</h4>
                        <p className="text-sm text-muted-foreground">Working links to GitHub repository, live demo, or documentation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Integrity */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <Shield className="h-6 w-6" />
                  Academic Integrity Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Important: Check Your Institution's Policies
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Before submitting any academic work, ensure it complies with your institution's 
                        academic integrity policies. Some assignments may have restrictions on public sharing.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Acceptable Projects</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Personal projects developed outside of coursework</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Course projects where public sharing is explicitly allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Capstone or final year projects (with permission)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Hackathon or competition entries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Open source contributions</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Projects to Avoid</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Current assignment solutions that could be copied</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Exam or test code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Work explicitly marked as confidential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Projects containing proprietary or sensitive information</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Content Standards */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 gradient-text">
                  <Users className="h-6 w-6" />
                  Community Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Content Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">✅ Encouraged Content</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Original, innovative projects</li>
                        <li>• Educational and learning-focused work</li>
                        <li>• Projects that solve real problems</li>
                        <li>• Well-documented repositories</li>
                        <li>• Collaborative and open-source projects</li>
                        <li>• Projects with clear learning outcomes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">❌ Prohibited Content</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Copied or plagiarized work</li>
                        <li>• Malicious or harmful code</li>
                        <li>• Offensive or inappropriate content</li>
                        <li>• Spam or low-quality submissions</li>
                        <li>• Commercial advertisements</li>
                        <li>• Projects violating copyright</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Attribution and Credit</h3>
                  <p className="text-muted-foreground mb-4">
                    Always give proper credit where it's due:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Acknowledge team members and collaborators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Credit external libraries and frameworks used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reference tutorials or resources that helped</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>Include appropriate licenses for your work</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="gradient-text">Best Practices for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Technical Excellence</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Clean Code</h4>
                        <p className="text-xs text-muted-foreground">Well-structured, commented, and readable code</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Documentation</h4>
                        <p className="text-xs text-muted-foreground">Clear README with setup and usage instructions</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Testing</h4>
                        <p className="text-xs text-muted-foreground">Include tests and ensure functionality works</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Presentation</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Screenshots</h4>
                        <p className="text-xs text-muted-foreground">Include visuals showing your project in action</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Demo Links</h4>
                        <p className="text-xs text-muted-foreground">Provide working links to live demonstrations</p>
                      </div>
                      <div className="p-3 border border-border rounded-lg">
                        <h4 className="font-medium text-sm">Clear Descriptions</h4>
                        <p className="text-xs text-muted-foreground">Explain what your project does and why it matters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="card-glass border-gradient backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Need Help with Your Submission?
                </h3>
                <p className="text-muted-foreground mb-6">
                  If you have questions about these guidelines or need help preparing your project submission, 
                  we're here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:patard50@gmail.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="/docs" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border font-semibold rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    View Documentation
                  </a>
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
