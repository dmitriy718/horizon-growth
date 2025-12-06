import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, getFeaturedPosts, getCategories } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Credit Repair Blog | Expert Tips & Guides",
  description:
    "Expert credit repair tips, guides, and strategies from Horizon Credit Repair. Learn how to improve your credit score, dispute errors, and achieve financial success.",
  keywords: [
    "credit repair blog",
    "credit tips",
    "credit score advice",
    "credit improvement",
    "credit education",
    "credit repair guides",
  ],
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const categories = getCategories();
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <BookOpen className="h-4 w-4" />
              Credit Education Blog
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Expert Credit Tips & Guides
            </h1>
            <p className="text-lg text-white/80">
              Learn from our credit experts. Discover strategies to improve your credit score,
              dispute errors, and achieve your financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Categories:</span>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full bg-white px-3 py-1 text-sm hover:bg-primary hover:text-white"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-serif text-2xl font-bold">All Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mb-2 font-semibold group-hover:text-primary line-clamp-2">
                  {post.title}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center text-primary">
                    Read <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Get Credit Tips in Your Inbox
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Subscribe to our newsletter for weekly credit tips, industry news, and exclusive
            guides to help you on your credit journey.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-2 text-foreground"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

