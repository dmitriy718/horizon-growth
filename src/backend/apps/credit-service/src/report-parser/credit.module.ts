import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { ReportParserService } from './report-parser.service';
import { AIService } from '../ai/ai.service';

@Module({
  controllers: [CreditController],
  providers: [ReportParserService, AIService],
})
export class CreditModule {}
