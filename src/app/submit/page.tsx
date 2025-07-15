
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectForm } from "@/components/ProjectForm";
import { AuthGuard } from "@/components/AuthGuard";

export default function SubmitPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto max-w-2xl px-4 py-8">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight gradient-text">Submit a Project</h1>
            <p className="text-muted-foreground">
              Share your work with the community. Fill out the form below to add your project to the vault.
            </p>
          </div>
          <div className="card-glass border-gradient p-8 rounded-xl backdrop-blur-sm">
            <ProjectForm />
          </div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
