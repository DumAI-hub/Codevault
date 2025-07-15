import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Scale className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using CodeVault. By using our platform, you agree to these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: July 15, 2025
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing and using CodeVault, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                  <p className="text-muted-foreground">
                    These terms apply to all visitors, users, and others who access or use the service.
                  </p>
                </CardContent>
              </Card>

              {/* Use License */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    Use License
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Permission is granted to temporarily download one copy of CodeVault per device 
                    for personal, non-commercial transitory viewing only.
                  </p>
                  <div>
                    <h3 className="font-semibold mb-2">This license shall automatically terminate if you violate any of these restrictions:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Modify or copy the materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Use the materials for commercial purposes or public display</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Attempt to decompile or reverse engineer any software</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Remove any copyright or other proprietary notations</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* User Content */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="gradient-text">User Content and Conduct</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Content Ownership</h3>
                    <p className="text-muted-foreground">
                      You retain all rights to any content you submit, post, or display on CodeVault. 
                      By posting content, you grant us a worldwide, non-exclusive, royalty-free license 
                      to use, display, and distribute your content on the platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Prohibited Content</h3>
                    <p className="text-muted-foreground mb-2">You agree not to post content that:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Is illegal, harmful, threatening, abusive, or defamatory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Infringes upon intellectual property rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Contains malicious code or security vulnerabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Is spam or misleading information</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Integrity */}
              <Card className="card-hover transition-all duration-200">
                <CardHeader>
                  <CardTitle className="gradient-text">Academic Integrity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Important Notice for Students
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          By sharing your projects on CodeVault, you acknowledge that your work becomes 
                          publicly visible. Ensure this complies with your institution's academic integrity 
                          policies and assignment guidelines.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Original Work</h3>
                    <p className="text-muted-foreground">
                      You represent that all content you submit is your original work or you have 
                      proper rights to share it. Always give proper attribution to collaborators 
                      and external resources used.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimers */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="gradient-text">Disclaimers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The information on this platform is provided on an "as is" basis. To the fullest 
                    extent permitted by law, this company excludes all representations, warranties, 
                    conditions and terms related to our platform and the use of this platform.
                  </p>
                  <p className="text-muted-foreground">
                    CodeVault does not warrant that the platform will be constantly available, 
                    error-free, or that defects will be corrected. We reserve the right to 
                    discontinue or modify any aspect of the service at any time.
                  </p>
                </CardContent>
              </Card>

              {/* Limitations */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="gradient-text">Limitations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    In no event shall CodeVault or its suppliers be liable for any damages 
                    (including, without limitation, damages for loss of data or profit, or due to 
                    business interruption) arising out of the use or inability to use the materials 
                    on this platform.
                  </p>
                </CardContent>
              </Card>

              {/* Modifications */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="gradient-text">Modifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    CodeVault may revise these terms of service at any time without notice. 
                    By using this platform, you agree to be bound by the current version of these terms.
                  </p>
                  <p className="text-muted-foreground">
                    We will notify users of significant changes through the platform or via email.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-4 gradient-text">Questions About These Terms?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us.
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
