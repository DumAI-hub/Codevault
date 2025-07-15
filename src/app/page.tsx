
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Filter, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { getProjects } from "@/lib/actions";
import { ProjectDashboard } from "@/components/ProjectDashboard";

export default async function Home() {
  const allProjects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-full w-full bg-background"
            style={{
              backgroundImage:
                "radial-gradient(circle at top left, hsl(252 87% 98%), transparent), radial-gradient(circle at bottom right, hsl(235 91% 96%), transparent)",
            }}
          ></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              A Digital Archive for College Projects
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Showcase Your Work with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeVault
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
              CodeVault serves as a digital archive for college projects. Students can upload project titles, descriptions, tech stacks, and links. The platform uses Gemini AI to generate short summaries, making it easier for others to explore and understand each project.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                <Link href="/submit">
                  Submit a Project <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
             <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Explore Projects</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Filter by tech stack, domain, or batch year to find relevant work from your peers.
              </p>
            </div>
            <ProjectDashboard initialProjects={allProjects} />
          </div>
        </section>

        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Powered by Gemini AI</h2>
                         <p className="mt-4 text-lg text-slate-600">CodeVault leverages state-of-the-art AI to automatically generate concise, easy-to-read summaries for every project description. This helps everyone, from recruiters to fellow students, quickly grasp the essence of each project.</p>
                         <div className="mt-8 space-y-4">
                           <Card className="flex items-center p-4">
                              <Code className="h-6 w-6 mr-4 text-primary"/>
                              <div>
                                <CardTitle className="text-base">Project Showcase</CardTitle>
                                <CardDescription>A centralized platform to display and discover student projects.</CardDescription>
                              </div>
                           </Card>
                            <Card className="flex items-center p-4">
                              <Sparkles className="h-6 w-6 mr-4 text-primary"/>
                              <div>
                                <CardTitle className="text-base">AI-Powered Summaries</CardTitle>
                                <CardDescription>Automatic summaries for every project for quick insights.</CardDescription>
                              </div>
                           </Card>
                           <Card className="flex items-center p-4">
                              <Filter className="h-6 w-6 mr-4 text-primary"/>
                              <div>
                                <CardTitle className="text-base">Advanced Filtering</CardTitle>
                                <CardDescription>Easily find projects by domain, tech stack, or year.</CardDescription>
                              </div>
                           </Card>
                         </div>
                    </div>
                     <div>
                        <Image src="https://placehold.co/600x400.png" alt="AI Technology" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="technology abstract" />
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="py-8 bg-white border-t">
          <div className="container mx-auto px-4 text-center text-slate-500">
              <p>&copy; {new Date().getFullYear()} CodeVault. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
