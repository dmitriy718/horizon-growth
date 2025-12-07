import { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  PieChart,
  FileText,
  Building2,
  ArrowRight,
  Info,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Understanding Credit Scores | Complete Guide",
  description:
    "Learn how credit scores work, what factors affect your score, and how to interpret your credit reports. Complete guide to understanding credit.",
  keywords: [
    "understanding credit",
    "credit score explained",
    "how credit works",
    "FICO score",
    "credit report guide",
    "credit score factors",
  ],
};

const scoreRanges = [
  { range: "800-850", label: "Exceptional", color: "bg-green-500", description: "Well above average. Lenders view you as an ideal borrower." },
  { range: "740-799", label: "Very Good", color: "bg-lime-500", description: "Above average. You qualify for better-than-average rates." },
  { range: "670-739", label: "Good", color: "bg-yellow-500", description: "Near or slightly above average. Most lenders consider this acceptable." },
  { range: "580-669", label: "Fair", color: "bg-orange-500", description: "Below average. You may have difficulty getting credit." },
  { range: "300-579", label: "Poor", color: "bg-red-500", description: "Well below average. You may be denied credit or pay high rates." },
];

const scoreFactors = [
  {
    factor: "Payment History",
    weight: 35,
    description: "Your track record of paying bills on time. This is the single most important factor.",
    tips: [
      "Always pay at least the minimum by the due date",
      "Set up automatic payments to avoid missing due dates",
      "Even one 30-day late payment can hurt significantly",
      "Late payments impact your score for up to 7 years",
    ],
  },
  {
    factor: "Credit Utilization",
    weight: 30,
    description: "The percentage of your available credit that you're using. Lower is better.",
    tips: [
      "Keep utilization below 30% for best results",
      "Under 10% is ideal for maximum score impact",
      "Utilization is calculated for each card and overall",
      "Pay down balances before statement closing dates",
    ],
  },
  {
    factor: "Length of Credit History",
    weight: 15,
    description: "How long you've had credit accounts. Longer history is better.",
    tips: [
      "Keep old accounts open, even if unused",
      "Avoid closing your oldest credit card",
      "Average age of accounts matters",
      "New accounts lower your average age",
    ],
  },
  {
    factor: "Credit Mix",
    weight: 10,
    description: "The variety of credit types you have (cards, loans, mortgage, etc.).",
    tips: [
      "Having diverse account types can help",
      "Don't open accounts just for mix",
      "Installment loans + revolving credit is ideal",
      "Not having any credit cards can hurt",
    ],
  },
  {
    factor: "New Credit",
    weight: 10,
    description: "Recent credit applications and new accounts opened.",
    tips: [
      "Each hard inquiry can lower score 5-10 points",
      "Multiple inquiries for same loan type count as one",
      "Inquiries affect score for 12 months",
      "Space out credit applications",
    ],
  },
];

const bureaus = [
  {
    name: "Experian",
    description: "The largest credit bureau, tracking over 220 million consumers. Uses FICO and its own proprietary scoring models.",
    website: "experian.com",
  },
  {
    name: "Equifax",
    description: "One of the oldest bureaus, founded in 1899. Tracks over 200 million consumers and 88 million businesses.",
    website: "equifax.com",
  },
  {
    name: "TransUnion",
    description: "Tracks over 200 million consumers. Known for offering credit monitoring and identity protection services.",
    website: "transunion.com",
  },
];

const scoringModels = [
  {
    name: "FICO Score",
    description: "The most widely used scoring model, created by Fair Isaac Corporation. Used by 90% of top lenders. Scores range from 300-850.",
    versions: ["FICO 8 (most common)", "FICO 9 (newer)", "FICO Auto Score", "FICO Bankcard Score"],
  },
  {
    name: "VantageScore",
    description: "Created jointly by the three major bureaus. Growing in popularity. Also ranges from 300-850.",
    versions: ["VantageScore 3.0", "VantageScore 4.0"],
  },
];

export default function UnderstandingCreditPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
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
              Understanding Credit Scores
            </h1>
            <p className="text-lg text-white/80">
              A comprehensive guide to how credit scores work, what factors affect them, and how
              to interpret your credit reports.
            </p>
          </div>
        </div>
      </section>

      {/* What is a Credit Score */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-serif text-3xl font-bold">What is a Credit Score?</h2>
            <div className="prose prose-lg">
              <p>
                A credit score is a three-digit number that represents your creditworthiness—how
                likely you are to repay borrowed money. Lenders, landlords, insurers, and even
                employers use this number to make decisions about you.
              </p>
              <p>
                Your credit score is calculated based on information in your credit reports,
                which are maintained by three major credit bureaus: Experian, Equifax, and
                TransUnion. Since each bureau may have slightly different information, your
                score can vary between bureaus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Score Ranges */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Credit Score Ranges</h2>
            <div className="space-y-4">
              {scoreRanges.map((range) => (
                <div key={range.range} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                  <div className={`h-4 w-4 shrink-0 rounded-full ${range.color}`} />
                  <div className="w-24 shrink-0 font-mono font-bold">{range.range}</div>
                  <div className="w-28 shrink-0 font-semibold">{range.label}</div>
                  <div className="text-sm text-muted-foreground">{range.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">The 5 Factors That Determine Your Score</h2>
            <p className="mb-8 text-muted-foreground">
              Understanding what affects your score is the first step to improving it. Here's how
              FICO calculates your credit score:
            </p>
            <div className="space-y-8">
              {scoreFactors.map((item) => (
                <div key={item.factor} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{item.factor}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {item.weight}%
                    </span>
                  </div>
                  <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                  <p className="mb-4 text-muted-foreground">{item.description}</p>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="mb-2 text-sm font-medium">Key Points:</p>
                    <ul className="space-y-1">
                      {item.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credit Bureaus */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">The Three Credit Bureaus</h2>
            <p className="mb-8 text-muted-foreground">
              Credit bureaus (also called credit reporting agencies) collect and maintain your
              credit information. There are three major bureaus in the United States:
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {bureaus.map((bureau) => (
                <div key={bureau.name} className="rounded-xl border bg-card p-6">
                  <Building2 className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{bureau.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{bureau.description}</p>
                  <p className="text-xs text-muted-foreground">{bureau.website}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 shrink-0 text-blue-500" />
                <p className="text-sm text-blue-800">
                  You're entitled to one free credit report from each bureau every 12 months at
                  AnnualCreditReport.com—the only official source for free reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Models */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Credit Scoring Models</h2>
            <p className="mb-8 text-muted-foreground">
              There are actually many different credit scoring models. Here are the two main ones:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {scoringModels.map((model) => (
                <div key={model.name} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-2 text-lg font-semibold">{model.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{model.description}</p>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-medium">Common Versions:</p>
                    <ul className="space-y-1">
                      {model.versions.map((version) => (
                        <li key={version} className="text-xs text-muted-foreground">• {version}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Scores Differ */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-serif text-3xl font-bold">Why Your Scores May Differ</h2>
            <div className="prose prose-lg">
              <p>
                It's common to have different credit scores, even on the same day. Here's why:
              </p>
              <ul>
                <li>
                  <strong>Different bureaus, different data:</strong> Not all creditors report to
                  all three bureaus. Your Experian report may have accounts your Equifax report
                  doesn't.
                </li>
                <li>
                  <strong>Different scoring models:</strong> FICO 8, FICO 9, and VantageScore all
                  calculate scores differently. The same report can produce different scores.
                </li>
                <li>
                  <strong>Different timing:</strong> Creditors report at different times. A payment
                  you made last week might be on one report but not another.
                </li>
                <li>
                  <strong>Industry-specific scores:</strong> Auto lenders and credit card issuers
                  often use specialized scoring models tailored to their industry.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Improve Your Credit Score?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Now that you understand how credit scores work, let us help you improve yours.
            Get a free analysis of your credit report today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


