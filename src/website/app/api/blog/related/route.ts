import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const tagsParam = searchParams.get("tags");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "4");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const tags = tagsParam ? tagsParam.split(",").filter(Boolean) : [];

    // Find related posts based on:
    // 1. Same category (highest priority)
    // 2. Shared tags
    // 3. Recent posts (fallback)

    // Build OR conditions
    const orConditions = [];
    if (category) {
      orConditions.push({ category: category });
    }
    if (tags.length > 0) {
      orConditions.push({ tags: { hasSome: tags } });
    }

    // Strategy: Get posts that share tags or category, excluding current post
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: postId },
        publishedAt: { lte: new Date() },
        ...(orConditions.length > 0 ? { OR: orConditions } : {}),
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        readTime: true,
        tags: true,
        publishedAt: true,
      },
      orderBy: [{ publishedAt: "desc" }],
      take: limit * 3, // Get more to score and sort
    });

    // Score posts by relevance
    const scoredPosts = relatedPosts.map((post) => {
      let score = 0;

      // Same category = +10 points
      if (post.category === category) {
        score += 10;
      }

      // Each shared tag = +5 points
      const sharedTags = post.tags.filter((tag) =>
        tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
      score += sharedTags.length * 5;

      // Recency bonus (newer = higher score)
      const daysSincePublished = Math.floor(
        (Date.now() - post.publishedAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSincePublished < 7) score += 3;
      else if (daysSincePublished < 30) score += 2;
      else if (daysSincePublished < 90) score += 1;

      return { post, score };
    });

    // Sort by score and take the limit
    const topRelated: RelatedPost[] = scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ post }) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        readTime: post.readTime,
      }));

    // If we don't have enough related posts, fill with recent posts
    if (topRelated.length < limit) {
      const existingIds = new Set(topRelated.map((p) => p.id));
      existingIds.add(postId);

      const additionalPosts = await prisma.blogPost.findMany({
        where: {
          id: { notIn: Array.from(existingIds) },
          publishedAt: { lte: new Date() },
        },
        select: {
          id: true,
          slug: true,
          title: true,
          excerpt: true,
          category: true,
          readTime: true,
        },
        orderBy: { publishedAt: "desc" },
        take: limit - topRelated.length,
      });

      topRelated.push(...additionalPosts);
    }

    return NextResponse.json({
      posts: topRelated,
      count: topRelated.length,
    });
  } catch (error) {
    console.error("[Related Content] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch related content" },
      { status: 500 }
    );
  }
}
