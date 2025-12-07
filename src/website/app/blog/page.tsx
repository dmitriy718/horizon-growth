import { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts, getCategories, getFeaturedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Credit Repair Blog | Horizon Credit Repair",
  description:
    "Expert tips, guides, and insights on credit repair, credit scores, debt management, and building better credit. Updated daily with new content.",
  keywords: [
    "credit repair blog",
    "credit score tips",
    "credit education",
    "debt management",
    "credit building",
    "credit repair advice",
  ],
};

// Force dynamic rendering since we need database access
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getPublishedPosts({ limit: 20 }),
    getCategories(),
    getFeaturedPosts(3),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Credit Repair Blog
            </h1>
            <p className="text-xl text-blue-100">
              Expert insights, tips, and guides to help you understand and improve
              your credit. New articles published daily.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className={`group ${
                        index === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      <article
                        className={`bg-gradient-to-br from-[#1E3A5F] to-[#2D4A6F] rounded-2xl p-6 text-white h-full transition-transform hover:scale-[1.02] ${
                          index === 0 ? "md:p-8" : ""
                        }`}
                      >
                        <span className="inline-block bg-white/20 text-sm px-3 py-1 rounded-full mb-3">
                          {post.category}
                        </span>
                        <h3
                          className={`font-bold mb-2 group-hover:text-blue-200 transition-colors ${
                            index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p className="text-blue-100 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-blue-200">
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Latest Articles
              </h2>
              <div className="space-y-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-medium text-[#1E3A5F] bg-blue-50 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1E3A5F] transition-colors mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                            {post.views > 0 && (
                              <>
                                <span>•</span>
                                <span>{post.views.toLocaleString()} views</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No blog posts yet. Check back soon!
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.category}
                      href={`/blog?category=${encodeURIComponent(cat.category)}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{cat.category}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D4A6F] rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Credit Tips in Your Inbox
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get weekly credit tips, score updates, and exclusive content
                  delivered to your email.
                </p>
                <Link
                  href="/signup"
                  className="block w-full text-center bg-white text-[#1E3A5F] font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Subscribe Free
                </Link>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Need Credit Help?
                </h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Our experts can help you dispute errors and improve your credit
                  score.
                </p>
                <Link
                  href="/pricing"
                  className="block w-full text-center bg-white text-emerald-600 font-medium py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
