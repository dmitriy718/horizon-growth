"use client";

import { useState } from "react";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "footer" | "sidebar" | "banner";
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSignup({
  variant = "card",
  title = "Get Credit Tips Weekly",
  description = "Join 10,000+ subscribers and get expert credit advice delivered to your inbox every week.",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("🎉 You're subscribed! Check your inbox for a welcome email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline variant - simple horizontal form
  if (variant === "inline") {
    return (
      <div className={`${className}`}>
        {status === "success" ? (
          <p className="text-emerald-600 font-medium">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-2">{message}</p>
        )}
      </div>
    );
  }

  // Banner variant - full-width attention-grabbing
  if (variant === "banner") {
    return (
      <div className={`bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1">{title}</h3>
              <p className="text-blue-100">{description}</p>
            </div>
            {status === "success" ? (
              <p className="text-emerald-400 font-medium">{message}</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe Free"}
                </button>
              </form>
            )}
          </div>
          {status === "error" && (
            <p className="text-red-300 text-center mt-2">{message}</p>
          )}
        </div>
      </div>
    );
  }

  // Footer variant - compact for footer sections
  if (variant === "footer") {
    return (
      <div className={`${className}`}>
        <h4 className="text-lg font-semibold mb-3">{title}</h4>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {status === "success" ? (
          <p className="text-emerald-600 font-medium text-sm">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#1E3A5F] text-white text-sm font-medium rounded-lg hover:bg-[#2D4A6F] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-500 text-xs mt-2">{message}</p>
        )}
      </div>
    );
  }

  // Sidebar variant - for blog sidebar
  if (variant === "sidebar") {
    return (
      <div className={`bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white ${className}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-emerald-100 text-sm mb-4">{description}</p>
        {status === "success" ? (
          <p className="text-white font-medium text-sm">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Free"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-200 text-xs mt-2">{message}</p>
        )}
        <p className="text-emerald-100 text-xs mt-4 text-center">
          No spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  // Card variant (default) - standalone card
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl p-8 shadow-sm ${className}`}>
      <div className="text-center mb-6">
        <span className="text-4xl mb-4 block">📬</span>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center">
          <p className="font-medium">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe for Free"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm text-center mt-4">{message}</p>
      )}

      <p className="text-gray-500 text-xs text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}

