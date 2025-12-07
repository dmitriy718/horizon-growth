import { PrismaClient } from "@prisma/client";
import { blogPosts } from "../lib/blog-posts";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting blog post seed...");

  // Clear existing posts if needed
  const existingCount = await prisma.blogPost.count();
  console.log(`Found ${existingCount} existing blog posts`);

  // Insert posts from static file
  let inserted = 0;
  let skipped = 0;

  for (const post of blogPosts) {
    // Check if post with this slug already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    if (existing) {
      console.log(`Skipping existing post: ${post.slug}`);
      skipped++;
      continue;
    }

    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: post.tags,
        readTime: post.readTime,
        featured: post.featured || false,
        published: true,
        publishedAt: new Date(post.date),
        metaTitle: post.title,
        metaDescription: post.excerpt,
      },
    });

    console.log(`Inserted: ${post.slug}`);
    inserted++;
  }

  console.log(`\nSeed complete!`);
  console.log(`Inserted: ${inserted} posts`);
  console.log(`Skipped: ${skipped} posts`);
  console.log(`Total posts in database: ${await prisma.blogPost.count()}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

