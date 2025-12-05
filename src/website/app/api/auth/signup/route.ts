/**
 * Signup API Route
 * Creates user account and initiates Stripe Checkout
 */

import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICING_PLANS, PlanKey } from "@/lib/stripe";

// Price IDs from environment
const PRICE_IDS: Record<string, string> = {
  basic: process.env.STRIPE_BASIC_PRICE_ID || "",
  premier: process.env.STRIPE_PREMIER_PRICE_ID || "price_1SYr8EJIckIhgZS6f7DOrTll",
  "premier-plus": process.env.STRIPE_PREMIER_PLUS_PRICE_ID || "price_1SYr8vJIckIhgZS6AbabP5mL",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, plan } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get the price ID for the selected plan
    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    let customerId: string;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      // Update customer info
      await stripe.customers.update(customerId, {
        name: `${firstName} ${lastName}`,
        phone,
        metadata: {
          firstName,
          lastName,
          phone,
        },
      });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email,
        name: `${firstName} ${lastName}`,
        phone,
        metadata: {
          firstName,
          lastName,
          phone,
          signupDate: new Date().toISOString(),
        },
      });
      customerId = customer.id;
    }

    // Create Checkout Session with trial
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
        // Setup fee (one-time)
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Account Setup Fee",
              description: "One-time setup and credit report analysis fee",
            },
            unit_amount: 1499, // $14.99
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          plan,
          firstName,
          lastName,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/signup?plan=${plan}&canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        plan,
        firstName,
        lastName,
        email,
        phone,
      },
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle specific Stripe errors
    if (error instanceof Error) {
      if (error.message.includes("No such price")) {
        return NextResponse.json(
          { error: "Price configuration error. Please contact support." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

