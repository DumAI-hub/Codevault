
"use client";

import { useState, useMemo, useEffect } from "react";
import { type Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProjectDashboardProps {
    initialProjects: Project[];
}

export function ProjectDashboard({ initialProjects }: ProjectDashboardProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [searchTerm, setSearchTerm] = useState("");
    const [domainFilter, setDomainFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");

    const uniqueDomains = useMemo(() => {
        const domains = new Set(projects.map(p => p.domain).filter(Boolean));
        return ["all", ...Array.from(domains)];
    }, [projects]);

    const uniqueYears = useMemo(() => {
        const years = new Set(projects.map(p => p.batchYear.toString()));
        return ["all", ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))];
    }, [projects]);

    useEffect(() => {
        let result = projects;

        const lowercasedSearchTerm = searchTerm.toLowerCase();
        if (lowercasedSearchTerm) {
            result = result.filter(p => 
                p.title.toLowerCase().includes(lowercasedSearchTerm) ||
                p.techStack.toLowerCase().includes(lowercasedSearchTerm) ||
                p.summary?.toLowerCase().includes(lowercasedSearchTerm)
            );
        }

        if (domainFilter !== "all") {
            result = result.filter(p => p.domain === domainFilter);
        }

        if (yearFilter !== "all") {
            result = result.filter(p => p.batchYear === parseInt(yearFilter, 10));
        }

        setFilteredProjects(result);
    }, [searchTerm, domainFilter, yearFilter, projects]);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Explore projects from the CodeVault archive.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="card-hover transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold gradient-text">{projects.length}</div>
                    </CardContent>
                </Card>
                <Card className="card-hover transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Domains</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{uniqueDomains.length - 1}</div>
                    </CardContent>
                </Card>
                <Card className="card-hover transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Distinct Batch Years</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{uniqueYears.length - 1}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filter Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Input 
                        placeholder="Search by title, tech stack, or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Filter by Domain</label>
                            <Select value={domainFilter} onValueChange={setDomainFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Domains" />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueDomains.map(d => <SelectItem key={d} value={d}>{d === 'all' ? 'All Domains' : d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Filter by Year</label>
                            <Select value={yearFilter} onValueChange={setYearFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Years" />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueYears.map(y => <SelectItem key={y} value={y}>{y === 'all' ? 'All Years' : y}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4 gradient-text">Available Projects</h2>
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-dashed border-2 rounded-lg card-glass backdrop-blur-sm">
                        <h3 className="text-xl font-semibold">No Projects Found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
