import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts } from "@/lib/blog";
import { ArticleContent } from "./article-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { RelatedContent } from "@/components/blog/related-content";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Horizon Credit Repair",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Horizon Credit Repair Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      images: post.ogImage ? [post.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Force dynamic rendering since we need database access
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(5),
  ]);

  if (!post) {
    notFound();
  }

  // Filter out current post from recent posts
  const otherPosts = recentPosts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with link back to main site */}
      <BlogHeader />

      {/* Hero Section with Clear Title */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors text-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Category & Read Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="text-blue-200 text-sm">{post.readTime}</span>
            </div>

            {/* Main Title - Large and Clear */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt/Summary */}
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-4 text-blue-200 text-sm border-t border-white/20 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-semibold">H</span>
                </div>
                <span className="font-medium text-white">{post.author}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.views > 0 && (
                <>
                  <span className="hidden sm:block">•</span>
                  <span>{post.views.toLocaleString()} views</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 lg:p-16">
              {/* Article Content with Custom Styling */}
              <ArticleContent content={post.content} />

              {/* Tags Section */}
              {post.tags.length > 0 && (
                <div className="mt-16 pt-8 border-t-2 border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-10 pt-8 border-t-2 border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Share This Article
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full hover:bg-slate-900 hover:text-white transition-all font-bold"
                    title="Share on Twitter"
                  >
                    𝕏
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-all font-bold"
                    title="Share on Facebook"
                  >
                    f
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full hover:bg-blue-700 hover:text-white transition-all font-bold"
                    title="Share on LinkedIn"
                  >
                    in
                  </a>
                </div>
              </div>
            </div>

            {/* Related Content with Smart CTAs */}
            <div className="mt-10">
              <RelatedContent
                currentPostId={post.id}
                tags={post.tags}
                category={post.category}
                limit={4}
              />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Recent Posts */}
              {otherPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                    Related Articles
                  </h3>
                  <div className="space-y-5">
                    {otherPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#1E3A5F] transition-colors line-clamp-2 leading-snug">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2">
                          {relatedPost.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <NewsletterSignup 
                variant="sidebar"
                title="Get Credit Tips Weekly"
                description="Subscribe to our newsletter for the latest credit repair tips and strategies."
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
