import { Controller, Post, Body, Inject, Res, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@ApiTags('Dispute')
@Controller('dispute')
export class DisputeController {
  constructor(@Inject('DISPUTE_SERVICE') private readonly disputeClient: ClientProxy) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a dispute letter (PDF)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        userName: { type: 'string' },
        userAddress: { type: 'string' },
        creditorName: { type: 'string' },
        amount: { type: 'string' },
        reason: { type: 'string' },
      },
    },
  })
  async generateLetter(@Body() body: any, @Res() res: Response) {
    try {
      const result = await firstValueFrom(this.disputeClient.send('generate_dispute_letter', body));
      
      if (!result || !result.pdf) {
        throw new BadRequestException('Failed to generate PDF');
      }

      const buffer = Buffer.from(result.pdf);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="dispute-letter.pdf"',
        'Content-Length': buffer.length,
      });

      res.end(buffer);
    } catch (error) {
      console.error('Error generating dispute letter:', error);
      throw new BadRequestException('Failed to generate dispute letter');
    }
  }
}
