// Billing DTOs

export type PaymentStatus = 
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type SubscriptionTier = 
  | "NONE"
  | "BASIC"
  | "PREMIER"
  | "PREMIER_PLUS";

export interface CreateCheckoutSessionDto {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionDto {
  sessionId: string;
  url: string;
}

export interface SubscriptionDto {
  id: string;
  customerId: string;
  stripeSubscriptionId: string;
  tier: SubscriptionTier;
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentDto {
  id: string;
  customerId: string;
  stripePaymentId?: string;
  stripeInvoiceId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod?: string;
  description?: string;
  paidAt?: string;
  createdAt: string;
}

export interface PaymentHistoryDto {
  payments: PaymentDto[];
  total: number;
  page: number;
  limit: number;
}

export interface BillingSummaryDto {
  currentTier: SubscriptionTier;
  nextBillingDate?: string;
  monthlyAmount?: number;
  totalPaid: number;
  paymentMethod?: {
    brand: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
  };
}

export interface UpdateSubscriptionDto {
  customerId: string;
  newPriceId: string;
}

export interface CancelSubscriptionDto {
  customerId: string;
  cancelAtPeriodEnd?: boolean;
}

