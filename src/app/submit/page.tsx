import { Header } from "@/components/Header";
import { ProjectForm } from "@/components/ProjectForm";

export default function SubmitPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Submit a Project</h1>
            <p className="text-muted-foreground">
                Share your work with the community. Fill out the form below to add your project to the vault.
            </p>
        </div>
        <ProjectForm />
      </main>
    </>
  );
}