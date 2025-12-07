import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StripeService } from './stripe.service';

@Controller()
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern('create_checkout_session')
  async createCheckoutSession(@Payload() data: { priceId: string; successUrl: string; cancelUrl: string; mode: 'payment' | 'subscription' }) {
    const session = await this.stripeService.createCheckoutSession(data.priceId, data.successUrl, data.cancelUrl, data.mode);
    return { url: session.url };
  }
}
