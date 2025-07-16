import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Users, Target, Heart, Award, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              About CodeVault
              <span className="ml-4 text-lg bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full">Beta</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Currently in beta development - A digital archive showcasing innovative student projects from colleges worldwide, 
              fostering collaboration and knowledge sharing in the developer community. Exciting new features coming soon!
            </p>
            <div className="flex justify-center">
              <Code className="h-16 w-16 text-primary animate-float" />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  CodeVault was created to bridge the gap between academic learning and real-world application. 
                  We believe that student projects represent some of the most innovative and creative solutions 
                  to today's challenges.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our platform provides a space where students can showcase their work, get feedback from peers, 
                  and inspire the next generation of developers and innovators.
                </p>
              </div>
              <div className="card-glass border-gradient p-8 rounded-xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Showcase Innovation</h3>
                      <p className="text-sm text-muted-foreground">Highlight creative student solutions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Build Community</h3>
                      <p className="text-sm text-muted-foreground">Connect students across institutions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Inspire Learning</h3>
                      <p className="text-sm text-muted-foreground">Foster knowledge sharing and growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Coming Soon Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Users className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold">Profile Pictures</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload and customize your profile with pictures to make your academic presence more personal and professional.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Award className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="font-semibold">Dissertation Upload</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload full dissertations, research papers, and academic documents with automatic file processing and organization.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Zap className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold">AI Document Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced AI will extract key insights, generate intelligent summaries, and identify research patterns from uploaded documents.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Target className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="font-semibold">Research Suggestions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered suggestions for future research directions, related studies, and potential collaboration opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-indigo-500/10 rounded-lg">
                      <Code className="h-6 w-6 text-indigo-500" />
                    </div>
                    <h3 className="font-semibold">Scope Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Intelligent analysis of research scope, impact potential, and connections to ongoing academic work in your field.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-pink-500/10 rounded-lg">
                      <Heart className="h-6 w-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold">Enhanced Collaboration</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced networking features, research matching, and collaborative tools to connect researchers with similar interests.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm">
                <Zap className="h-4 w-4" />
                <span>More exciting features in active development!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Built by a Student Developer</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">A Solo Developer's Vision - Beta Release</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    CodeVault was created by Dibakar Patar as a passion project to bridge the gap between academic learning and real-world application. 
                    Currently in active development, this platform provides a space where students can showcase their work, get feedback from peers, 
                    and inspire the next generation of developers and innovators.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We're constantly evolving and adding new features to enhance the academic sharing experience. 
                    This beta version is just the beginning of something much bigger!
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Beta Version</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>Community Focused</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Actively Developing</span>
                    </div>
                  </div>
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
