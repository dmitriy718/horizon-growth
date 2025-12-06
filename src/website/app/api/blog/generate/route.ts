import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";

// This endpoint is designed to be called by a cron job daily at 7 AM
// It uses OpenAI to generate a new blog post about credit topics

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const creditTopics = [
  "credit score factors",
  "credit utilization strategies",
  "disputing credit report errors",
  "building credit from scratch",
  "rebuilding credit after bankruptcy",
  "debt consolidation options",
  "credit card rewards strategies",
  "mortgage credit requirements",
  "auto loan credit tips",
  "student loan credit impact",
  "credit monitoring services",
  "identity theft protection",
  "credit freeze benefits",
  "secured credit cards",
  "credit builder loans",
  "authorized user strategy",
  "balance transfer tactics",
  "debt snowball vs avalanche",
  "credit report reading guide",
  "FICO vs VantageScore",
  "late payment recovery",
  "collections negotiation",
  "goodwill letter writing",
  "credit limit increases",
  "hard vs soft inquiries",
  "credit mix optimization",
  "joint account impacts",
  "divorce and credit",
  "medical debt credit rules",
  "rent reporting services",
  "utility payment reporting",
  "credit age strategies",
  "closing accounts impact",
  "credit repair timeline",
  "DIY credit repair tips",
  "credit bureau disputes",
  "FCRA consumer rights",
  "FDCPA debt collection rights",
  "credit score ranges explained",
  "excellent credit benefits",
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getTodaysDate(): string {
  return new Date().toISOString().split("T")[0];
}

export async function POST(request: Request) {
  try {
    // Verify the request is authorized (simple API key check)
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.BLOG_GENERATION_API_KEY || process.env.OPENAI_API_KEY;
    
    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pick a random topic
    const topic = creditTopics[Math.floor(Math.random() * creditTopics.length)];
    const todaysDate = getTodaysDate();

    // Generate the blog post using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a senior credit expert and content writer for Horizon Credit Repair, a legitimate credit repair company. Write helpful, accurate, and engaging blog posts about credit-related topics. 
          
Your posts should:
- Be educational and actionable
- Use simple language that anyone can understand
- Include practical tips readers can apply
- Be 800-1200 words (3-5 minute read)
- Have a clear structure with headings
- Include SEO-friendly keywords naturally
- End with a soft call-to-action to learn more about credit repair services
- Never make false claims or guarantees
- Always be factually accurate about credit laws (FCRA, FDCPA, etc.)

Output format should be JSON with these fields:
{
  "title": "SEO-optimized title",
  "excerpt": "2-3 sentence summary for previews",
  "category": "One of: Credit Scores, Credit Reports, Credit Building, Credit Repair, Credit Cards, Debt, Identity Protection",
  "tags": ["array", "of", "relevant", "keywords"],
  "readTime": "X min read",
  "content": "Full article in Markdown format"
}`,
        },
        {
          role: "user",
          content: `Write a comprehensive blog post about "${topic}" for our credit repair website. The post should help readers understand the topic and provide actionable advice. Make sure it's unique and valuable content that could rank well in search engines.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0].message.content;
    if (!generatedContent) {
      throw new Error("No content generated");
    }

    const postData = JSON.parse(generatedContent);
    const slug = generateSlug(postData.title);

    // Create the new blog post object
    const newPost = {
      slug,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: "Horizon Credit Team",
      date: todaysDate,
      readTime: postData.readTime || "4 min read",
      category: postData.category,
      tags: postData.tags || [topic],
      featured: false,
    };

    // In production, this would save to a database or CMS
    // For now, we'll append to the blog-posts.ts file
    // This is a simplified example - in production, use a proper CMS or database

    console.log("Generated new blog post:", {
      title: newPost.title,
      slug: newPost.slug,
      date: newPost.date,
    });

    return NextResponse.json({
      success: true,
      post: {
        title: newPost.title,
        slug: newPost.slug,
        date: newPost.date,
        category: newPost.category,
      },
      message: "Blog post generated successfully. To publish, add it to the blog-posts.ts file.",
      generatedPost: newPost,
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check the service status
export async function GET() {
  return NextResponse.json({
    service: "Blog Auto-Generation",
    status: "active",
    schedule: "Daily at 7 AM EST",
    topics: creditTopics.length,
    instructions: "POST to this endpoint with authorization to generate a new blog post.",
  });
}

