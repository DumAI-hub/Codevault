
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { getProjects } from "@/lib/actions";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default async function Home() {
  const allProjects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
           <div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-rose-50/50 -z-10"
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)'
            }}
           ></div>
           <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium tracking-wide text-foreground bg-background/70 border rounded-full mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Discover & Showcase Student Work
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Explore the Innovation Hub at <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CodeVault
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10">
                CodeVault is a central archive for student projects, powered by AI summaries. Upload your work, get feedback, and discover what your peers are building.
              </p>
              <div className="flex justify-center items-center gap-4">
                 <Button asChild size="lg" className="rounded-full">
                    <Link href="/submit">Submit a Project</Link>
                 </Button>
                 <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link href="#projects">
                        Explore Projects <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                 </Button>
              </div>
           </div>
        </section>

        <section id="projects" className="py-20 md:py-28 bg-muted/40">
           <div className="container mx-auto px-4">
              <ProjectDashboard initialProjects={allProjects} />
           </div>
        </section>
      </main>
      <footer className="py-6 bg-background border-t">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} CodeVault. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
