import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-md px-4 py-8">
        <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-muted-foreground">
                Join the CodeVault community to share your projects.
            </p>
        </div>
        <SignupForm />
         <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
                Login
            </Link>
        </p>
      </main>
    </>
  );
}
