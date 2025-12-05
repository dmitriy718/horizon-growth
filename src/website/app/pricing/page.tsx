import { Metadata } from "next";
import Link from "next/link";
import { Check, Star, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description:
    "Transparent pricing for credit repair services. Choose the plan that fits your needs. No hidden fees, cancel anytime.",
};

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential credit repair for getting started",
    price: 79,
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    popular: false,
    features: [
      "Credit report analysis from all 3 bureaus",
      "Up to 5 disputes per month",
      "Monthly credit monitoring",
      "Score tracking dashboard",
      "Email support (48hr response)",
      "Educational resources library",
      "Mobile app access",
    ],
    notIncluded: [
      "AI-powered dispute optimization",
      "Creditor interventions",
      "Phone support",
    ],
  },
  {
    id: "premier",
    name: "Premier",
    description: "Comprehensive repair with priority service",
    price: 109,
    priceId: "price_1SYr8EJIckIhgZS6f7DOrTll",
    popular: true,
    features: [
      "Everything in Basic, plus:",
      "Up to 15 disputes per month",
      "AI-powered dispute letter optimization",
      "Creditor intervention letters",
      "Real-time credit monitoring alerts",
      "Phone & chat support (24hr response)",
      "Personal credit specialist",
      "Score improvement projections",
      "Goodwill letter campaigns",
    ],
    notIncluded: ["Identity theft protection", "Unlimited disputes"],
  },
  {
    id: "premier-plus",
    name: "Premier Plus",
    description: "Maximum results with concierge service",
    price: 139,
    priceId: "price_1SYr8vJIckIhgZS6AbabP5mL",
    popular: false,
    features: [
      "Everything in Premier, plus:",
      "Unlimited disputes",
      "Identity theft protection & monitoring",
      "Cease & desist letters",
      "Debt validation letters",
      "Dedicated specialist team",
      "Priority 4-hour response guarantee",
      "1-on-1 monthly strategy calls",
      "Score improvement guarantee*",
      "Credit builder recommendations",
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    question: "How long does it take to see results?",
    answer:
      "Most clients see their first removals within 30-45 days. Significant score improvements typically occur within 3-6 months, depending on the complexity of your credit situation.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes! There are no long-term contracts. You can cancel your subscription at any time with no cancellation fees.",
  },
  {
    question: "What's your money-back guarantee?",
    answer:
      "If you're not satisfied with our service within the first 90 days, we'll refund your payments in full. No questions asked.",
  },
  {
    question: "Do you guarantee specific score increases?",
    answer:
      "While we can't guarantee specific point increases (as results vary based on individual credit situations), our Premier Plus plan includes a score improvement guarantee - if your score doesn't improve, you don't pay.",
  },
  {
    question: "What information do you need to get started?",
    answer:
      "We'll need your basic personal information and consent to pull your credit reports. The entire signup process takes about 5 minutes.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Absolutely. We use bank-level 256-bit encryption, are SOC 2 certified, and never share your information with third parties. Your data security is our top priority.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Simple, Transparent{" "}
              <span className="text-primary">Pricing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Choose the plan that fits your needs. No hidden fees, no long-term
              contracts. Start with a free credit analysis.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>90-Day Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>7-Day Free Trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-lg",
                  plan.popular && "border-primary shadow-md"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      <Star className="h-4 w-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="ml-2 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    + one-time $14.99 setup fee
                  </p>
                </div>

                <Button
                  asChild
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  )}
                  size="lg"
                >
                  <Link href={`/signup?plan=${plan.id}`}>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="mt-8">
                  <p className="mb-4 text-sm font-medium">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.notIncluded.length > 0 && (
                  <div className="mt-6 border-t pt-6">
                    <p className="mb-3 text-xs font-medium text-muted-foreground">
                      Not included:
                    </p>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Guarantee Badge */}
          <div className="mt-12 rounded-xl bg-green-50 p-6 text-center dark:bg-green-950/20">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                💰 90-Day Money-Back Guarantee
              </h3>
              <p className="mt-2 text-green-700 dark:text-green-300">
                Try Horizon risk-free. If you're not completely satisfied with
                our service within 90 days, we'll refund every penny. No
                questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Compare Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium">Features</th>
                  <th className="p-4 text-center font-medium">Basic</th>
                  <th className="p-4 text-center font-medium">
                    <span className="rounded bg-primary/10 px-2 py-1 text-primary">
                      Premier
                    </span>
                  </th>
                  <th className="p-4 text-center font-medium">Premier Plus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Monthly disputes</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center">15</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Credit monitoring</td>
                  <td className="p-4 text-center">Monthly</td>
                  <td className="p-4 text-center">Real-time</td>
                  <td className="p-4 text-center">Real-time</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">AI dispute optimization</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Creditor interventions</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Personal specialist</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                  <td className="p-4 text-center">Dedicated team</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Identity theft protection</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support response</td>
                  <td className="p-4 text-center">48 hours</td>
                  <td className="p-4 text-center">24 hours</td>
                  <td className="p-4 text-center">4 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">1-on-1 strategy calls</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">Monthly</td>
                </tr>
                <tr>
                  <td className="p-4">Score guarantee</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">—</td>
                  <td className="p-4 text-center">
                    <Check className="mx-auto h-5 w-5 text-green-500" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border bg-card p-6">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">
              Ready to Transform Your Credit?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Start with a free credit analysis. No credit card required.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link href="/signup">
                Get Your Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-muted/30 py-8">
        <div className="container">
          <p className="mx-auto max-w-4xl text-center text-xs text-muted-foreground">
            *Score improvement guarantee applies to Premier Plus members only.
            If your credit score does not improve after 6 months of active
            service, we will refund up to 6 months of service fees. Terms and
            conditions apply. Results vary based on individual credit
            situations. Horizon Credit Repair is not a law firm and does not
            provide legal advice. Services are provided under the Credit Repair
            Organizations Act (CROA).
          </p>
        </div>
      </section>
    </div>
  );
}

