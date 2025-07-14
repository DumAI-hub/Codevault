
import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/actions";
import { Header } from "@/components/Header";
import { ProjectEditForm } from "@/components/ProjectEditForm";
import { AuthGuard } from "@/components/AuthGuard";

export default async function ProjectEditPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <AuthGuard>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">
            Update the details of your project.
          </p>
        </div>
        <ProjectEditForm project={project} />
      </main>
    </AuthGuard>
  );
}
