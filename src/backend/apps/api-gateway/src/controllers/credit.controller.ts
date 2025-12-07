import { Controller, Post, UseInterceptors, UploadedFile, Inject, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import pdf from 'pdf-parse';

@ApiTags('Credit')
@Controller('credit')
export class CreditController {
  constructor(@Inject('CREDIT_SERVICE') private readonly creditClient: ClientProxy) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload credit report (PDF)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadReport(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed');
    }

    try {
      // Extract text from PDF
      const data = await pdf(file.buffer);
      const text = data.text;

      // Send text to credit-service for parsing
      return this.creditClient.send('parse_report', { text });
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new BadRequestException('Failed to process PDF file');
    }
  }
}
