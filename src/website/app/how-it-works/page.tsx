import { Metadata } from "next";
import Link from "next/link";
import {
  FileSearch,
  Target,
  Send,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Users,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How Credit Repair Works | Our Proven Process",
  description:
    "Learn how Horizon Credit Repair helps you improve your credit score. Our proven 4-step process has helped over 50,000 Americans achieve their financial goals.",
  keywords: [
    "how credit repair works",
    "credit repair process",
    "dispute credit report",
    "fix credit score",
    "credit improvement steps",
  ],
};

const mainSteps = [
  {
    step: 1,
    title: "Analyze",
    subtitle: "We Review Everything",
    icon: FileSearch,
    color: "bg-blue-500",
    description:
      "We pull your credit reports from all three major bureaus—Experian, Equifax, and TransUnion—and conduct a comprehensive analysis.",
    details: [
      "Identify all negative items affecting your score",
      "Analyze account histories for inaccuracies",
      "Review inquiries and public records",
      "Calculate potential score improvement",
      "Create your personalized action plan",
    ],
    timeline: "Day 1-3",
  },
  {
    step: 2,
    title: "Identify",
    subtitle: "We Find the Problems",
    icon: Target,
    color: "bg-orange-500",
    description:
      "Our experts identify items that may be inaccurate, unverifiable, or unfair—all of which can legally be disputed under the Fair Credit Reporting Act.",
    details: [
      "Collections that may be past statute of limitations",
      "Late payments that were reported incorrectly",
      "Accounts that don't belong to you",
      "Duplicate entries inflating negative impact",
      "Outdated information that should be removed",
    ],
    timeline: "Day 3-7",
  },
  {
    step: 3,
    title: "Dispute",
    subtitle: "We Take Action",
    icon: Send,
    color: "bg-green-500",
    description:
      "We create customized dispute letters using proven strategies and send them to credit bureaus and creditors on your behalf.",
    details: [
      "Professionally written dispute letters",
      "Bureau-specific strategies for better results",
      "Creditor intervention when needed",
      "Documentation requests under FCRA",
      "Follow-up on every dispute sent",
    ],
    timeline: "Day 7-45",
  },
  {
    step: 4,
    title: "Track",
    subtitle: "We Monitor Progress",
    icon: TrendingUp,
    color: "bg-purple-500",
    description:
      "Monitor your progress in real-time through our dashboard. Watch as negative items are removed and your score improves.",
    details: [
      "Real-time score tracking dashboard",
      "Email alerts for changes and updates",
      "Monthly progress reports",
      "Strategy adjustments as needed",
      "Ongoing education and tips",
    ],
    timeline: "Ongoing",
  },
];

const faqs = [
  {
    q: "How long does credit repair take?",
    a: "Most clients see their first results within 30-45 days. The full process typically takes 3-6 months depending on the complexity of your credit situation. Under the FCRA, credit bureaus must respond to disputes within 30 days.",
  },
  {
    q: "Is credit repair legal?",
    a: "Absolutely. Credit repair is 100% legal and protected under federal law. The Fair Credit Reporting Act (FCRA) gives you the right to dispute any information on your credit report that is inaccurate, incomplete, or unverifiable.",
  },
  {
    q: "What items can be removed?",
    a: "Any item that is inaccurate, unverifiable, or reported unfairly can potentially be removed. This includes collections, late payments, charge-offs, bankruptcies, judgments, and inquiries. We cannot remove accurate information that is properly reported.",
  },
  {
    q: "Will my score definitely improve?",
    a: "While we cannot guarantee specific results (and you should be wary of anyone who does), we have a strong track record. 95% of our clients see improvement, with an average score increase of 40-100 points over 6 months.",
  },
  {
    q: "Can I do this myself?",
    a: "Yes, you have the right to dispute items yourself for free. However, our expertise, proven strategies, and time-saving service typically produce better and faster results. Most DIY attempts result in generic disputes that are easily dismissed.",
  },
];

const timeline = [
  { day: "Day 1", event: "Sign up and provide authorization" },
  { day: "Day 2-3", event: "We pull and analyze your credit reports" },
  { day: "Day 4-7", event: "Receive your personalized action plan" },
  { day: "Day 7-14", event: "First round of disputes sent" },
  { day: "Day 30-45", event: "Bureaus respond; first results arrive" },
  { day: "Day 45+", event: "Continue with additional rounds as needed" },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              How Credit Repair Works
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Our proven 4-step process has helped over 50,000 Americans improve their credit
              scores and achieve their financial goals. Here's exactly how we do it.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Start Your Free Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-16">
            {mainSteps.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="flex-1">
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} text-white`}
                    >
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Step {step.step}
                      </span>
                      <h2 className="font-serif text-3xl font-bold">{step.title}</h2>
                    </div>
                  </div>
                  <p className="mb-2 text-lg font-medium text-primary">{step.subtitle}</p>
                  <p className="mb-6 text-muted-foreground">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <div className="rounded-2xl border bg-slate-50 p-8 text-center">
                    <Clock className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="text-2xl font-bold">{step.timeline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Your Credit Repair Timeline
          </h2>
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 md:left-1/2" />
              {timeline.map((item, index) => (
                <div
                  key={item.day}
                  className={`relative mb-8 flex ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`ml-12 w-full rounded-xl border bg-card p-4 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <p className="font-semibold text-primary">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.event}</p>
                  </div>
                  <div className="absolute left-2 top-4 h-4 w-4 rounded-full border-4 border-primary bg-white md:left-1/2 md:-translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Foundation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              The Legal Foundation
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">Fair Credit Reporting Act (FCRA)</h3>
                <p className="text-sm text-muted-foreground">
                  Federal law that gives you the right to dispute any information on your credit
                  report that is inaccurate, incomplete, or unverifiable. Credit bureaus must
                  investigate disputes within 30 days and remove items they cannot verify.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">Fair Debt Collection Practices Act (FDCPA)</h3>
                <p className="text-sm text-muted-foreground">
                  Protects you from abusive debt collection practices and gives you the right to
                  request debt validation. Collectors must prove they have the right to collect
                  and that the debt is accurate.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">Credit Repair Organizations Act (CROA)</h3>
                <p className="text-sm text-muted-foreground">
                  Regulates credit repair companies and protects consumers. We comply fully with
                  CROA, including the 3-day cancellation right and prohibition on advance fees
                  before services are performed.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">Your Rights</h3>
                <p className="text-sm text-muted-foreground">
                  You have the right to accurate credit reporting, to dispute errors, to know
                  what's in your file, and to have outdated information removed. We help you
                  exercise these rights effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Common Questions
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Start Your Credit Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Get your free credit analysis and personalized action plan today. No obligation,
            no credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Get Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="tel:+18642375511">
                <Phone className="mr-2 h-5 w-5" />
                (864) 237-5511
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


