"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const plans = [
  {
    name: "Basic",
    price: 79,
    description: "Essential credit repair for getting started",
    features: [
      "Disputes to all 3 bureaus",
      "Monthly credit monitoring",
      "Score tracking dashboard",
      "Email support",
      "Educational resources",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premier",
    price: 109,
    description: "Comprehensive repair with priority service",
    features: [
      "Everything in Basic, plus:",
      "Priority dispute processing",
      "Creditor interventions",
      "AI-powered analysis",
      "Phone & chat support",
      "Personal credit specialist",
    ],
    cta: "Start Premier",
    popular: true,
  },
  {
    name: "Premier Plus",
    price: 139,
    description: "Maximum results with concierge service",
    features: [
      "Everything in Premier, plus:",
      "Unlimited disputes",
      "Identity theft protection",
      "Cease & desist letters",
      "Dedicated specialist team",
      "Priority response guarantee",
      "Score improvement guarantee",
    ],
    cta: "Start Premier Plus",
    popular: false,
  },
];

interface PricingPreviewProps {
  className?: string;
}

export function PricingPreview({ className }: PricingPreviewProps) {
  return (
    <section className={cn("py-20 lg:py-32", className)}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your needs. No hidden fees, no long-term
            contracts. Cancel anytime.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border bg-card p-8",
                plan.popular && "border-primary shadow-lg ring-1 ring-primary"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-horizon-sage" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className="mt-8 w-full"
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                <Link href="/signup">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          💰 <strong>90-Day Money-Back Guarantee</strong> — If you're not
          satisfied, we'll refund your first 90 days. No questions asked.
        </motion.p>
      </div>
    </section>
  );
}

