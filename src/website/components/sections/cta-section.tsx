"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface CTASectionProps {
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  className?: string;
  variant?: "default" | "dark";
}

export function CTASection({
  title,
  description,
  cta,
  secondaryCta,
  className,
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 lg:py-32",
        isDark
          ? "bg-gradient-to-br from-horizon-blue via-horizon-blue to-horizon-violet"
          : "bg-muted/50",
        className
      )}
    >
      {/* Background Elements */}
      {isDark && (
        <>
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-horizon-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-horizon-violet/30 blur-3xl" />
        </>
      )}

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className={cn(
              "font-serif text-3xl font-bold md:text-4xl lg:text-5xl",
              isDark ? "text-white" : "text-foreground"
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-lg",
              isDark ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="xl"
              variant={isDark ? "gold" : "default"}
              className="min-w-[200px]"
            >
              <Link href={cta.href}>
                {cta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="xl"
                variant="outline"
                className={cn(
                  "min-w-[200px]",
                  isDark && "border-white/30 text-white hover:bg-white/10"
                )}
              >
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </div>

          {/* Contact Options */}
          <div
            className={cn(
              "mt-12 flex flex-wrap items-center justify-center gap-8 text-sm",
              isDark ? "text-white/60" : "text-muted-foreground"
            )}
          >
            <a
              href="tel:1-800-HORIZON"
              className="flex items-center gap-2 transition-colors hover:text-horizon-gold"
            >
              <Phone className="h-4 w-4" />
              1-800-HORIZON
            </a>
            <button className="flex items-center gap-2 transition-colors hover:text-horizon-gold">
              <MessageCircle className="h-4 w-4" />
              Live Chat Available
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

