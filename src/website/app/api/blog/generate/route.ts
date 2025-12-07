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

Your posts should:
- Be educational and actionable with specific steps readers can take
- Use simple language that anyone can understand
- Include practical tips and real examples
- Be 900-1400 words (4-5 minute read)
- Have a clear structure with H2 and H3 headings
- Include SEO-friendly keywords naturally throughout
- End with a soft call-to-action encouraging readers to learn more about Horizon Credit Repair services
- Never make false claims or guarantee specific results
- Always be factually accurate about credit laws (FCRA, FDCPA, CROA)
- Include relevant statistics when applicable
- Address common questions readers might have

Output format must be valid JSON with these exact fields:
{
  "title": "SEO-optimized title (50-60 characters ideal)",
  "excerpt": "Compelling 2-3 sentence summary for previews and meta description",
  "category": "One of: Credit Scores, Credit Reports, Credit Building, Credit Repair, Credit Cards, Debt, Identity Protection",
  "tags": ["array", "of", "5-8", "relevant", "lowercase", "keywords"],
  "readTime": "X min read",
  "content": "Full article content in Markdown format with proper headings"
}`,
        },
        {
          role: "user",
          content: `Write a comprehensive, SEO-optimized blog post about "${topic}" for our credit repair website. The post should help readers understand the topic thoroughly and provide actionable advice they can implement today. Make sure it's unique, valuable content that demonstrates expertise and could rank well in search engines.`,
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
