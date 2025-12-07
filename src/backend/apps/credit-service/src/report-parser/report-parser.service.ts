import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class ReportParserService {
  constructor(private aiService: AIService) {}

  async parseText(text: string): Promise<any> {
    // Basic heuristic parsing for MVP
    const collections = this.extractSection(text, /collections/i, /public records|inquiries/i);
    const inquiries = this.extractSection(text, /inquiries/i, /end of report/i);
    
    const parsedCollections = this.parseCollections(collections);
    
    // Enrich with AI Analysis
    const analyzedCollections = await Promise.all(
      parsedCollections.map(async (item) => {
        const analysis = await this.aiService.analyzeDispute(item);
        return { ...item, analysis };
      })
    );

    return {
      rawTextLength: text.length,
      collections: analyzedCollections,
      inquiries: this.parseInquiries(inquiries),
      summary: {
        score: this.extractScore(text),
        totalNegativeItems: analyzedCollections.length
      }
    };
  }

  private extractSection(text: string, startRegex: RegExp, endRegex: RegExp): string {
    const startMatch = text.match(startRegex);
    if (!startMatch) return '';
    
    const startIndex = startMatch.index!;
    const remainingText = text.slice(startIndex);
    
    const endMatch = remainingText.match(endRegex);
    if (!endMatch) return remainingText;
    
    return remainingText.slice(0, endMatch.index);
  }

  private parseCollections(text: string): any[] {
    // Placeholder: Look for patterns like "$1,234" or "Account #"
    // For MVP, just returning a dummy item if "Collection" word is found
    if (text.length > 10) {
      return [{
        creditor: "Unknown Creditor (Parsed)",
        amount: "$500",
        status: "Open",
        dateOpened: "01/01/2023" // Added for AI context
      }];
    }
    return [];
  }

  private parseInquiries(text: string): any[] {
    return [];
  }

  private extractScore(text: string): number | null {
    const match = text.match(/score\s*[:#-]?\s*(\d{3})/i);
    return match ? parseInt(match[1], 10) : null;
  }
}
