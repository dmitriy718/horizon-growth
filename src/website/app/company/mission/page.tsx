import { Metadata } from "next";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Lightbulb,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Mission | Why We Do What We Do",
  description:
    "Learn about Horizon Credit Repair mission to empower individuals to take control of their financial futures through expert credit repair and education.",
  keywords: [
    "Horizon Credit mission",
    "credit repair mission",
    "company values",
    "financial empowerment",
    "credit repair values",
  ],
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We are honest and transparent in everything we do. No false promises no hidden fees no shortcuts.",
  },
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We understand that credit problems often come from difficult life circumstances. We treat every client with empathy and respect.",
  },
  {
    icon: Lightbulb,
    title: "Education",
    description:
      "We believe knowledge is power. We do not just fix credit we teach you how to maintain it for life.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description:
      "Everyone deserves access to credit repair services regardless of their current financial situation.",
  },
];

const commitments = [
  "We will never promise results we cannot deliver",
  "We will always be transparent about our fees and processes",
  "We will treat every client with dignity and respect",
  "We will continuously improve our services and technology",
  "We will give back to our community through education and outreach",
  "We will advocate for fair credit reporting practices",
];

export default function MissionPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Target className="h-4 w-4" />
              Our Mission
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Why We Do What We Do
            </h1>
            <p className="text-lg text-white/80">
              At Horizon Credit Repair we are driven by a simple belief: everyone deserves
              a fair chance at financial success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower individuals and families to take control of their financial
                  futures by providing expert credit repair services accessible education
                  and unwavering support throughout their credit journey.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 font-serif text-2xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground">
                  A world where credit report errors do not hold people back and where
                  financial literacy is accessible to all. We envision communities where
                  everyone has the knowledge and resources to build strong credit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Our Commitments</h2>
            <div className="rounded-xl border bg-card p-8">
              <ul className="space-y-4">
                {commitments.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <h2>The Problem We Solve</h2>
            <p>
              According to the Federal Trade Commission one in five Americans has an error
              on at least one of their credit reports. These errors can cost thousands of
              dollars in higher interest rates security deposits and missed opportunities.
            </p>
            <p>
              Beyond errors many people struggle with legitimate negative items that linger
              on their reports years after they have changed their financial behavior. The
              credit system was not designed to give people second chances and that is where
              we come in.
            </p>
            <p>
              We believe in second chances. We believe that a financial mistake from years
              ago should not define your future. We believe that everyone deserves accurate
              credit reporting and fair treatment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Let us help you take control of your financial future. Get started with a
            free credit analysis today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


