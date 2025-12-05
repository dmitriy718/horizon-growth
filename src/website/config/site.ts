/**
 * Horizon Credit Repair - Site Configuration
 * This file contains all business and site-wide configuration
 */

export const siteConfig = {
  // Business Information
  name: "Horizon Credit Repair",
  legalName: "Horizon Credit Repair",
  tagline: "Your Path to Better Credit",
  description:
    "Professional credit repair services powered by AI. Fix errors on your credit report, improve your score, and achieve your financial goals.",

  // Contact Information
  contact: {
    address: {
      street: "204 Hotchkiss Ln",
      city: "Duncan",
      state: "SC",
      zip: "29334",
      full: "204 Hotchkiss Ln, Duncan, SC 29334",
    },
    phone: {
      display: "(864) 237-5511",
      raw: "+18642375511",
      tollfree: "1-800-HORIZON", // Update when you have a toll-free number
    },
    email: {
      support: "support@horizongrowth.com",
      info: "info@horizongrowth.com",
      legal: "legal@horizongrowth.com",
    },
  },

  // URLs
  url: {
    production: "https://horizongrowth.com",
    app: "https://app.horizongrowth.com",
    api: "https://api.horizongrowth.com",
  },

  // Social Media (update with real handles when created)
  social: {
    facebook: "https://facebook.com/horizoncreditrepair",
    twitter: "https://twitter.com/horizoncredit",
    instagram: "https://instagram.com/horizoncreditrepair",
    linkedin: "https://linkedin.com/company/horizoncreditrepair",
    youtube: "https://youtube.com/@horizoncreditrepair",
  },

  // Pricing (in cents for Stripe)
  pricing: {
    basic: {
      name: "Basic",
      priceMonthly: 7999, // $79.99
      priceDisplay: "$79.99",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || "",
    },
    premier: {
      name: "Premier",
      priceMonthly: 10999, // $109.99
      priceDisplay: "$109.99",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIER_PRICE_ID || "",
    },
    premierPlus: {
      name: "Premier Plus",
      priceMonthly: 13999, // $139.99
      priceDisplay: "$139.99",
      stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIER_PLUS_PRICE_ID || "",
    },
  },

  // Business Hours
  hours: {
    weekdays: "9:00 AM - 6:00 PM EST",
    saturday: "10:00 AM - 4:00 PM EST",
    sunday: "Closed",
  },

  // Legal
  legal: {
    established: 2024,
    stateOfIncorporation: "South Carolina",
  },
} as const;

export type SiteConfig = typeof siteConfig;

