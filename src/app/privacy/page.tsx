import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Here's how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: July 15, 2025
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Information We Collect */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-6 w-6 text-primary" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Information</h3>
                    <p className="text-muted-foreground">
                      When you create an account, we collect your email address, name, and profile information 
                      you choose to provide. We use Google OAuth for authentication, so we receive basic 
                      profile information from your Google account.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Project Data</h3>
                    <p className="text-muted-foreground">
                      When you submit projects, we store the project details, descriptions, links, and any 
                      media you upload. This information is used to showcase your work to the community.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Usage Information</h3>
                    <p className="text-muted-foreground">
                      We collect information about how you use CodeVault, including pages visited, 
                      projects viewed, and interactions with other users' content.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Information */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-primary" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To provide and maintain our services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To authenticate your account and verify your identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To display your projects and profile to other users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To send you important updates about your account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To improve our platform and user experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>To communicate with you about new features and updates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Data Protection */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="h-6 w-6 text-primary" />
                    How We Protect Your Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Security Measures</h3>
                    <p className="text-muted-foreground">
                      We use industry-standard security measures to protect your data, including encryption 
                      in transit and at rest, secure authentication through Google OAuth, and regular 
                      security updates.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Storage</h3>
                    <p className="text-muted-foreground">
                      Your data is stored on secure Firebase servers with Google Cloud Platform. We use 
                      Firebase Security Rules to ensure data access is properly controlled.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Access Control</h3>
                    <p className="text-muted-foreground">
                      Only you can edit your own profile and projects. Other users can view your public 
                      information but cannot modify it. We never share your email address with other users.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card className="card-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="gradient-text">Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Access Your Data</h3>
                      <p className="text-sm text-muted-foreground">
                        You can view and download all your data through your profile page.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Update Information</h3>
                      <p className="text-sm text-muted-foreground">
                        You can update your profile and project information at any time.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Delete Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        You can delete your projects at any time from your profile.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-semibold mb-2">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Contact us to permanently delete your account and all associated data.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-4 gradient-text">Questions About Privacy?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or how we handle your data, 
                    please don't hesitate to contact us.
                  </p>
                  <a 
                    href="mailto:patard50@gmail.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    patard50@gmail.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
