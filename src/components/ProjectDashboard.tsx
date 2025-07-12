"use client";

import { useState, useMemo, useEffect } from "react";
import { type Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";

interface ProjectDashboardProps {
    initialProjects: Project[];
}

export function ProjectDashboard({ initialProjects }: ProjectDashboardProps) {
    const [projects, setProjects] = useState(initialProjects);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [searchTerm, setSearchTerm] = useState("");
    const [domainFilter, setDomainFilter] = useState("all");
    const [yearFilter, setYearFilter] = useState("all");

    useEffect(() => {
        let result = projects;

        if (searchTerm) {
            result = result.filter(p => 
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.techStack.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.summary?.toLowerCase().includes(searchTerm.toLowerCase())
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


    const uniqueDomains = useMemo(() => {
        const domains = new Set(projects.map(p => p.domain));
        return ["all", ...Array.from(domains)];
    }, [projects]);

    const uniqueYears = useMemo(() => {
        const years = new Set(projects.map(p => p.batchYear.toString()));
        return ["all", ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))];
    }, [projects]);


    return (
        <div className="space-y-8">
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input 
                        placeholder="Search by title, tech..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="md:col-span-3"
                    />
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
            </div>

            {filteredProjects.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-dashed border-2 rounded-lg">
                    <h3 className="text-xl font-semibold">No Projects Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
                </div>
            )}
        </div>
    );
}
