
import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto flex max-w-sm flex-col items-center justify-center py-16">
        <div className="w-full space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">
                Enter your credentials to access your account.
            </p>
        </div>
        <div className="w-full py-8">
            <LoginForm />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </main>
    </>
  );
}
