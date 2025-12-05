import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  Scale,
  MessageSquare,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Credit Repair Services",
  description:
    "Professional credit repair services powered by AI. We dispute inaccurate items on your credit reports and help improve your credit score.",
};

const services = [
  {
    icon: FileText,
    title: "Credit Report Analysis",
    description:
      "Our AI analyzes your credit reports from all three bureaus to identify inaccurate, unverifiable, or unfair negative items.",
  },
  {
    icon: MessageSquare,
    title: "Custom Dispute Letters",
    description:
      "We create personalized dispute letters tailored to each item on your report, using proven language that gets results.",
  },
  {
    icon: Scale,
    title: "Creditor Interventions",
    description:
      "We communicate directly with creditors on your behalf to resolve inaccuracies and negotiate removals.",
  },
  {
    icon: TrendingUp,
    title: "Credit Monitoring",
    description:
      "Real-time monitoring alerts you to changes in your credit report so you can track your progress.",
  },
  {
    icon: Shield,
    title: "Identity Protection",
    description:
      "Our Premier Plus plan includes identity theft monitoring and protection to keep your credit safe.",
  },
  {
    icon: Clock,
    title: "Ongoing Support",
    description:
      "Our credit specialists are available to answer your questions and guide you through the process.",
  },
];

const process = [
  {
    step: "01",
    title: "Free Consultation",
    description:
      "We start with a free analysis of your credit situation to understand your goals and challenges.",
  },
  {
    step: "02",
    title: "Credit Report Review",
    description:
      "We pull your credit reports from Experian, Equifax, and TransUnion and our AI identifies potential issues.",
  },
  {
    step: "03",
    title: "Dispute Strategy",
    description:
      "We create a customized dispute strategy targeting the items most impacting your score.",
  },
  {
    step: "04",
    title: "Send Disputes",
    description:
      "We send dispute letters to credit bureaus and creditors challenging inaccurate information.",
  },
  {
    step: "05",
    title: "Track & Follow Up",
    description:
      "We track responses and follow up on unresolved items. Most disputes are resolved within 30-45 days.",
  },
  {
    step: "06",
    title: "Monitor Progress",
    description:
      "Watch your score improve as items are removed. We continue working until you reach your goals.",
  },
];

const stats = [
  { value: "50,000+", label: "Clients Helped" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "120+", label: "Avg. Score Increase" },
  { value: "30-45", label: "Days to First Results" },
];

export default function CreditRepairServicePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Award className="mr-2 h-4 w-4" />
              Rated #1 Credit Repair Service
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Professional <span className="text-primary">Credit Repair</span>{" "}
              Services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Our team of experts uses AI-powered analysis and proven dispute
              strategies to challenge inaccurate items on your credit report and
              help improve your score.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Free Credit Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              What We Do
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our comprehensive credit repair service addresses every aspect of
              your credit health.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Our Proven Process
            </h2>
            <p className="mt-4 text-muted-foreground">
              We follow a systematic approach to credit repair that has helped
              thousands of clients improve their scores.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item) => (
              <div key={item.step} className="relative rounded-xl bg-card p-6">
                <div className="absolute -top-3 left-6 rounded bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  Step {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Dispute Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                What Can Be Disputed?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Under the Fair Credit Reporting Act (FCRA), you have the right
                to dispute any information on your credit report that is
                inaccurate, unverifiable, or unfair. We help dispute:
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Late payments that were reported incorrectly",
                  "Collections that don't belong to you",
                  "Charge-offs with incorrect balances",
                  "Accounts opened without your authorization",
                  "Incorrect personal information",
                  "Duplicate accounts",
                  "Accounts included in bankruptcy incorrectly",
                  "Outdated negative items (7+ years)",
                  "Hard inquiries you didn't authorize",
                  "Identity theft related items",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-primary/5 p-8">
              <h3 className="text-xl font-semibold">
                Important: We Follow the Law
              </h3>
              <p className="mt-4 text-muted-foreground">
                Horizon Credit Repair operates in full compliance with the
                Credit Repair Organizations Act (CROA). We never:
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>
                    Make false claims about removing accurate negative items
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Advise you to dispute accurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>
                    Charge upfront fees before performing services
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  <span>Guarantee specific score increases</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                We focus on disputing legitimately inaccurate, unverifiable, or
                unfair items—which, according to industry studies, appear on
                approximately 80% of credit reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to Improve Your Credit?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Get your free credit analysis today. No credit card required, no
              obligation.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">
                  Start Free Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="tel:+18642375511">Call (864) 237-5511</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

