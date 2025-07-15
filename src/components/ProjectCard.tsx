
import Link from "next/link";
import { type Project } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Link as LinkIcon, CalendarDays, ThumbsUp, User, Sparkles } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const techStack = project.techStack.split(',').map(tech => tech.trim());

    return (
        <Card className="group flex flex-col h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-1 overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
            
            <Link href={`/project/${project.id}`} className="block flex-grow">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-3">
                        <CardTitle className="flex-grow text-lg font-semibold group-hover:text-blue-600 transition-colors line-clamp-2">
                            {project.title}
                        </CardTitle>
                        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex-shrink-0">
                           <ThumbsUp className="h-3 w-3" />
                           <span className="text-xs font-semibold">{project.upvotes || 0}</span>
                        </div>
                    </div>
                    
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span className="text-xs font-medium">by {project.authorName}</span>
                        </div>
                        <span className="text-xs">•</span>
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            <span className="text-xs">Batch {project.batchYear}</span>
                        </div>
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4">
                    <div className="mb-4">
                        <div className="flex items-center gap-1 mb-2">
                            <Sparkles className="h-3 w-3 text-purple-500" />
                            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                                {project.domain}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                            {project.summary || project.description}
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                        {techStack.slice(0, 3).map((tech) => (
                            <Badge 
                                key={tech} 
                                variant="secondary"
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                            >
                                {tech}
                            </Badge>
                        ))}
                        {techStack.length > 3 && (
                            <Badge 
                                variant="outline" 
                                className="text-xs border-dashed text-muted-foreground"
                            >
                                +{techStack.length - 3} more
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Link>
            
            {(project.githubLink || project.demoLink) && (
                <CardFooter className="flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t pt-3 pb-4">
                    <div className="flex w-full justify-start gap-2">
                        {project.githubLink && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                asChild
                                className="rounded-full text-xs bg-white hover:bg-gray-50 border-gray-200"
                            >
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-1.5 h-3 w-3" />
                                    Code
                                </a>
                            </Button>
                        )}
                        {project.demoLink && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                asChild
                                className="rounded-full text-xs bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
                            >
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                    <LinkIcon className="mr-1.5 h-3 w-3" />
                                    Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}
