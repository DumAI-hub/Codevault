import { Header } from "@/components/Header";
import { ProjectDashboard } from "@/components/ProjectDashboard";
import { getProjects } from "@/lib/actions";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProjectDashboard initialProjects={projects} />
      </main>
    </>
  );
}
