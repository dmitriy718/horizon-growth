"use client";

import { motion } from "framer-motion";
import { Shield, Award, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const badges = [
  {
    icon: Shield,
    title: "BBB A+ Rated",
    description: "Accredited Business",
  },
  {
    icon: Award,
    title: "Inc. 5000",
    description: "Fastest Growing",
  },
  {
    icon: Lock,
    title: "SOC 2 Certified",
    description: "Enterprise Security",
  },
  {
    icon: CheckCircle,
    title: "CROA Compliant",
    description: "Fully Licensed",
  },
];

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <section className={cn("border-y bg-muted/30 py-8", className)}>
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{badge.title}</p>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

