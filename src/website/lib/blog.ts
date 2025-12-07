import prisma from "./prisma";
import type { BlogPost } from "@prisma/client";

export type { BlogPost };

export interface CreateBlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  category: string;
  tags: string[];
  readTime?: string;
  featured?: boolean;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

// Get all published blog posts
export async function getPublishedPosts(options?: {
  limit?: number;
  offset?: number;
  category?: string;
}): Promise<BlogPost[]> {
  const { limit = 50, offset = 0, category } = options || {};

  return prisma.blogPost.findMany({
    where: {
      published: true,
      ...(category && { category }),
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
    skip: offset,
  });
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
}

// Get featured posts
export async function getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Get recent posts
export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Get posts by category
export async function getPostsByCategory(
  category: string,
  limit: number = 20
): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      category,
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Get all categories with post counts
export async function getCategories(): Promise<
  { category: string; count: number }[]
> {
  const results = await prisma.blogPost.groupBy({
    by: ["category"],
    where: { published: true },
    _count: { category: true },
    orderBy: { _count: { category: "desc" } },
  });

  return results.map((r) => ({
    category: r.category,
    count: r._count.category,
  }));
}

// Search posts
export async function searchPosts(
  query: string,
  limit: number = 20
): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { excerpt: { contains: query, mode: "insensitive" } },
        { content: { contains: query, mode: "insensitive" } },
        { tags: { has: query.toLowerCase() } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

// Create a new blog post
export async function createPost(data: CreateBlogPostInput): Promise<BlogPost> {
  // Check if slug already exists
  const existing = await prisma.blogPost.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    // Append timestamp to make slug unique
    data.slug = `${data.slug}-${Date.now()}`;
  }

  return prisma.blogPost.create({
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author || "Horizon Credit Team",
      category: data.category,
      tags: data.tags,
      readTime: data.readTime || "4 min read",
      featured: data.featured || false,
      published: data.published ?? true,
      metaTitle: data.metaTitle || data.title,
      metaDescription: data.metaDescription || data.excerpt,
      ogImage: data.ogImage,
    },
  });
}

// Update a blog post
export async function updatePost(
  id: string,
  data: Partial<CreateBlogPostInput>
): Promise<BlogPost> {
  return prisma.blogPost.update({
    where: { id },
    data,
  });
}

// Delete a blog post
export async function deletePost(id: string): Promise<void> {
  await prisma.blogPost.delete({
    where: { id },
  });
}

// Increment view count
export async function incrementViews(slug: string): Promise<void> {
  await prisma.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });
}

// Get post count
export async function getPostCount(): Promise<number> {
  return prisma.blogPost.count({
    where: { published: true },
  });
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { tags: true },
  });

  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));

  return Array.from(tagSet).sort();
}

