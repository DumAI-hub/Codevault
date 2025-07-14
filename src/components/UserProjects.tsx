
"use client";

import { useEffect, useState } from "react";
import { getProjectsByAuthor } from "@/lib/actions";
import { type Project } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface UserProjectsProps {
    authorId: string;
}

export function UserProjects({ authorId }: UserProjectsProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

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
                             <Link href={`/project/${project.id}`} key={project.id} className="block border p-4 rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">{project.title}</h3>
                                     <div className="flex items-center gap-1 text-sm text-yellow-600">
                                        <Star className="h-4 w-4" />
                                        <span>{project.reputation || 0}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.summary || project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.techStack.split(',').slice(0, 3).map(tech => (
                                        <Badge key={tech} variant="secondary" className="text-xs">{tech.trim()}</Badge>
                                    ))}
                                </div>
                             </Link>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
