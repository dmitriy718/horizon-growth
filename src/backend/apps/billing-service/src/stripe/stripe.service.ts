import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      console.warn('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(secretKey || 'sk_test_placeholder', {
      apiVersion: '2023-10-16',
    });
  }

  async createCheckoutSession(priceId: string, successUrl: string, cancelUrl: string, mode: 'payment' | 'subscription') {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
  }
}
