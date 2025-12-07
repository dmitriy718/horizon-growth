import { Metadata } from "next";
import Link from "next/link";
import {
  XCircle,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Credit Myths Debunked | Facts vs Fiction",
  description:
    "Separate credit facts from fiction. We debunk common credit myths that could be hurting your score and costing you money.",
  keywords: [
    "credit myths",
    "credit score myths",
    "credit facts",
    "credit misconceptions",
    "credit repair myths",
    "credit truth",
  ],
};

const myths = [
  {
    myth: "Checking your own credit hurts your score",
    truth: "Checking your own credit is a soft inquiry and has zero impact on your score",
    explanation:
      "There are two types of credit inquiries: hard and soft. When you check your own credit it is always a soft inquiry. Soft inquiries are not visible to lenders and never affect your score. You can check your credit as often as you like without any negative impact.",
    tip: "Check your credit regularly to catch errors and monitor for fraud",
  },
  {
    myth: "You need to carry a balance to build credit",
    truth: "Paying your balance in full every month is better for your score and your wallet",
    explanation:
      "This is one of the most expensive myths out there. Your payment history and credit utilization are reported regardless of whether you carry a balance. Paying interest does nothing to help your score. What matters is that you use your credit and pay at least the minimum on time.",
    tip: "Pay your full balance by the due date to avoid interest while still building credit",
  },
  {
    myth: "Closing old credit cards improves your score",
    truth: "Closing old cards usually hurts your score by reducing credit history length and increasing utilization",
    explanation:
      "When you close a credit card two things happen: your overall credit limit decreases which raises your utilization ratio and your average account age may decrease. Both of these hurt your score. Keep old cards open even if you rarely use them.",
    tip: "Use old cards occasionally for small purchases to keep them active",
  },
  {
    myth: "You only have one credit score",
    truth: "You have dozens of different credit scores from different scoring models and bureaus",
    explanation:
      "FICO alone has multiple versions and each credit bureau calculates scores differently. There are also industry specific scores for auto loans and mortgages. The score you see from a free service may differ from what a lender sees.",
    tip: "Focus on the factors that affect all scores rather than obsessing over a specific number",
  },
  {
    myth: "Paying off a collection removes it from your report",
    truth: "Paid collections still remain on your report for 7 years from the original delinquency date",
    explanation:
      "While paying a collection is the right thing to do it does not automatically remove it from your credit report. The status will change to paid but the account remains. However newer FICO models like FICO 9 ignore paid collections entirely.",
    tip: "Negotiate for a pay-for-delete agreement before paying a collection",
  },
  {
    myth: "Income affects your credit score",
    truth: "Income is not a factor in credit score calculations",
    explanation:
      "Your credit score is based only on how you manage credit not how much money you make. High earners can have terrible credit and modest earners can have excellent credit. Lenders may consider income separately when making decisions but it is not in your score.",
    tip: "Focus on credit behavior not income when trying to improve your score",
  },
  {
    myth: "Married couples share credit scores",
    truth: "Each person has their own individual credit score even after marriage",
    explanation:
      "Marriage does not merge your credit reports or scores. Joint accounts will appear on both reports but each spouse maintains their own credit file. One spouse's bad credit does not automatically affect the other unless they have joint accounts.",
    tip: "Both spouses should monitor their individual credit reports",
  },
  {
    myth: "All debt is bad for your credit",
    truth: "Responsibly managed debt actually helps build your credit score",
    explanation:
      "Credit scores measure how well you manage credit. Having no credit history can actually hurt you. A mix of credit types like cards and installment loans shows lenders you can handle different types of debt responsibly.",
    tip: "Having some debt that you manage well is better than having no credit at all",
  },
  {
    myth: "Disputing items always works",
    truth: "Only inaccurate incomplete or unverifiable information can be removed through disputes",
    explanation:
      "You cannot dispute accurate negative information just because you do not like it. Credit bureaus must investigate disputes but if the information is verified it stays on your report. Focus disputes on items that are actually wrong.",
    tip: "Document evidence for your disputes and focus on legitimate errors",
  },
  {
    myth: "Credit repair companies can do things you cannot",
    truth: "Anything a credit repair company can do you can legally do yourself for free",
    explanation:
      "Under the FCRA you have the right to dispute errors on your credit report. Credit repair companies use the same laws and processes you can use yourself. What they offer is expertise convenience and time savings not special access.",
    tip: "Professional help can be valuable but know that no one has special powers",
  },
  {
    myth: "Employers check your credit score",
    truth: "Employers see a modified credit report not your actual credit score",
    explanation:
      "When an employer does a credit check with your permission they receive a modified report that does not include your credit score. They see payment history and public records but not the three digit number. This is different from what lenders see.",
    tip: "Employment credit checks are soft inquiries and do not affect your score",
  },
  {
    myth: "Bankruptcy means you can never get credit again",
    truth: "Many people rebuild excellent credit within 2-4 years after bankruptcy",
    explanation:
      "While bankruptcy is serious it is not a permanent sentence. You can start rebuilding immediately after discharge with secured cards and credit builder loans. Many people reach 700 plus scores within a few years through consistent positive behavior.",
    tip: "Start rebuilding with secured products immediately after discharge",
  },
];

export default function MythsPage() {
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
              Credit Myths Debunked
            </h1>
            <p className="text-lg text-white/80">
              Misinformation about credit is everywhere. These myths could be costing you money
              and hurting your credit score. Let us separate fact from fiction.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {myths.map((item, index) => (
              <div key={index} className="rounded-xl border bg-card overflow-hidden">
                <div className="bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-red-600">MYTH</p>
                      <p className="text-lg font-semibold text-red-900">{item.myth}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-green-600">TRUTH</p>
                      <p className="text-lg font-semibold text-green-900">{item.truth}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="mb-4 text-muted-foreground">{item.explanation}</p>
                  <div className="rounded-lg bg-blue-50 p-3">
                    <div className="flex gap-2">
                      <Info className="h-5 w-5 shrink-0 text-blue-500" />
                      <p className="text-sm text-blue-800">
                        <strong>Pro Tip:</strong> {item.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
              <div className="flex gap-4">
                <AlertTriangle className="h-8 w-8 shrink-0 text-yellow-600" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-yellow-800">
                    Be Wary of Credit Repair Scams
                  </h3>
                  <p className="text-yellow-800">
                    If anyone promises to remove accurate negative information guarantee specific
                    results or asks you to dispute accurate information they may be running a scam.
                    Legitimate credit repair focuses on correcting errors and building positive
                    credit history not magic tricks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Get the Facts About Your Credit
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our experts will give you honest advice based on facts not myths. Get a free
            analysis of your credit situation today.
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


