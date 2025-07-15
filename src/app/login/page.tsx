import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight gradient-text">Welcome Back</h1>
                <p className="text-muted-foreground">
                    Enter your credentials to access your account.
                </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <LoginForm />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Sign up
              </Link>
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
