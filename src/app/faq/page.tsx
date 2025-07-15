import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Users, Upload, Shield, Code, Star } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <HelpCircle className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about CodeVault. Can't find what you're looking for? Contact us!
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Upload className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Submissions</h3>
                  <p className="text-sm text-muted-foreground">How to share your projects</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with other students</p>
                </CardContent>
              </Card>
              <Card className="text-center card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Privacy</h3>
                  <p className="text-sm text-muted-foreground">Your data protection</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Accordion */}
            <Card className="card-glass border-gradient backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="gradient-text">General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is CodeVault?</AccordionTrigger>
                    <AccordionContent>
                      CodeVault is a digital archive and community platform where students can showcase their innovative projects, 
                      get feedback from peers, and discover inspiring work from other students worldwide. It's designed to bridge 
                      the gap between academic learning and real-world application.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is CodeVault free to use?</AccordionTrigger>
                    <AccordionContent>
                      Yes! CodeVault is completely free to use. You can create an account, submit projects, browse other students' 
                      work, and interact with the community without any cost. We believe in making knowledge sharing accessible to everyone.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Who can use CodeVault?</AccordionTrigger>
                    <AccordionContent>
                      CodeVault is primarily designed for students from colleges and universities worldwide. However, anyone interested 
                      in exploring innovative student projects or sharing their academic work is welcome to join our community.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I submit a project?</AccordionTrigger>
                    <AccordionContent>
                      To submit a project, create an account and click "Submit Project" in the navigation menu. Fill out the project 
                      details including title, description, tech stack, and any relevant links. Your project will be immediately 
                      visible to the community - no approval process required!
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What types of projects can I submit?</AccordionTrigger>
                    <AccordionContent>
                      You can submit any type of project you've worked on as part of your academic journey - web applications, 
                      mobile apps, research projects, hardware prototypes, design work, data analysis projects, and more. 
                      We welcome projects from all domains and skill levels.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Is my submitted content safe and secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take security seriously. Your data is stored securely using Google Firebase with industry-standard 
                      encryption. You maintain ownership of your content and can edit or delete your projects at any time. 
                      We never share your email address with other users.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>Can I edit or delete my projects after submission?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely! You have full control over your content. You can edit project details, update links, 
                      or delete projects entirely from your profile page. Only you can modify your own projects.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>How does the reputation system work?</AccordionTrigger>
                    <AccordionContent>
                      The reputation system allows community members to appreciate quality projects. Users can upvote projects 
                      they find interesting or helpful. Your total reputation is displayed on your profile and helps showcase 
                      your contributions to the community.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>What if my institution has policies about sharing academic work?</AccordionTrigger>
                    <AccordionContent>
                      Before sharing any project, please ensure it complies with your institution's academic integrity policies 
                      and assignment guidelines. Some schools may have restrictions on sharing coursework publicly. 
                      When in doubt, consult with your professors or academic advisors.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>How can I discover interesting projects?</AccordionTrigger>
                    <AccordionContent>
                      Browse the homepage to see featured projects, use the search and filter functionality to find projects 
                      by domain or batch year, or explore individual user profiles to see all their submissions. 
                      The platform is designed to help you easily discover innovative work from your peers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-11">
                    <AccordionTrigger>Can I collaborate with other users?</AccordionTrigger>
                    <AccordionContent>
                      While CodeVault doesn't have built-in collaboration tools, you can connect with other users through 
                      their profile links (GitHub, LinkedIn, personal websites) or by reaching out via the contact information 
                      they choose to share.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>Is CodeVault open source?</AccordionTrigger>
                    <AccordionContent>
                      Yes! CodeVault is built with transparency in mind. You can find our source code on GitHub and 
                      contribute to making the platform better for everyone. We welcome bug reports, feature suggestions, 
                      and code contributions from the community.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Still Have Questions */}
            <Card className="card-glass border-gradient backdrop-blur-sm mt-8">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our team is here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:patard50@gmail.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="https://github.com/DumAI-hub" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-border font-semibold rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
