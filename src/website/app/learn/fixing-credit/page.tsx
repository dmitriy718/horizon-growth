import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  Scale,
  Clock,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Fix Your Credit | Complete Guide",
  description:
    "Learn how to fix your credit step by step. Comprehensive guide covering credit report errors, disputes, and proven strategies to improve your credit score.",
  keywords: [
    "fix credit",
    "credit repair guide",
    "improve credit score",
    "dispute credit report",
    "remove negative items",
    "credit repair steps",
  ],
};

const commonErrors = [
  {
    title: "Identity Errors",
    items: [
      "Wrong name, address, or Social Security number",
      "Accounts belonging to someone else with a similar name",
      "Accounts from identity theft",
      "Mixed files (your info merged with another person)",
    ],
  },
  {
    title: "Account Status Errors",
    items: [
      "Closed accounts reported as open",
      "Accounts incorrectly reported as late or delinquent",
      "Wrong date of last payment or first delinquency",
      "Same debt listed multiple times",
    ],
  },
  {
    title: "Balance Errors",
    items: [
      "Incorrect current balance",
      "Wrong credit limit",
      "Incorrect high balance",
      "Payments not reflected",
    ],
  },
  {
    title: "Data Management Errors",
    items: [
      "Outdated negative information (older than 7 years)",
      "Bankruptcies older than 10 years still showing",
      "Paid collections still showing as unpaid",
      "Accounts included in bankruptcy still showing active",
    ],
  },
];

const disputeSteps = [
  {
    step: 1,
    title: "Get Your Credit Reports",
    description:
      "Obtain free copies of your credit reports from all three bureaus at AnnualCreditReport.com. You're entitled to one free report from each bureau every 12 months.",
    tips: [
      "Request reports from Experian, Equifax, and TransUnion",
      "Consider staggering requests throughout the year",
      "During certain periods, weekly free reports may be available",
    ],
  },
  {
    step: 2,
    title: "Review Every Detail",
    description:
      "Go through each report line by line. Compare information across all three bureaus. Look for discrepancies, errors, and items that don't belong to you.",
    tips: [
      "Check personal information for accuracy",
      "Verify all account information",
      "Note any unfamiliar accounts or inquiries",
      "Cross-reference with your own records",
    ],
  },
  {
    step: 3,
    title: "Document Everything",
    description:
      "Gather supporting documentation for each item you plan to dispute. The more evidence you have, the stronger your case.",
    tips: [
      "Keep copies of payment records",
      "Save correspondence with creditors",
      "Document dates and communications",
      "Create a dispute tracking spreadsheet",
    ],
  },
  {
    step: 4,
    title: "File Your Disputes",
    description:
      "Submit disputes to the credit bureaus. You can dispute online, by mail, or by phone. Written disputes (mail) create the best paper trail.",
    tips: [
      "Be specific about what's wrong",
      "Include supporting documentation",
      "Send disputes via certified mail",
      "Keep copies of everything you send",
    ],
  },
  {
    step: 5,
    title: "Follow Up",
    description:
      "Credit bureaus must investigate within 30 days. They'll contact the creditor and send you results. If not resolved, you can escalate.",
    tips: [
      "Track the 30-day deadline",
      "Request investigation results in writing",
      "File with the CFPB if needed",
      "Consider disputing directly with creditors",
    ],
  },
];

const legalRights = [
  {
    law: "Fair Credit Reporting Act (FCRA)",
    rights: [
      "Right to one free credit report per year from each bureau",
      "Right to dispute inaccurate or incomplete information",
      "Right to have disputed items investigated within 30 days",
      "Right to have unverified items removed",
      "Right to know when negative information is being reported",
      "Right to have outdated information removed (7 years for most items)",
    ],
  },
  {
    law: "Fair Debt Collection Practices Act (FDCPA)",
    rights: [
      "Right to request debt validation",
      "Right to stop collector contact (in writing)",
      "Protection from harassment and abuse",
      "Protection from false or misleading representations",
      "Right to sue collectors who violate the law",
    ],
  },
];

const dosDonts = {
  dos: [
    "Check your credit reports regularly",
    "Pay all bills on time going forward",
    "Keep credit card balances low (under 30%)",
    "Keep old accounts open for credit history",
    "Dispute errors with documentation",
    "Be patient - credit repair takes time",
  ],
  donts: [
    "Don't pay for information you can get free",
    "Don't fall for 'new credit identity' scams",
    "Don't dispute accurate information",
    "Don't close old credit cards",
    "Don't apply for lots of new credit at once",
    "Don't ignore collection accounts",
  ],
};

export default function FixingCreditPage() {
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
              How to Fix Your Credit
            </h1>
            <p className="text-lg text-white/80">
              A comprehensive guide to identifying errors, disputing inaccuracies, and
              improving your credit score through proven strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 font-semibold">In This Guide:</h2>
            <div className="flex flex-wrap gap-4">
              <a href="#errors" className="text-sm text-primary hover:underline">Common Errors</a>
              <a href="#dispute-process" className="text-sm text-primary hover:underline">Dispute Process</a>
              <a href="#legal-rights" className="text-sm text-primary hover:underline">Your Legal Rights</a>
              <a href="#dos-donts" className="text-sm text-primary hover:underline">Do's & Don'ts</a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <p>
              According to the Federal Trade Commission (FTC), one in five Americans has an error
              on at least one of their credit reports. These errors can cost you thousands of dollars
              in higher interest rates, security deposits, and even job opportunities.
            </p>
            <p>
              The good news? You have the legal right to dispute any information on your credit
              report that is inaccurate, incomplete, or unverifiable. This guide will walk you
              through exactly how to identify and fix credit report errors.
            </p>
          </div>
        </div>
      </section>

      {/* Common Errors */}
      <section id="errors" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Common Credit Report Errors</h2>
            <p className="mb-8 text-muted-foreground">
              Credit report errors can occur for many reasons: data entry mistakes, mixed files,
              outdated information, or even identity theft. Here are the most common types of errors
              to look for:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {commonErrors.map((category) => (
                <div key={category.title} className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 font-semibold">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Process */}
      <section id="dispute-process" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">The Dispute Process</h2>
            <p className="mb-8 text-muted-foreground">
              Follow these steps to effectively dispute errors on your credit report:
            </p>
            <div className="space-y-8">
              {disputeSteps.map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                    <p className="mb-4 text-muted-foreground">{item.description}</p>
                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="mb-2 text-sm font-medium">Pro Tips:</p>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Rights */}
      <section id="legal-rights" className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Your Legal Rights</h2>
            <p className="mb-8 text-muted-foreground">
              Federal law protects your right to accurate credit reporting. Here are the key laws
              and your rights under each:
            </p>
            <div className="space-y-6">
              {legalRights.map((law) => (
                <div key={law.law} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{law.law}</h3>
                  </div>
                  <ul className="space-y-2">
                    {law.rights.map((right) => (
                      <li key={right} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {right}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section id="dos-donts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Do's and Don'ts of Credit Repair</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Do
                </h3>
                <ul className="space-y-2">
                  {dosDonts.dos.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-green-800">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-red-800">
                  <XCircle className="h-5 w-5" />
                  Don't
                </h3>
                <ul className="space-y-2">
                  {dosDonts.donts.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-red-800">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Need Help Fixing Your Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            While you can dispute errors yourself, our experts can handle the process more
            efficiently with proven strategies that get results.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Professional Help
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

