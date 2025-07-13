import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-md px-4 py-8">
        <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Login to CodeVault</h1>
            <p className="text-muted-foreground">
                Enter your credentials to access your account.
            </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
            </Link>
        </p>
      </main>
    </>
  );
}
