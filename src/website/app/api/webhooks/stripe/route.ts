/**
 * Stripe Webhook Handler
 * 
 * Webhook URL to provide to user: https://horizoncredit.net/api/webhooks/stripe
 * 
 * Events to listen for in Stripe Dashboard:
 * - checkout.session.completed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.paid
 * - invoice.payment_failed
 */

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { constructWebhookEvent } from "@/lib/stripe";
import type Stripe from "stripe";

// Force dynamic rendering for webhook
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("[Stripe Webhook] Missing signature");
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Log event for debugging (remove in production or use proper logging)
  console.log(`[Stripe Webhook] Received event: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Stripe Webhook] Handler error: ${message}`);
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout completion
 */
async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const customerEmail = session.customer_details?.email;

  console.log(`[Stripe] Checkout completed for customer: ${customerId}`);
  console.log(`[Stripe] Subscription ID: ${subscriptionId}`);
  console.log(`[Stripe] Customer email: ${customerEmail}`);

  // TODO: Create user account in database
  // TODO: Link Stripe customer ID to user
  // TODO: Send welcome email via SendGrid
  // TODO: Trigger onboarding flow

  // Example API call to backend:
  // await fetch(`${process.env.BACKEND_URL}/api/v1/users/provision`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     stripeCustomerId: customerId,
  //     stripeSubscriptionId: subscriptionId,
  //     email: customerEmail,
  //     metadata: session.metadata,
  //   }),
  // });
}

/**
 * Handle new subscription creation
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0]?.price.id;

  console.log(`[Stripe] Subscription created: ${subscription.id}`);
  console.log(`[Stripe] Customer: ${customerId}, Price: ${priceId}`);

  // TODO: Update user subscription status in database
  // TODO: Grant access to features based on plan
}

/**
 * Handle subscription updates (upgrades, downgrades, plan changes)
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0]?.price.id;
  const cancelAtPeriodEnd = subscription.cancel_at_period_end;

  console.log(`[Stripe] Subscription updated: ${subscription.id}`);
  console.log(`[Stripe] Status: ${status}, Cancel at period end: ${cancelAtPeriodEnd}`);

  // TODO: Update subscription status in database
  // TODO: If cancelled, schedule downgrade
  // TODO: If reactivated, restore access
  // TODO: If plan changed, update features
}

/**
 * Handle subscription cancellation/deletion
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  console.log(`[Stripe] Subscription deleted: ${subscription.id}`);
  console.log(`[Stripe] Customer: ${customerId}`);

  // TODO: Revoke access to premium features
  // TODO: Update user status in database
  // TODO: Send cancellation confirmation email
  // TODO: Trigger win-back campaign after 30 days
}

/**
 * Handle successful invoice payment
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const amountPaid = invoice.amount_paid / 100; // Convert from cents

  console.log(`[Stripe] Invoice paid: ${invoice.id}`);
  console.log(`[Stripe] Customer: ${customerId}, Amount: $${amountPaid}`);

  // TODO: Update billing history
  // TODO: Reset monthly dispute count if applicable
  // TODO: Send payment receipt
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const attemptCount = invoice.attempt_count;

  console.log(`[Stripe] Payment failed: ${invoice.id}`);
  console.log(`[Stripe] Customer: ${customerId}, Attempt: ${attemptCount}`);

  // TODO: Send payment failure email
  // TODO: If multiple failures, restrict access
  // TODO: Trigger dunning management flow
}

