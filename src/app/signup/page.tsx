import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex max-w-sm flex-col items-center justify-center py-16">
        <div className="w-full space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
            <p className="text-muted-foreground">
                Join CodeVault to share your projects and get feedback.
            </p>
        </div>
        <div className="w-full py-8">
            <SignupForm />
        </div>
         <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </main>
    </>
  );
}
