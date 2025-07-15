
import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/actions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UserProjects } from "@/components/UserProjects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle, Star, Calendar, Briefcase, Linkedin, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getReputationTier = (reputation: number) => {
    if (reputation >= 300) return { name: "Mentor", color: "bg-purple-500" };
    if (reputation >= 150) return { name: "Innovator", color: "bg-blue-500" };
    if (reputation >= 50) return { name: "Contributor", color: "bg-green-500" };
    return { name: "Newbie", color: "bg-gray-500" };
};

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const profile = await getProfileById(params.id);
  
  if (!profile) {
    notFound();
  }

  const tier = getReputationTier(profile.reputation || 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={profile.photoURL} alt={profile.name} />
                            <AvatarFallback><UserCircle className="h-12 w-12"/></AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-muted-foreground">{profile.email}</p>

                        <div className="flex items-center gap-4 my-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-5 w-5" />
                                <span className="font-bold text-lg">{profile.reputation || 0}</span>
                            </div>
                            <Badge className={`${tier.color} text-white`}>{tier.name}</Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground space-y-2 text-left w-full mt-2">
                            <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-2"/>
                                <span>{profile.domain}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2"/>
                                <span>Batch of {profile.batchYear}</span>
                            </div>
                        </div>

                         <div className="flex items-center justify-center gap-3 mt-6">
                            {profile.linkedinUrl && (
                                <Button variant="outline" size="icon" asChild>
                                    <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4"/></a>
                                </Button>
                            )}
                            {profile.githubUrl && (
                                <Button variant="outline" size="icon" asChild>
                                    <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4"/></a>
                                </Button>
                            )}
                            {profile.websiteUrl && (
                                <Button variant="outline" size="icon" asChild>
                                    <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer"><Globe className="h-4 w-4"/></a>
                                </Button>
                            )}
                        </div>

                    </CardContent>
                </Card>
                 {profile.about && (
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{profile.about}</p>
                        </CardContent>
                    </Card>
                 )}
            </div>

            <div className="lg:col-span-2">
                <UserProjects authorId={params.id} />
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
