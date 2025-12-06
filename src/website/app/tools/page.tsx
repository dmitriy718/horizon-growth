import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  PieChart,
  Calendar,
  CreditCard,
  Target,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free Credit Tools & Calculators",
  description:
    "Free credit tools to help you understand and improve your credit. Use our credit score simulator, debt payoff calculator, and more.",
  keywords: [
    "credit score calculator",
    "debt payoff calculator",
    "credit utilization calculator",
    "credit score simulator",
    "free credit tools",
  ],
};

const tools = [
  {
    icon: TrendingUp,
    title: "Credit Score Simulator",
    description:
      "See how different actions like paying down debt or removing negative items could affect your credit score.",
    status: "available",
    href: "#simulator",
  },
  {
    icon: Calculator,
    title: "Debt Payoff Calculator",
    description:
      "Calculate how long it will take to pay off your debt and how much interest you'll save with extra payments.",
    status: "available",
    href: "#debt-calculator",
  },
  {
    icon: PieChart,
    title: "Credit Utilization Calculator",
    description:
      "Calculate your credit utilization ratio and learn how it impacts your score.",
    status: "available",
    href: "#utilization",
  },
  {
    icon: Calendar,
    title: "Credit Age Calculator",
    description:
      "Calculate the average age of your credit accounts and understand its impact on your score.",
    status: "coming",
    href: "#",
  },
  {
    icon: CreditCard,
    title: "Credit Card Comparison",
    description:
      "Compare credit cards based on your credit profile to find the best options for building credit.",
    status: "coming",
    href: "#",
  },
  {
    icon: Target,
    title: "Score Goal Planner",
    description:
      "Set a target credit score and get a personalized action plan to reach your goal.",
    status: "coming",
    href: "#",
  },
];

const scoreFactors = [
  { factor: "Payment History", weight: 35, description: "On-time payments on all accounts" },
  { factor: "Credit Utilization", weight: 30, description: "Amount of credit used vs. available" },
  { factor: "Credit History Length", weight: 15, description: "Average age of your accounts" },
  { factor: "Credit Mix", weight: 10, description: "Variety of credit types" },
  { factor: "New Credit", weight: 10, description: "Recent applications and inquiries" },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Free Credit Tools & Calculators
            </h1>
            <p className="mb-8 text-lg text-white/80">
              Use our free tools to understand your credit better and plan your path to a
              higher score. No signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className={`rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg ${
                  tool.status === "coming" ? "opacity-60" : ""
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{tool.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>
                {tool.status === "available" ? (
                  <a
                    href={tool.href}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Use Tool <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Score Simulator */}
      <section id="simulator" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Credit Score Simulator
            </h2>
            <div className="rounded-xl border bg-card p-8">
              <p className="mb-6 text-center text-muted-foreground">
                See how different actions might impact your credit score. This is an estimate
                based on typical scoring models.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">Current Credit Score</label>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    defaultValue="650"
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>300</span>
                    <span>650</span>
                    <span>850</span>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-medium">If you pay down credit cards to 30% utilization:</h4>
                    <p className="text-2xl font-bold text-green-600">+20 to +40 points</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-medium">If a collection is removed:</h4>
                    <p className="text-2xl font-bold text-green-600">+25 to +75 points</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-medium">If a late payment is removed:</h4>
                    <p className="text-2xl font-bold text-green-600">+15 to +40 points</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-medium">If you open a new credit card:</h4>
                    <p className="text-2xl font-bold text-yellow-600">-5 to -15 points (temporary)</p>
                  </div>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 shrink-0 text-blue-500" />
                    <p className="text-sm text-blue-800">
                      These are estimates based on typical FICO scoring factors. Actual impact
                      varies based on your complete credit profile. For a personalized analysis,
                      sign up for our free credit review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Utilization Calculator */}
      <section id="utilization" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Credit Utilization Calculator
            </h2>
            <div className="rounded-xl border bg-card p-8">
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Total Credit Card Balances ($)</label>
                  <input
                    type="number"
                    placeholder="e.g., 2500"
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Total Credit Limits ($)</label>
                  <input
                    type="number"
                    placeholder="e.g., 10000"
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-6 text-center">
                <p className="text-sm text-muted-foreground">Your Credit Utilization</p>
                <p className="text-4xl font-bold text-primary">25%</p>
                <p className="mt-2 text-sm text-green-600">✓ Good - Keep it under 30%</p>
              </div>
              <div className="mt-6">
                <h4 className="mb-3 font-medium">Utilization Guidelines:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span>0-10%: Excellent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-lime-500" />
                    <span>10-30%: Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span>30-50%: Fair (may hurt score)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span>50%+: Poor (significantly hurts score)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Score Factors */}
      <section id="debt-calculator" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              What Makes Up Your Credit Score
            </h2>
            <div className="rounded-xl border bg-card p-8">
              <div className="space-y-4">
                {scoreFactors.map((item) => (
                  <div key={item.factor}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{item.factor}</span>
                      <span className="text-sm text-muted-foreground">{item.weight}%</span>
                    </div>
                    <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.weight}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Want a Complete Credit Analysis?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our experts will review your complete credit profile and create a personalized
            plan to improve your score. Get started with a free consultation.
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

