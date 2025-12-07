import { Module } from '@nestjs/common';
import { DisputeController } from './dispute.controller';
import { LetterService } from './letter.service';

@Module({
  controllers: [DisputeController],
  providers: [LetterService],
})
export class DisputeModule {}
