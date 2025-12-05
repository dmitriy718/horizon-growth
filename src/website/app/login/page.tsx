import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Horizon Credit Repair account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">
              Log in to your account to continue
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Get started for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

