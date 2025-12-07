import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(@Inject('BILLING_SERVICE') private readonly billingClient: ClientProxy) {}

  @Post('checkout/lifetime')
  @ApiOperation({ summary: 'Create checkout session for Lifetime Deal' })
  async createLifetimeCheckout(@Body() body: { successUrl: string; cancelUrl: string }) {
    // TODO: Move price ID to config
    const LIFETIME_PRICE_ID = process.env.STRIPE_LIFETIME_PRICE_ID || 'price_test_lifetime';
    
    return this.billingClient.send('create_checkout_session', {
      priceId: LIFETIME_PRICE_ID,
      mode: 'payment',
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
    });
  }

  @Post('checkout/plan')
  @ApiOperation({ summary: 'Create checkout session for a specific plan' })
  async createPlanCheckout(@Body() body: { planType: 'basic' | 'premium' | 'premium-plus'; successUrl: string; cancelUrl: string }) {
    let priceId: string;

    switch (body.planType) {
      case 'basic':
        priceId = process.env.STRIPE_PRICE_BASIC || '';
        break;
      case 'premium':
        priceId = process.env.STRIPE_PRICE_PREMIUM || '';
        break;
      case 'premium-plus':
        priceId = process.env.STRIPE_PRICE_PREMIUM_PLUS || '';
        break;
      default:
        throw new Error('Invalid plan type');
    }

    if (!priceId) {
      throw new Error(`Price ID not found for plan: ${body.planType}`);
    }

    return this.billingClient.send('create_checkout_session', {
      priceId,
      mode: 'subscription',
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
    });
  }
}
