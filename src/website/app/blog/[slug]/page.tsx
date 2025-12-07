import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getRecentPosts } from "@/lib/blog";

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
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
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

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/20 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-blue-200">{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-blue-200">
              <span>By {post.author}</span>
              <span>•</span>
              <time dateTime={post.publishedAt.toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.views > 0 && (
                <>
                  <span>•</span>
                  <span>{post.views.toLocaleString()} views</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              {/* Article Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-a:text-[#1E3A5F] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:marker:text-[#1E3A5F]">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Share This Article
                </h3>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    𝕏
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    f
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://horizoncredit.net/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <span className="sr-only">Share on LinkedIn</span>
                    in
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">
                Ready to Improve Your Credit?
              </h2>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Our credit repair experts can help you dispute errors and build a
                better credit score. Get started with a free consultation today.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-white text-[#1E3A5F] font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Start Free Consultation
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Recent Posts */}
              {otherPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {otherPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-[#1E3A5F] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {relatedPost.readTime}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Get Credit Tips Weekly
                </h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Subscribe to our newsletter for the latest credit repair tips
                  and strategies.
                </p>
                <Link
                  href="/signup"
                  className="block w-full text-center bg-white text-emerald-600 font-medium py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Subscribe Free
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
