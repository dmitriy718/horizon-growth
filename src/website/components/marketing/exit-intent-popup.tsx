"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface ExitIntentPopupProps {
  onClose?: () => void;
}

// 7 different exit intent variations
const exitIntentVariations = [
  {
    id: "flash-discount",
    headline: "Wait! Don't Leave Empty-Handed",
    subheadline: "Get 20% OFF your first month",
    body: "Sign up in the next 5 minutes and save $22 on your credit repair journey. Your better credit score is just one click away.",
    cta: "Claim My 20% Discount",
    ctaLink: "/signup?discount=FLASH20",
    hasTimer: true,
    timerMinutes: 5,
    style: "gradient-blue",
  },
  {
    id: "free-analysis",
    headline: "Before You Go...",
    subheadline: "Get Your FREE Credit Analysis",
    body: "Discover exactly what's hurting your credit score and get a personalized action plan—absolutely free. No credit card required.",
    cta: "Get My Free Analysis",
    ctaLink: "/signup?offer=free-analysis",
    hasTimer: false,
    style: "gradient-green",
  },
  {
    id: "success-story",
    headline: "Sarah Raised Her Score 127 Points",
    subheadline: "Want results like hers?",
    body: "In just 6 months, Sarah went from 580 to 707. She bought her dream home last month. Your success story starts today.",
    cta: "Start My Journey",
    ctaLink: "/signup",
    hasTimer: false,
    style: "testimonial",
  },
  {
    id: "money-back",
    headline: "Still Not Sure?",
    subheadline: "We offer a 90-Day Money-Back Guarantee",
    body: "If you don't see improvement in your credit report within 90 days, we'll refund every penny. Zero risk, maximum reward.",
    cta: "Try Risk-Free",
    ctaLink: "/signup",
    hasTimer: false,
    style: "gradient-purple",
  },
  {
    id: "newsletter",
    headline: "Get Free Credit Tips Weekly",
    subheadline: "Join 10,000+ subscribers",
    body: "Not ready to start? No problem. Get expert credit tips delivered to your inbox every week. Unsubscribe anytime.",
    cta: "Subscribe Free",
    ctaLink: "",
    hasTimer: false,
    style: "newsletter",
    isNewsletter: true,
  },
  {
    id: "limited-spots",
    headline: "Only 3 Spots Left This Week",
    subheadline: "Our experts are almost fully booked",
    body: "Due to high demand, we can only take 3 more clients this week. Don't miss your chance to start repairing your credit.",
    cta: "Reserve My Spot",
    ctaLink: "/signup",
    hasTimer: false,
    style: "urgency",
  },
  {
    id: "comparison",
    headline: "DIY Credit Repair Taking Forever?",
    subheadline: "Let the pros handle it",
    body: "Our clients see results 3x faster than DIY. Stop wasting time on confusing dispute letters. We know exactly what works.",
    cta: "See Our Results",
    ctaLink: "/pricing",
    hasTimer: false,
    style: "gradient-orange",
  },
];

export function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [variation, setVariation] = useState(exitIntentVariations[0]);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Select random variation on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exitIntentVariations.length);
    setVariation(exitIntentVariations[randomIndex]);
  }, []);

  // Exit intent detection
  useEffect(() => {
    // Check if already shown this session
    const hasShown = sessionStorage.getItem("exitIntentShown");
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Also trigger on back button attempt (mobile)
    const handleBeforeUnload = () => {
      // Can't show popup on beforeunload, but we can log it
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!variation.hasTimer || !isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [variation.hasTimer, isVisible]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(handleClose, 2000);
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  const getStyleClasses = () => {
    switch (variation.style) {
      case "gradient-blue":
        return "bg-gradient-to-br from-[#1E3A5F] to-[#2D5A8F]";
      case "gradient-green":
        return "bg-gradient-to-br from-emerald-600 to-emerald-800";
      case "gradient-purple":
        return "bg-gradient-to-br from-purple-600 to-purple-900";
      case "gradient-orange":
        return "bg-gradient-to-br from-orange-500 to-red-600";
      case "testimonial":
        return "bg-gradient-to-br from-slate-800 to-slate-900";
      case "urgency":
        return "bg-gradient-to-br from-red-600 to-red-800";
      case "newsletter":
        return "bg-gradient-to-br from-[#1E3A5F] to-[#2D4A6F]";
      default:
        return "bg-gradient-to-br from-[#1E3A5F] to-[#2D4A6F]";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl text-white overflow-hidden animate-in zoom-in-95 duration-300 ${getStyleClasses()}`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
          {/* Timer badge */}
          {variation.hasTimer && timeLeft > 0 && (
            <div className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
              <span>⏰ Offer expires in:</span>
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {variation.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-white/90 mb-4">{variation.subheadline}</p>

          {/* Body */}
          <p className="text-white/80 mb-8 leading-relaxed">{variation.body}</p>

          {/* Newsletter form or CTA button */}
          {variation.isNewsletter ? (
            submitted ? (
              <div className="bg-emerald-500 text-white p-4 rounded-xl text-center">
                <p className="font-semibold">🎉 You're subscribed!</p>
                <p className="text-sm">Check your inbox for credit tips.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : variation.cta}
                </button>
              </form>
            )
          ) : (
            <Link
              href={variation.ctaLink}
              className="block w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-center py-4 px-6 rounded-xl transition-colors text-lg shadow-lg"
              onClick={handleClose}
            >
              {variation.cta}
            </Link>
          )}

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <span>🔒</span> Secure
            </span>
            <span className="flex items-center gap-1">
              <span>✓</span> No Spam
            </span>
            <span className="flex items-center gap-1">
              <span>💯</span> Free to Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

