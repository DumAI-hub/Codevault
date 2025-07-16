
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { getProjects } from "@/lib/actions";
import Link from "next/link";
import { Sparkles, ArrowRight, Code2, Users, Star, TrendingUp } from "lucide-react";

export default async function Home() {
  const allProjects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
           <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-rose-50/50 -z-10"
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'
            }}
           ></div>
           
           {/* Floating Elements */}
           <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
           <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
           <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-200/30 rounded-full blur-xl"></div>
           
           <div className="container mx-auto px-4 text-center relative">
              <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-foreground bg-white/80 border border-white/20 rounded-full mb-8 backdrop-blur-sm shadow-lg">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Discover & Showcase Student Innovation
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 leading-tight">
                Explore the Future at <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  CodeVault
                </span>
              </h1>
              <div className="flex justify-center mb-8">
                <span className="text-sm md:text-base bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full shadow-lg">
                  Beta Version
                </span>
              </div>
              
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
                Currently in beta - The ultimate digital archive for student projects. Upload your work, get AI-powered insights, 
                discover innovative solutions, and connect with talented peers. Exciting new features like dissertation analysis and research suggestions coming soon!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
                 <Button asChild size="lg" className="rounded-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Link href="/submit">Submit Your Project</Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-3 bg-white/50 backdrop-blur-sm border-white/20 hover:bg-white/70">
                    <Link href="#projects">
                        Explore Projects <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                 </Button>
              </div>
           </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CodeVault?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of academic project sharing with our cutting-edge features.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Get intelligent summaries and insights about your projects with our advanced AI technology.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded students, share feedback, and collaborate on innovative projects.
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Recognition System</h3>
                <p className="text-muted-foreground">
                  Build your reputation with our upvote system and showcase your skills to potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 md:py-28 bg-gray-50">
           <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-lg text-muted-foreground">
                  Discover amazing projects created by talented students from around the world.
                </p>
              </div>
              <ProjectDashboard initialProjects={allProjects} />
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
