
import { notFound } from "next/navigation";
import { getProjectById, getProfileById } from "@/lib/actions";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Link as LinkIcon, CalendarDays, ArrowLeft, UserCircle } from "lucide-react";
import Link from "next/link";
import { GithubSummary } from "@/components/GithubSummary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectInteractions } from "@/components/ProjectInteractions";
import { ProjectComments } from "@/components/ProjectComments";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const authorProfile = await getProfileById(project.authorId);
  const techStack = project.techStack.split(',').map(tech => tech.trim());

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{project.domain} - {project.batchYear}</span>
                    </CardDescription>
                  </div>
                   <ProjectInteractions project={project} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 mb-6">
                  {project.description}
                </p>
                <h3 className="font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
              </CardContent>
            </Card>

            {project.githubLink && (
              <GithubSummary githubLink={project.githubLink} />
            )}

            <ProjectComments projectId={project.id!} />

          </div>

          <aside className="md:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Author</CardTitle>
                </CardHeader>
                <CardContent>
                    {authorProfile ? (
                        <Link href={`/profile/${authorProfile.id}`} className="flex items-center gap-4 group">
                             <Avatar>
                                <AvatarImage src={authorProfile.photoURL} alt={authorProfile.name} />
                                <AvatarFallback><UserCircle className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                                <div className="font-semibold group-hover:underline">{authorProfile.name}</div>
                                <div className="text-xs text-muted-foreground">{authorProfile.domain}</div>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback><UserCircle className="h-5 w-5"/></AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-semibold">Anonymous</div>
                        </div>
                    )}
                </CardContent>
             </Card>

             <div>
                <h3 className="font-semibold text-lg mb-4">Project Links</h3>
                <div className="flex flex-col gap-3">
                    {project.githubLink && (
                        <Button variant="outline" asChild className="justify-start">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
                            </a>
                        </Button>
                    )}
                    {project.demoLink && (
                        <Button variant="outline" asChild className="justify-start">
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                View Live Demo
                            </a>
                        </Button>
                    )}
                </div>
             </div>
          </aside>
        </div>
      </main>
    </>
  );
}
