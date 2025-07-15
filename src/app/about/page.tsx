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
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A digital archive showcasing innovative student projects from colleges worldwide, 
              fostering collaboration and knowledge sharing in the developer community.
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

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Projects Showcased</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                  <p className="text-muted-foreground">Students Connected</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                  <p className="text-muted-foreground">Institutions Represented</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">Built by Students, for Students</h2>
            <div className="max-w-4xl mx-auto">
              <Card className="card-glass border-gradient backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Created with Passion</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    CodeVault was born from the belief that student projects deserve recognition and that 
                    knowledge sharing accelerates innovation. Our platform is continuously evolving, 
                    driven by feedback from our amazing community.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Open Source</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>Community Driven</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>Made with Love</span>
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
