import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-muted-foreground">
                    Enter your credentials to access your account.
                </p>
            </div>
            <LoginForm />
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
        </div>
      </main>
    </div>
  );
}
