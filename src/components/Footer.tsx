"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Heart, Code, Users } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* CTA Section */}
        <section className="py-16 md:py-20 text-center text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Showcase Your Work?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Join hundreds of students who have shared their innovative projects with CodeVault's community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-200"
                >
                  Submit Your Project
                </Link>
                <div className="flex items-center gap-6 text-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Free forever</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">No approval needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Start immediately</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <section className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center gap-2 text-white mb-4">
                  <Code className="h-8 w-8" />
                  <span className="text-xl font-bold">CodeVault</span>
                </Link>
                <p className="text-blue-100 text-sm mb-4">
                  A digital archive showcasing innovative student projects from colleges worldwide.
                </p>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/DumAI-hub" 
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 text-white" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/dibakarpatar" 
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                  <a 
                    href="mailto:patard50@gmail.com" 
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Platform</h3>
                <div className="space-y-2">
                  <Link href="/" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Browse Projects
                  </Link>
                  <Link href="/submit" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Submit Project
                  </Link>
                  <Link href="/profile" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    My Profile
                  </Link>
                  <Link href="/signup" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Join Community
                  </Link>
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <div className="space-y-2">
                  <Link href="/docs" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Documentation
                  </Link>
                  <Link href="/guidelines" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Submission Guidelines
                  </Link>
                  <Link href="/faq" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    FAQ
                  </Link>
                  <Link href="/support" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Support
                  </Link>
                </div>
              </div>

              {/* Community */}
              <div>
                <h3 className="text-white font-semibold mb-4">Community</h3>
                <div className="space-y-2">
                  <Link href="/about" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    About Us
                  </Link>
                  <Link href="/contact" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                  <Link href="/privacy" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block text-blue-100 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="py-6 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-blue-100 text-sm">
                <span>© {currentYear} CodeVault. Made with</span>
                <Heart className="h-4 w-4 text-red-400 fill-current" />
                <span>by Dibakar Patar</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 text-sm">
                <Users className="h-4 w-4" />
                <span>Join our growing community of innovators</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
