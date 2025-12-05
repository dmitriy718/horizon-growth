"use client";

import { motion } from "framer-motion";
import { FileSearch, Target, Send, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const steps = [
  {
    icon: FileSearch,
    step: "01",
    title: "Analyze",
    description:
      "We pull your credit reports from all three bureaus and our AI analyzes every detail to identify errors and opportunities.",
  },
  {
    icon: Target,
    step: "02",
    title: "Identify",
    description:
      "Our experts pinpoint inaccurate, unverifiable, or unfair negative items that may be hurting your score.",
  },
  {
    icon: Send,
    step: "03",
    title: "Dispute",
    description:
      "We create and send customized dispute letters to credit bureaus and creditors on your behalf.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Track",
    description:
      "Monitor your progress in real-time through our app. Watch your score improve as items are removed.",
  },
];

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section id="how-it-works" className={cn("py-20 lg:py-32", className)}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our proven 4-step process has helped over 50,000 Americans improve
            their credit scores and achieve their financial goals.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block" />
              )}

              <div className="relative rounded-2xl border bg-card p-6 transition-shadow hover:shadow-lg">
                {/* Step Number */}
                <span className="absolute -top-3 right-4 rounded-full bg-horizon-gold px-3 py-1 text-sm font-bold text-white">
                  {step.step}
                </span>

                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <step.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

