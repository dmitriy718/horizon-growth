import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LetterService, DisputeData } from './letter.service';

@Controller()
export class DisputeController {
  constructor(private readonly letterService: LetterService) {}

  @MessagePattern('generate_dispute_letter')
  async generateDisputeLetter(@Payload() data: DisputeData) {
    const pdfBuffer = await this.letterService.generateLetter(data);
    // Convert Uint8Array to Buffer/Array for transport
    return { pdf: Array.from(pdfBuffer) };
  }
}
