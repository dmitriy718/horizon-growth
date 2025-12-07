import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createPost } from "@/lib/blog";

// This endpoint is designed to be called by a cron job daily at 7 AM
// It uses OpenAI to generate a new blog post and saves it to the database

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const creditTopics = [
  "credit score factors and how they work",
  "credit utilization strategies for better scores",
  "disputing credit report errors step by step",
  "building credit from scratch as a beginner",
  "rebuilding credit after bankruptcy tips",
  "debt consolidation options compared",
  "credit card rewards maximization strategies",
  "mortgage credit requirements explained",
  "auto loan credit tips for best rates",
  "student loan credit impact explained",
  "credit monitoring services worth it",
  "identity theft protection guide",
  "credit freeze benefits and how to",
  "secured credit cards for building credit",
  "credit builder loans explained",
  "authorized user strategy for credit",
  "balance transfer tactics for debt payoff",
  "debt snowball vs avalanche method",
  "credit report reading guide for beginners",
  "FICO vs VantageScore differences",
  "late payment recovery strategies",
  "collections negotiation tactics",
  "goodwill letter writing guide",
  "credit limit increase strategies",
  "hard vs soft credit inquiries explained",
  "credit mix optimization tips",
  "joint account credit impacts",
  "divorce and credit score effects",
  "medical debt credit rules 2024",
  "rent reporting services review",
  "utility payment reporting for credit",
  "credit age strategies for higher scores",
  "closing accounts impact on credit",
  "credit repair timeline expectations",
  "DIY credit repair step by step",
  "credit bureau dispute process",
  "FCRA consumer rights explained",
  "FDCPA debt collection rights",
  "credit score ranges what they mean",
  "excellent credit score benefits",
  "how to get a 800 credit score",
  "credit card APR explained",
  "best time to pay credit cards",
  "credit card minimum payments trap",
  "credit utilization per card vs overall",
  "negative items removal timeline",
  "pay for delete letters guide",
  "credit repair scams to avoid",
  "free credit monitoring options",
  "annual credit report review guide",
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

export async function POST(request: Request) {
  try {
    // Verify the request is authorized
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.BLOG_GENERATION_API_KEY || process.env.OPENAI_API_KEY;

    if (!expectedKey) {
      return NextResponse.json(
        { error: "Server configuration error: No API key configured" },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Pick a random topic
    const topic = creditTopics[Math.floor(Math.random() * creditTopics.length)];

    console.log(`Generating blog post about: ${topic}`);

    // Generate the blog post using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a senior credit expert and content writer for Horizon Credit Repair, a legitimate credit repair company based in Duncan, South Carolina. Write helpful, accurate, and engaging blog posts about credit-related topics.

IMPORTANT FORMATTING RULES:
- DO NOT include the title as an H1 heading in the content (the title is displayed separately)
- Start the content directly with an introduction paragraph
- Use ## for main section headings (H2)
- Use ### for subsection headings (H3)
- Leave a blank line before and after every heading
- Leave a blank line between paragraphs
- Use bullet points with proper spacing (one item per line with blank line after the list)
- For numbered steps, use 1. 2. 3. format with clear explanations for each step
- Bold important terms using **bold text**
- Include a "Key Takeaways" or "Summary" section near the end

CONTENT STRUCTURE:
1. Opening paragraph (2-3 sentences introducing the topic)
2. Main content with 3-5 major sections (H2 headings)
3. Each major section can have subsections (H3 headings)
4. Practical tips or steps section
5. Common questions/misconceptions section
6. Conclusion with call-to-action

Your posts should:
- Be 900-1400 words (4-5 minute read)
- Use simple language anyone can understand
- Include practical, actionable advice
- Include relevant statistics when applicable
- Never make false claims or guarantee specific results
- Always be factually accurate about credit laws (FCRA, FDCPA, CROA)
- End with a soft call-to-action to learn more about Horizon Credit Repair services

Output format must be valid JSON with these exact fields:
{
  "title": "SEO-optimized title (50-60 characters ideal)",
  "excerpt": "Compelling 2-3 sentence summary for previews and meta description",
  "category": "One of: Credit Scores, Credit Reports, Credit Building, Credit Repair, Credit Cards, Debt, Identity Protection",
  "tags": ["array", "of", "5-8", "relevant", "lowercase", "keywords"],
  "readTime": "X min read",
  "content": "Full article content in Markdown format - NO H1 title, start with introduction"
}`,
        },
        {
          role: "user",
          content: `Write a comprehensive, SEO-optimized blog post about "${topic}" for our credit repair website. 

Remember: 
- DO NOT start with a # title heading - the title is shown separately
- Start directly with an engaging introduction paragraph
- Use clear section headings with ## and ###
- Make the content scannable with good visual hierarchy
- Include practical steps readers can take today

The post should help readers understand the topic thoroughly and provide actionable advice they can implement today.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 4000,
    });

    const generatedContent = completion.choices[0].message.content;
    if (!generatedContent) {
      throw new Error("No content generated from OpenAI");
    }

    const postData = JSON.parse(generatedContent);
    const slug = generateSlug(postData.title);

    // Save to database
    const newPost = await createPost({
      slug,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: "Horizon Credit Team",
      category: postData.category,
      tags: postData.tags || [topic.split(" ")[0]],
      readTime: postData.readTime || "4 min read",
      featured: false,
      published: true,
      metaTitle: postData.title,
      metaDescription: postData.excerpt,
    });

    console.log(`Blog post created successfully: ${newPost.slug}`);

    return NextResponse.json({
      success: true,
      post: {
        id: newPost.id,
        title: newPost.title,
        slug: newPost.slug,
        category: newPost.category,
        publishedAt: newPost.publishedAt,
      },
      message: "Blog post generated and published successfully",
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
    database: "PostgreSQL",
    instructions: "POST with Authorization header to generate and publish a new blog post.",
  });
}
