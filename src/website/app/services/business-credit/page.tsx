import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  CreditCard,
  FileText,
  Users,
  DollarSign,
  Clock,
  Star,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Business Credit Building & Repair Services",
  description:
    "Build and repair your business credit with expert guidance. Establish credit for your LLC or corporation, improve D&B scores, and access better financing options.",
  keywords: [
    "business credit repair",
    "business credit building",
    "Dun & Bradstreet",
    "PAYDEX score",
    "corporate credit",
    "business financing",
    "LLC credit",
  ],
};

const benefits = [
  {
    icon: DollarSign,
    title: "Better Financing Terms",
    description:
      "Access higher credit limits, lower interest rates, and better loan terms for your business",
  },
  {
    icon: Shield,
    title: "Protect Personal Credit",
    description:
      "Separate business and personal finances to protect your personal credit score",
  },
  {
    icon: Building2,
    title: "Build Business Value",
    description:
      "Strong business credit increases your company's value and attractiveness to investors",
  },
  {
    icon: CreditCard,
    title: "Vendor Credit Lines",
    description:
      "Qualify for net-30, net-60, and net-90 payment terms with suppliers and vendors",
  },
  {
    icon: FileText,
    title: "Government Contracts",
    description:
      "Meet credit requirements for lucrative government and corporate contracts",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description:
      "Fund expansion, inventory, and equipment without depleting cash reserves",
  },
];

const creditBureaus = [
  {
    name: "Dun & Bradstreet",
    score: "PAYDEX Score (0-100)",
    description:
      "The most widely used business credit bureau. A PAYDEX score of 80+ indicates you pay on time or early.",
  },
  {
    name: "Experian Business",
    score: "Intelliscore Plus (1-100)",
    description:
      "Predicts the likelihood of serious delinquency. Scores above 76 are considered low risk.",
  },
  {
    name: "Equifax Business",
    score: "Business Credit Risk Score (101-992)",
    description:
      "Measures the risk of severe delinquency. Higher scores indicate lower risk to lenders.",
  },
];

const buildingSteps = [
  {
    step: 1,
    title: "Entity Formation & EIN",
    description:
      "Ensure your business is properly structured as an LLC, Corporation, or other entity with a valid EIN from the IRS.",
  },
  {
    step: 2,
    title: "Business Credit Profile Setup",
    description:
      "Register with Dun & Bradstreet for a D-U-N-S number and establish profiles with all major business credit bureaus.",
  },
  {
    step: 3,
    title: "Starter Vendor Accounts",
    description:
      "Open accounts with vendors who report to business credit bureaus (net-30 terms to start building history).",
  },
  {
    step: 4,
    title: "Business Credit Cards",
    description:
      "Apply for business credit cards that report to business bureaus, starting with secured cards if needed.",
  },
  {
    step: 5,
    title: "Credit Line Expansion",
    description:
      "Strategically increase credit limits and add new tradelines to strengthen your business credit profile.",
  },
  {
    step: 6,
    title: "Ongoing Monitoring & Repair",
    description:
      "Monitor your business credit reports and dispute any errors or inaccuracies that could hurt your scores.",
  },
];

const packages = [
  {
    name: "Startup",
    price: "$299",
    period: "one-time",
    description: "For new businesses establishing credit",
    features: [
      "D-U-N-S number registration",
      "Business credit profile setup",
      "5 starter vendor recommendations",
      "Credit building roadmap",
      "30-day email support",
    ],
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "For businesses actively building credit",
    features: [
      "Everything in Startup",
      "Monthly credit monitoring",
      "Vendor account management",
      "Credit dispute filing",
      "Bi-weekly strategy calls",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "For established businesses optimizing credit",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Advanced dispute strategies",
      "Financing introductions",
      "Quarterly business reviews",
      "SBA loan preparation",
    ],
  },
];

export default function BusinessCreditPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm">
              <Building2 className="h-4 w-4" />
              Business Credit Specialists
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Build Business Credit
              <span className="block text-blue-300">That Works for You</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Strong business credit opens doors to better financing, vendor terms, and growth
              opportunities. Our experts help you build, repair, and leverage your business
              credit profile.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Why Business Credit Matters
            </h2>
            <p className="mb-12 text-muted-foreground">
              Business credit is separate from your personal credit and crucial for sustainable
              business growth.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Bureaus */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Understanding Business Credit Bureaus
            </h2>
            <p className="mb-12 text-muted-foreground">
              Unlike personal credit (FICO), business credit is tracked by specialized bureaus
              with different scoring models.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {creditBureaus.map((bureau) => (
              <div key={bureau.name} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">{bureau.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary">{bureau.score}</p>
                <p className="text-sm text-muted-foreground">{bureau.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Our Business Credit Building Process
            </h2>
            <p className="mb-12 text-muted-foreground">
              A systematic approach to establishing and strengthening your business credit profile.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {buildingSteps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Business Credit Packages
            </h2>
            <p className="mb-12 text-muted-foreground">
              Choose the right level of support for your business credit journey.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-xl border bg-card p-6 ${
                  pkg.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold">{pkg.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">{pkg.description}</p>
                <ul className="mb-6 space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">
                  How long does it take to build business credit?
                </h3>
                <p className="text-sm text-muted-foreground">
                  With our systematic approach, most businesses can establish initial credit
                  profiles within 30-60 days and achieve strong scores within 6-12 months.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">
                  Do I need good personal credit to build business credit?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Not necessarily. While some business credit products check personal credit,
                  many vendor accounts and business credit builders don't require a personal
                  guarantee or credit check.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">
                  What type of business entity do I need?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We recommend an LLC or Corporation for building business credit, as sole
                  proprietorships typically don't separate personal and business credit effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Build Your Business Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Join thousands of business owners who have built strong credit profiles with our help.
            Get started today with a free consultation.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Building Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


