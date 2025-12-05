"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

/**
 * Representative testimonials based on typical client experiences.
 * Individual results may vary. These examples illustrate potential outcomes.
 */
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Texas",
    image: null, // No real image - will show initials
    scoreBefore: 598,
    scoreAfter: 721,
    quote:
      "I was stuck in a cycle of high-interest loans because of my credit. Horizon helped me remove 4 negative items and raise my score by over 120 points. I finally bought my first home!",
    rating: 5,
    representative: true, // Marked as representative example
  },
  {
    id: 2,
    name: "Marcus J.",
    location: "Georgia",
    image: null,
    scoreBefore: 512,
    scoreAfter: 645,
    quote:
      "After my divorce, my credit was destroyed. The team was compassionate and professional. They removed old collections and helped me understand how to rebuild. No judgment, just results.",
    rating: 5,
    representative: true,
  },
  {
    id: 3,
    name: "Jennifer C.",
    location: "Washington",
    image: null,
    scoreBefore: 635,
    scoreAfter: 755,
    quote:
      "I was a victim of identity theft with fraudulent accounts everywhere. The AI analysis caught things I missed, and the dispute process was seamless. My score improved significantly in 4 months.",
    rating: 5,
    representative: true,
  },
  {
    id: 4,
    name: "Robert W.",
    location: "Arizona",
    image: null,
    scoreBefore: 545,
    scoreAfter: 680,
    quote:
      "The app makes it so easy to track everything. I love seeing my progress in real-time. The AI assistant answered all my questions instantly. Best investment I've made in myself.",
    rating: 5,
    representative: true,
  },
];

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className={cn("bg-muted/30 py-20 lg:py-32", className)}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
            Real People, <span className="text-primary">Real Results</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of Americans who've transformed their financial
            futures with Horizon.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-card p-8 shadow-lg md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="h-12 w-12 text-primary/20" />

              {/* Quote */}
              <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
                "{current.quote}"
              </p>

              {/* Author Info */}
              <div className="mt-8 flex flex-col items-start justify-between gap-6 border-t pt-8 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  {/* Avatar with Initials */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {current.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {current.name}
                      {current.representative && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          *Representative example
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {current.location}
                    </p>
                    {/* Stars */}
                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: current.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-horizon-gold text-horizon-gold"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score Change */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Before</p>
                    <p className="text-2xl font-bold text-red-500">
                      {current.scoreBefore}
                    </p>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">After</p>
                    <p className="text-2xl font-bold text-green-500">
                      {current.scoreAfter}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    +{current.scoreAfter - current.scoreBefore} pts
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === currentIndex
                      ? "w-6 bg-primary"
                      : "bg-primary/30 hover:bg-primary/50"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-muted-foreground">
          *Representative examples based on typical client experiences. Individual results may vary 
          based on personal credit history and circumstances. These testimonials illustrate potential 
          outcomes and do not guarantee specific results. Credit repair outcomes depend on various 
          factors including the nature and age of negative items on your report.
        </p>
      </div>
    </section>
  );
}

