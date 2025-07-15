
"use client";

import { useEffect, useState } from "react";
import { getProjectsByAuthor } from "@/lib/actions";
import { type Project } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Star, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "./ui/button";

interface UserProjectsProps {
    authorId: string;
}

export function UserProjects({ authorId }: UserProjectsProps) {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const isOwner = user?.uid === authorId;

    useEffect(() => {
        async function fetchProjects() {
            setLoading(true);
            const userProjects = await getProjectsByAuthor(authorId);
            setProjects(userProjects);
            setLoading(false);
        }
        fetchProjects();
    }, [authorId]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submitted Projects</CardTitle>
                <CardDescription>
                    Work contributed to the vault.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-24">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                ) : projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No projects submitted yet.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {projects.map(project => (
                             <div key={project.id} className="group border-gradient p-4 rounded-lg card-hover transition-all duration-200 backdrop-blur-sm bg-card/50">
                                <div className="flex justify-between items-start gap-4">
                                    <Link href={`/project/${project.id}`} className="flex-grow">
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                                    </Link>
                                    <div className="flex items-center gap-1 text-sm text-yellow-600 flex-shrink-0">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="font-medium">{project.reputation || 0}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.summary || project.description}</p>
                                <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack.split(',').slice(0, 3).map(tech => (
                                            <Badge key={tech} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">{tech.trim()}</Badge>
                                        ))}
                                    </div>
                                    {isOwner && (
                                        <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/project/${project.id}/edit`}>
                                                <Edit className="h-3 w-3 mr-1" />
                                                Edit
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                             </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
