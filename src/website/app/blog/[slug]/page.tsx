import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Tag, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost, getRecentPosts, blogPosts } from "@/lib/blog-posts";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(5).filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="rounded-full bg-white/10 px-3 py-1">{post.category}</span>
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
            <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-white/80">{post.excerpt}</p>
            <div className="mt-6 flex items-center gap-4">
              <div>
                <p className="font-medium">{post.author}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mt-8 mb-4 font-serif text-3xl font-bold">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-8 mb-4 font-serif text-2xl font-bold">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-muted-foreground">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 list-disc space-y-2 pl-6 text-muted-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 list-decimal space-y-2 pl-6 text-muted-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">{children}</strong>
                    ),
                    a: ({ href, children }) => (
                      <Link href={href || "#"} className="text-primary hover:underline">
                        {children}
                      </Link>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="mb-4 overflow-x-auto">
                        <table className="w-full border-collapse border">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border bg-slate-50 p-2 text-left font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border p-2 text-muted-foreground">{children}</td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </article>

              {/* Tags */}
              <div className="mt-8 border-t pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Share this article:</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* CTA */}
                <div className="rounded-xl bg-primary p-6 text-primary-foreground">
                  <h3 className="mb-2 font-semibold">Need Help With Your Credit?</h3>
                  <p className="mb-4 text-sm text-primary-foreground/80">
                    Our experts can help you improve your credit score. Get a free analysis today.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link href="/signup">Get Free Analysis</Link>
                  </Button>
                </div>

                {/* Recent Posts */}
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 font-semibold">Recent Articles</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        href={`/blog/${recentPost.slug}`}
                        className="group block"
                      >
                        <p className="text-sm font-medium group-hover:text-primary line-clamp-2">
                          {recentPost.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{recentPost.readTime}</p>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                  >
                    View All Articles <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Improve Your Credit?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Put what you have learned into action. Our credit experts are ready to help you
            achieve your financial goals.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

