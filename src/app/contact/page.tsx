import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Github, Linkedin, MessageCircle, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you!
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="card-glass border-gradient backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="gradient-text">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input placeholder="Your name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input type="email" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input placeholder="What's this about?" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea 
                        placeholder="Tell us what's on your mind..." 
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button className="w-full button-gradient">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="card-hover transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">Drop us a line anytime</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:patard50@gmail.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      patard50@gmail.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="card-hover transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Github className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">GitHub</h3>
                        <p className="text-muted-foreground">Check out our code</p>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/DumAI-hub" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      github.com/DumAI-hub
                    </a>
                  </CardContent>
                </Card>

                <Card className="card-hover transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">LinkedIn</h3>
                        <p className="text-muted-foreground">Connect professionally</p>
                      </div>
                    </div>
                    <a 
                      href="https://linkedin.com/in/dibakarpatar" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      linkedin.com/in/dibakarpatar
                    </a>
                  </CardContent>
                </Card>

                {/* Quick Contact Info */}
                <Card className="card-glass border-gradient backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 gradient-text">Quick Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        <span>Usually responds within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Based in India, serving globally</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Open to collaboration and feedback</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Want to Contribute?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              CodeVault is open source and community-driven. Help us make it better for everyone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="button-gradient">
                <a href="https://github.com/DumAI-hub" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Suggest Features
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
