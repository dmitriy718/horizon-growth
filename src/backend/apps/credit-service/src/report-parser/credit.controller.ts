import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportParserService } from './report-parser.service';

@Controller()
export class CreditController {
  constructor(private readonly parserService: ReportParserService) {}

  @MessagePattern('parse_report')
  async parseReport(@Payload() data: { text: string }) {
    return this.parserService.parseText(data.text);
  }
}
