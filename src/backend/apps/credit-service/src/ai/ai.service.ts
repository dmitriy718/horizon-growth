import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeDispute(item: any): Promise<any> {
    try {
      const prompt = `
        Analyze this credit report item and identify potential errors or dispute reasons.
        Item: ${JSON.stringify(item)}
        
        Return a JSON object with:
        - reasons: string[] (List of 3 distinct dispute reasons)
        - probability: number (0-100, estimated success rate)
        - recommendedStrategy: string (One sentence strategy)
      `;

      const completion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0].message.content;
      return JSON.parse(content || '{}');
    } catch (error) {
      console.error('AI Analysis failed:', error);
      // Fallback if AI fails
      return {
        reasons: ['Verify account accuracy', 'Request proof of debt', 'Check statute of limitations'],
        probability: 30,
        recommendedStrategy: 'Standard validation request',
      };
    }
  }
}
