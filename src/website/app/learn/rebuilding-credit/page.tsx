import { Metadata } from "next";
import Link from "next/link";
import {
  Hammer,
  TrendingUp,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Clock,
  Target,
  Shield,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Rebuilding Credit After Bankruptcy or Financial Hardship",
  description:
    "Step-by-step guide to rebuilding your credit after bankruptcy, foreclosure, or other financial hardship. Learn proven strategies to restore your creditworthiness.",
  keywords: [
    "rebuild credit",
    "credit after bankruptcy",
    "restore credit score",
    "credit recovery",
    "bad credit recovery",
    "improve credit from scratch",
  ],
};

const rebuildingTimeline = [
  {
    timeframe: "Months 1-3",
    title: "Foundation Phase",
    tasks: [
      "Get copies of all three credit reports",
      "Dispute any errors or inaccuracies",
      "Open a secured credit card",
      "Become an authorized user if possible",
      "Set up automatic payments on all accounts",
    ],
  },
  {
    timeframe: "Months 4-6",
    title: "Building Phase",
    tasks: [
      "Keep secured card utilization under 10%",
      "Apply for a credit-builder loan",
      "Add rent payments to credit report",
      "Continue making all payments on time",
      "Request credit limit increases",
    ],
  },
  {
    timeframe: "Months 7-12",
    title: "Growth Phase",
    tasks: [
      "Apply for an unsecured credit card",
      "Diversify credit types",
      "Keep utilization consistently low",
      "Review progress and adjust strategy",
      "Graduate from secured to unsecured cards",
    ],
  },
  {
    timeframe: "Year 2+",
    title: "Optimization Phase",
    tasks: [
      "Apply for better credit cards",
      "Negotiate with creditors for goodwill adjustments",
      "Consider auto loan or mortgage when ready",
      "Continue monitoring and maintaining",
      "Watch negative items age off your report",
    ],
  },
];

const securedCardTips = [
  {
    tip: "Choose Wisely",
    description: "Look for cards that report to all three bureaus and have a path to graduation",
  },
  {
    tip: "Start Small",
    description: "A $200-500 deposit is usually enough. You can increase later",
  },
  {
    tip: "Use Sparingly",
    description: "Keep utilization under 10%. Use it for small recurring charges",
  },
  {
    tip: "Pay in Full",
    description: "Pay the full balance before the due date every single month",
  },
  {
    tip: "Graduate ASAP",
    description: "Many cards will convert to unsecured after 6-12 months of good behavior",
  },
];

const creditBuilderLoans = [
  {
    name: "Self Credit Builder",
    description: "Popular online option with flexible amounts",
    minAmount: "$25/month",
  },
  {
    name: "Credit Union Builder Loans",
    description: "Often have the best rates. Check local credit unions",
    minAmount: "Varies",
  },
  {
    name: "Chime Credit Builder",
    description: "No interest or fees. Builds credit with regular use",
    minAmount: "No minimum",
  },
];

const afterBankruptcy = {
  chapter7: {
    title: "After Chapter 7 Bankruptcy",
    staysOnReport: "10 years",
    canRebuild: "Immediately after discharge",
    tips: [
      "You can start rebuilding immediately after discharge",
      "Many people reach 700+ scores within 2-3 years",
      "Secured cards are usually available right away",
      "FHA loans may be possible after 2 years",
      "Some auto lenders specialize in post-bankruptcy",
    ],
  },
  chapter13: {
    title: "After Chapter 13 Bankruptcy",
    staysOnReport: "7 years from filing",
    canRebuild: "After plan completion",
    tips: [
      "Your payment history during the plan helps rebuild",
      "You may need court approval for new credit during repayment",
      "After discharge completion you can rebuild faster",
      "FHA loans may be possible after 1 year from discharge",
      "Your trustee payments show you can manage payments",
    ],
  },
};

const alternativeCredit = [
  {
    method: "Rent Reporting",
    description: "Services like Experian Boost or Rental Kharma add rent payments to your credit report",
    impact: "Can add 10-30 points",
  },
  {
    method: "Utility Reporting",
    description: "Experian Boost can add phone internet and utility payments",
    impact: "Can add 10-20 points",
  },
  {
    method: "Authorized User",
    description: "Being added to a family members card with good history",
    impact: "Can add 30-50 points",
  },
  {
    method: "Passthrough Cards",
    description: "Cards like Chime report debit card usage as credit",
    impact: "Builds history without debt",
  },
];

export default function RebuildingCreditPage() {
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
              Rebuilding Your Credit
            </h1>
            <p className="text-lg text-white/80">
              Whether you are recovering from bankruptcy foreclosure or simply starting fresh
              this guide will show you exactly how to rebuild your credit step by step.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <p>
              Rebuilding credit after a financial setback is absolutely possible. Thousands of
              people rebuild their credit every year and many achieve excellent scores within
              2-4 years. The key is consistency patience and following proven strategies.
            </p>
            <p>
              Your past financial difficulties do not define your future. Every day that passes
              negative items have less impact on your score. With the right approach you can
              accelerate your credit recovery significantly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">
              Your Credit Rebuilding Timeline
            </h2>
            <div className="space-y-6">
              {rebuildingTimeline.map((phase) => (
                <div key={phase.timeframe} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{phase.timeframe}</p>
                      <h3 className="text-lg font-semibold">{phase.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {task}
                      </li>
                    ))}
                  </ul>
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
              Secured Credit Cards: Your First Step
            </h2>
            <p className="mb-8 text-muted-foreground">
              Secured credit cards are the most effective tool for rebuilding credit. You provide
              a security deposit which becomes your credit limit.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {securedCardTips.map((item) => (
                <div key={item.tip} className="rounded-xl border bg-card p-4">
                  <h4 className="mb-2 font-semibold">{item.tip}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
              Credit Builder Loans
            </h2>
            <p className="mb-8 text-muted-foreground">
              Credit builder loans are designed specifically for rebuilding credit. You make payments
              into a savings account and get the money at the end.
            </p>
            <div className="space-y-4">
              {creditBuilderLoans.map((loan) => (
                <div key={loan.name} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{loan.name}</h4>
                      <p className="text-sm text-muted-foreground">{loan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Starting at</p>
                      <p className="font-semibold text-primary">{loan.minAmount}</p>
                    </div>
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
              Rebuilding After Bankruptcy
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(afterBankruptcy).map((bk) => (
                <div key={bk.title} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 font-semibold">{bk.title}</h3>
                  <div className="mb-4 space-y-2 text-sm">
                    <p><strong>Stays on report:</strong> {bk.staysOnReport}</p>
                    <p><strong>Can start rebuilding:</strong> {bk.canRebuild}</p>
                  </div>
                  <ul className="space-y-2">
                    {bk.tips.map((tip) => (
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
              Alternative Credit Building Methods
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {alternativeCredit.map((method) => (
                <div key={method.method} className="rounded-xl border bg-card p-4">
                  <h4 className="mb-2 font-semibold">{method.method}</h4>
                  <p className="mb-2 text-sm text-muted-foreground">{method.description}</p>
                  <p className="text-sm font-medium text-green-600">{method.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Rebuild Your Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our experts specialize in helping people rebuild after financial setbacks. Let us
            create a personalized rebuilding plan for you.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Rebuilding Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


