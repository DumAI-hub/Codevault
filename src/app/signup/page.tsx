import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignupForm } from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="w-full max-w-sm space-y-8">
          <div className="card-glass border-gradient p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tight gradient-text">Create an Account</h1>
              <p className="text-muted-foreground">
                Join CodeVault to share your projects and get feedback.
              </p>
            </div>
            <SignupForm />
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
