import { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Calendar,
  PiggyBank,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Managing Your Credit | Best Practices Guide",
  description:
    "Learn how to effectively manage your credit for a healthy financial future. Tips on credit utilization, payment strategies, and maintaining good credit habits.",
  keywords: [
    "credit management",
    "manage credit cards",
    "credit utilization tips",
    "good credit habits",
    "maintain credit score",
    "credit best practices",
  ],
};

const managementPillars = [
  {
    icon: Calendar,
    title: "Payment Management",
    description: "Strategies for never missing a payment",
    tips: [
      "Set up automatic payments for at least the minimum due",
      "Create calendar reminders 5 days before due dates",
      "Align due dates with your pay schedule if possible",
      "Pay more than minimum when you can afford it",
    ],
  },
  {
    icon: CreditCard,
    title: "Utilization Control",
    description: "Keep your credit usage in the optimal range",
    tips: [
      "Keep overall utilization below 30%",
      "Aim for under 10% for maximum score impact",
      "Pay down balances before statement closing dates",
      "Request credit limit increases when possible",
    ],
  },
  {
    icon: Shield,
    title: "Account Protection",
    description: "Safeguard your credit accounts",
    tips: [
      "Enable fraud alerts on all accounts",
      "Review statements monthly for unauthorized charges",
      "Use strong unique passwords for financial accounts",
      "Enable two-factor authentication where available",
    ],
  },
  {
    icon: Target,
    title: "Strategic Growth",
    description: "Build credit strength over time",
    tips: [
      "Keep oldest accounts open to maintain credit age",
      "Add new accounts strategically not impulsively",
      "Diversify credit types (revolving and installment)",
      "Consider a credit-builder loan if needed",
    ],
  },
];

const utilizationStrategies = [
  {
    strategy: "The 30/10 Rule",
    description: "Never exceed 30% utilization aim for 10%",
    example: "If your credit limit is $10000 keep balances below $3000 ideally below $1000",
  },
  {
    strategy: "Statement Balance Timing",
    description: "Pay down before statement closes",
    example: "Pay on the 20th if your statement closes on the 25th to report lower utilization",
  },
  {
    strategy: "Multiple Payment Strategy",
    description: "Make several payments per month",
    example: "Pay $200 every Friday instead of $800 once a month to keep balances consistently low",
  },
];

export default function ManagingCreditPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/learn"
              className="mb-4 inline-flex items-center text-sm text-white/70 hover:text-white"
            >
              ← Back to Credit Education
            </Link>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Managing Your Credit
            </h1>
            <p className="text-lg text-white/80">
              Effective credit management is the key to maintaining and improving your credit
              score over time. Learn the habits and strategies that lead to credit success.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              The Four Pillars of Credit Management
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {managementPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <pillar.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{pillar.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">
              Credit Utilization Strategies
            </h2>
            <div className="space-y-4">
              {utilizationStrategies.map((item) => (
                <div key={item.strategy} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-2 font-semibold">{item.strategy}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{item.description}</p>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-sm text-green-800">
                      <strong>Example:</strong> {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">
              Key Metrics to Track
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border bg-card p-6 text-center">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="font-semibold">Credit Score</p>
                <p className="text-sm text-muted-foreground">Check monthly</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <CreditCard className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="font-semibold">Utilization</p>
                <p className="text-sm text-muted-foreground">Keep under 30%</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="font-semibold">Payment Dates</p>
                <p className="text-sm text-muted-foreground">Never miss one</p>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <PiggyBank className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="font-semibold">Total Debt</p>
                <p className="text-sm text-muted-foreground">Track monthly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Need Help Managing Your Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our experts can help you create a personalized credit management plan and fix any
            issues holding your score back.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Expert Help
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


