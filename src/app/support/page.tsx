import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, Mail, Github, MessageCircle, Book, HelpCircle, Bug, Lightbulb } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <LifeBuoy className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Support Center
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Need help with CodeVault? We're here to assist you with any questions or issues you might have.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Quick Help Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Book className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete guides and tutorials
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/docs">View Docs</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">FAQ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Common questions answered
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/faq">Browse FAQ</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Bug className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Report Bug</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Found an issue? Let us know
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com/DumAI-hub" target="_blank" rel="noopener noreferrer">
                      Report Issue
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Lightbulb className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Feature Request</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Suggest new features
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:patard50@gmail.com">Send Idea</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Support */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="gradient-text text-center text-2xl">Get Direct Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Mail className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-4">
                      Get personalized help via email. We typically respond within 24 hours.
                    </p>
                    <Button className="button-gradient" asChild>
                      <a href="mailto:patard50@gmail.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">patard50@gmail.com</p>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Github className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">GitHub Issues</h3>
                    <p className="text-muted-foreground mb-4">
                      Report bugs, request features, or contribute to the project directly.
                    </p>
                    <Button variant="outline" asChild>
                      <a href="https://github.com/DumAI-hub" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Repository
                      </a>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">github.com/DumAI-hub</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Issues */}
            <Card className="card-glass border-gradient backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="gradient-text">Common Issues & Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">🔐 Can't sign in to my account</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Make sure you're using the same Google account you originally signed up with. 
                      Clear your browser cache and cookies if issues persist.
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/login">Try Signing In</a>
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">📤 Project submission not working</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Ensure all required fields are filled out correctly and that your links are valid. 
                      Check your internet connection and try again.
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/submit">Submit Project</a>
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">👤 Profile information not saving</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Make sure you're logged in and have a stable internet connection. 
                      Try refreshing the page and updating your profile again.
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/profile">Edit Profile</a>
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">🔍 Can't find my project</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Check if you're logged into the correct account. Your projects are visible 
                      on your profile page and in the main project listings.
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/">Browse Projects</a>
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold mb-2">📱 Site not working on mobile</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      CodeVault is designed to work on all devices. Try refreshing the page, 
                      updating your browser, or using a different browser.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="card-hover transition-all duration-200 mb-8">
              <CardHeader>
                <CardTitle className="gradient-text">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Platform Status</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Authentication</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Database</span>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Support */}
            <Card className="card-glass border-gradient backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Join Our Community
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Connect with other students, share knowledge, and get help from the community. 
                  CodeVault is built by students, for students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="button-gradient" asChild>
                    <a href="https://github.com/DumAI-hub" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Contribute on GitHub
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/signup">
                      Join CodeVault
                    </a>
                  </Button>
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
