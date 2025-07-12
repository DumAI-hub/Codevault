import { type Project } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Link as LinkIcon, CalendarDays } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const techStack = project.techStack.split(',').map(tech => tech.trim());

    return (
        <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 pt-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{project.domain} - {project.batchYear}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm mb-4">
                    {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-shrink-0">
                <div className="flex w-full justify-start gap-2">
                    {project.githubLink && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                    )}
                     {project.demoLink && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Demo
                            </a>
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
