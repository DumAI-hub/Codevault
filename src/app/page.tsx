
import { Header } from "@/components/Header";
import { getProjects } from "@/lib/actions";
import { ProjectDashboard } from "@/components/ProjectDashboard";

export default async function Home() {
  const allProjects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <ProjectDashboard initialProjects={allProjects} />
      </main>
      <footer className="py-6 bg-white border-t">
          <div className="container mx-auto px-4 text-center text-slate-500">
              <p>&copy; {new Date().getFullYear()} CodeVault. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
