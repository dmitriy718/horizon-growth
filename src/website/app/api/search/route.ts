import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();
    const type = searchParams.get("type") || "all"; // all, blog, pages
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!query || query.length < 2) {
      return NextResponse.json({
        results: [],
        total: 0,
        message: "Please enter at least 2 characters",
      });
    }

    const results: SearchResult[] = [];

    // Search blog posts
    if (type === "all" || type === "blog") {
      const blogPosts = await prisma.blogPost.findMany({
        where: {
          publishedAt: { lte: new Date() },
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
            { tags: { has: query.toLowerCase() } },
            { category: { contains: query, mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          readTime: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: "desc" },
        take: limit,
      });

      blogPosts.forEach((post) => {
        results.push({
          type: "blog",
          id: post.id,
          title: post.title,
          description: post.excerpt,
          url: `/blog/${post.slug}`,
          category: post.category,
          meta: {
            readTime: post.readTime,
            date: post.publishedAt.toISOString(),
          },
        });
      });
    }

    // Search static pages (predefined for now)
    if (type === "all" || type === "pages") {
      const staticPages = getStaticPages();
      const matchingPages = staticPages.filter(
        (page) =>
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase()) ||
          page.keywords.some((k) =>
            k.toLowerCase().includes(query.toLowerCase())
          )
      );

      matchingPages.slice(0, limit).forEach((page) => {
        results.push({
          type: "page",
          id: page.url,
          title: page.title,
          description: page.description,
          url: page.url,
          category: page.category,
        });
      });
    }

    // Sort by relevance (title matches first, then description)
    results.sort((a, b) => {
      const aScore = getRelevanceScore(a, query);
      const bScore = getRelevanceScore(b, query);
      return bScore - aScore;
    });

    return NextResponse.json({
      results: results.slice(0, limit),
      total: results.length,
      query,
    });
  } catch (error) {
    console.error("[Search] Error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}

interface SearchResult {
  type: "blog" | "page";
  id: string;
  title: string;
  description: string;
  url: string;
  category?: string;
  meta?: {
    readTime?: string | null;
    date?: string;
  };
}

function getRelevanceScore(result: SearchResult, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();

  // Title exact match
  if (result.title.toLowerCase() === lowerQuery) score += 100;
  // Title starts with query
  else if (result.title.toLowerCase().startsWith(lowerQuery)) score += 50;
  // Title contains query
  else if (result.title.toLowerCase().includes(lowerQuery)) score += 25;

  // Description contains query
  if (result.description.toLowerCase().includes(lowerQuery)) score += 10;

  // Boost blog posts slightly (more dynamic content)
  if (result.type === "blog") score += 5;

  return score;
}

// Static pages for search indexing
function getStaticPages() {
  return [
    {
      title: "Credit Repair Services",
      description: "Professional credit repair services to help you fix errors and improve your score",
      url: "/services/credit-repair",
      category: "Services",
      keywords: ["credit repair", "fix credit", "improve score", "dispute"],
    },
    {
      title: "Identity Theft Recovery",
      description: "Comprehensive identity theft recovery and protection services",
      url: "/services/identity-theft",
      category: "Services",
      keywords: ["identity theft", "fraud", "protection", "recovery"],
    },
    {
      title: "Business Credit Building",
      description: "Build strong business credit to grow your company",
      url: "/services/business-credit",
      category: "Services",
      keywords: ["business credit", "commercial credit", "business loans"],
    },
    {
      title: "Pricing Plans",
      description: "Affordable credit repair plans starting at $79.99/month",
      url: "/pricing",
      category: "Services",
      keywords: ["pricing", "cost", "plans", "subscription", "monthly"],
    },
    {
      title: "How Credit Repair Works",
      description: "Learn our proven 4-step credit repair process",
      url: "/how-it-works",
      category: "Education",
      keywords: ["process", "how it works", "steps", "method"],
    },
    {
      title: "Fixing Your Credit",
      description: "Learn how to fix errors on your credit report",
      url: "/learn/fixing-credit",
      category: "Education",
      keywords: ["fix credit", "repair", "errors", "disputes"],
    },
    {
      title: "Understanding Credit Scores",
      description: "Everything you need to know about credit scores",
      url: "/learn/understanding-credit",
      category: "Education",
      keywords: ["credit score", "FICO", "VantageScore", "factors"],
    },
    {
      title: "Managing Your Credit",
      description: "Best practices for managing and maintaining good credit",
      url: "/learn/managing-credit",
      category: "Education",
      keywords: ["manage credit", "credit cards", "utilization", "payments"],
    },
    {
      title: "Rebuilding Credit",
      description: "Strategies to rebuild your credit after setbacks",
      url: "/learn/rebuilding-credit",
      category: "Education",
      keywords: ["rebuild credit", "bankruptcy", "collections", "fresh start"],
    },
    {
      title: "Credit Myths Debunked",
      description: "Common credit myths and the truth behind them",
      url: "/learn/myths",
      category: "Education",
      keywords: ["myths", "misconceptions", "facts", "truth"],
    },
    {
      title: "DIY vs Professional Credit Repair",
      description: "Compare doing it yourself vs hiring professionals",
      url: "/learn/diy-vs-professional",
      category: "Education",
      keywords: ["DIY", "professional", "compare", "self repair"],
    },
    {
      title: "Credit Glossary",
      description: "Complete glossary of credit-related terms and definitions",
      url: "/glossary",
      category: "Resources",
      keywords: ["glossary", "terms", "definitions", "vocabulary"],
    },
    {
      title: "Frequently Asked Questions",
      description: "Answers to common questions about credit repair",
      url: "/faq",
      category: "Resources",
      keywords: ["FAQ", "questions", "answers", "help"],
    },
    {
      title: "About Horizon Credit Repair",
      description: "Learn about our company and mission",
      url: "/company/about",
      category: "Company",
      keywords: ["about", "company", "team", "history"],
    },
    {
      title: "Contact Us",
      description: "Get in touch with our credit repair experts",
      url: "/contact",
      category: "Company",
      keywords: ["contact", "phone", "email", "support", "help"],
    },
    {
      title: "Careers",
      description: "Join our team and help people achieve financial freedom",
      url: "/careers",
      category: "Company",
      keywords: ["careers", "jobs", "employment", "work"],
    },
  ];
}

