import { Metadata } from "next";
import { Suspense } from "react";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Start your credit repair journey with Horizon. Free credit analysis, no obligation.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              Start Your Journey to{" "}
              <span className="text-primary">Better Credit</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Create your account and get your free credit analysis. No credit
              card required to start.
            </p>
          </div>

          <Suspense fallback={<SignupFormSkeleton />}>
            <SignupForm />
          </Suspense>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By signing up, you agree to our{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
            <p className="mt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupFormSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-8 shadow-lg">
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
        <div className="h-12 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}

