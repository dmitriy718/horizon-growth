import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Welcome to Horizon!",
  description: "Your account has been created successfully.",
};

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background dark:from-green-950/20">
      <div className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="mt-8 font-serif text-3xl font-bold md:text-4xl">
            Welcome to <span className="text-primary">Horizon!</span>
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Your account has been created successfully. Here's what happens next:
          </p>

          {/* Next Steps */}
          <div className="mt-12 space-y-6 text-left">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Check Your Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We've sent a welcome email to your inbox with login
                    instructions and important information about your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Complete Your Profile</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Log in to your dashboard and complete your profile. We'll
                    need some additional information to pull your credit reports.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Credit Analysis Begins</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Once we have your information, our AI will analyze your
                    credit reports and identify items to dispute. This typically
                    takes 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Track Your Progress</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Download our mobile app to track your credit repair progress
                    in real-time and chat with our AI assistant anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/login">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/app-download">
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-12 rounded-xl bg-muted/50 p-6">
            <h3 className="font-semibold">Need Help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our support team is here to help you get started.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:support@horizoncredit.net"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                support@horizoncredit.net
              </a>
              <a
                href="tel:+18642375511"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                (864) 237-5511
              </a>
            </div>
          </div>

          {/* Trial Reminder */}
          <p className="mt-8 text-sm text-muted-foreground">
            Remember: Your 7-day free trial starts today. You won't be charged
            until the trial period ends.
          </p>
        </div>
      </div>
    </div>
  );
}

