/**
 * AI Chat API Route
 * Handles conversations with the Horizon Credit Assistant
 */

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the credit assistant
const SYSTEM_PROMPT = `You are the Horizon Credit Repair AI Assistant, a knowledgeable and empathetic expert in credit repair and financial wellness.

Your role is to:
1. Answer questions about credit scores, credit reports, and credit repair
2. Explain credit concepts in simple, easy-to-understand terms
3. Provide actionable advice for improving credit
4. Help users understand their options for credit repair
5. Guide users through the Horizon Credit Repair services when appropriate

Important guidelines:
- Be warm, supportive, and non-judgmental - many people feel embarrassed about credit issues
- Provide accurate information based on FCRA, CROA, and credit industry standards
- Never guarantee specific score increases or outcomes
- When discussing disputes, explain that only inaccurate, unverifiable, or unfair items can be legitimately disputed
- Recommend professional help when appropriate, but don't be pushy
- If asked about specific account details or personal information you don't have, explain that you'd need access to their credit report to provide specific advice
- Always remind users that Horizon Credit Repair is not a law firm and does not provide legal advice

Key facts about Horizon Credit Repair:
- Located at 204 Hotchkiss Ln, Duncan, SC 29334
- Phone: (864) 237-5511
- Website: horizoncredit.net
- Pricing: Basic ($79/mo), Premier ($109/mo), Premier Plus ($139/mo)
- All plans include a 7-day free trial
- 90-day money-back guarantee

Credit Score Factors (for reference):
- Payment History: 35%
- Credit Utilization: 30%
- Length of Credit History: 15%
- Credit Mix: 10%
- New Credit/Inquiries: 10%

Common dispute reasons:
- Account not mine (identity theft or mixed files)
- Incorrect balance or credit limit
- Incorrect payment status
- Account already paid or settled
- Outdated information (7+ years for most negative items)
- Duplicate accounts
- Incorrect personal information`;

export async function POST(request: NextRequest) {
  try {
    const { messages, userId } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Build conversation with system prompt
    const conversationMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: conversationMessages,
      temperature: 0.7,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: completion.usage,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: "AI service configuration error" },
          { status: 500 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a moment." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}

// Streaming endpoint for real-time responses
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Use POST method for chat" },
    { status: 405 }
  );
}

