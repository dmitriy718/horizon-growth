/**
 * Stripe Integration for Horizon Credit Repair
 * 
 * Setup Instructions:
 * 1. Create products in Stripe Dashboard (https://dashboard.stripe.com/products)
 * 2. Create recurring prices for each tier
 * 3. Add price IDs to environment variables
 * 4. Configure webhook endpoint in Stripe Dashboard
 */

import Stripe from "stripe";

// Validate required environment variables
if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === "production") {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// Initialize Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

// Pricing configuration
export const PRICING_PLANS = {
  basic: {
    name: "Basic",
    price: 7999, // $79.99 in cents
    priceDisplay: "$79.99",
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      "Credit report analysis",
      "Basic dispute letters",
      "Monthly credit monitoring",
      "Email support",
      "Mobile app access",
    ],
    popular: false,
  },
  premier: {
    name: "Premier",
    price: 10999, // $109.99 in cents
    priceDisplay: "$109.99",
    priceId: process.env.STRIPE_PREMIER_PRICE_ID,
    features: [
      "Everything in Basic",
      "AI-powered dispute optimization",
      "Unlimited disputes",
      "Priority support",
      "Credit score simulator",
      "Creditor intervention",
    ],
    popular: true,
  },
  premierPlus: {
    name: "Premier Plus",
    price: 13999, // $139.99 in cents
    priceDisplay: "$139.99",
    priceId: process.env.STRIPE_PREMIER_PLUS_PRICE_ID,
    features: [
      "Everything in Premier",
      "Identity theft protection",
      "Cease & desist letters",
      "Dedicated account manager",
      "1-on-1 coaching sessions",
      "Debt validation letters",
      "Credit builder tools",
    ],
    popular: false,
  },
} as const;

export type PlanKey = keyof typeof PRICING_PLANS;

/**
 * Create a Stripe Checkout session for subscription
 */
export async function createCheckoutSession({
  priceId,
  customerId,
  customerEmail,
  successUrl,
  cancelUrl,
  metadata,
}: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}): Promise<Stripe.Checkout.Session> {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
    allow_promotion_codes: true,
    billing_address_collection: "required",
    customer_creation: customerId ? undefined : "always",
    subscription_data: {
      trial_period_days: 7, // 7-day free trial
      metadata,
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else if (customerEmail) {
    sessionParams.customer_email = customerEmail;
  }

  return stripe.checkout.sessions.create(sessionParams);
}

/**
 * Create a Stripe Customer Portal session for subscription management
 */
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

/**
 * Retrieve subscription details
 */
export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method", "latest_invoice"],
  });
}

/**
 * Cancel subscription at period end
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

/**
 * Construct and verify Stripe webhook event
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }

  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

