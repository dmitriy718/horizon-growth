"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string | null;
}

interface RelatedContentProps {
  currentPostId: string;
  tags: string[];
  category: string;
  limit?: number;
}

// Smart CTAs based on keywords/category
const keywordCTAs: Record<string, { headline: string; cta: string; link: string }> = {
  "credit card": {
    headline: "Struggling with credit card debt?",
    cta: "Raise your score & get better rates →",
    link: "/signup?ref=creditcard",
  },
  "credit cards": {
    headline: "Struggling with credit card debt?",
    cta: "Raise your score & get better rates →",
    link: "/signup?ref=creditcard",
  },
  "credit score": {
    headline: "Want to boost your score fast?",
    cta: "Get your free credit analysis →",
    link: "/signup?ref=score",
  },
  "collections": {
    headline: "Collections hurting your credit?",
    cta: "We can help remove them →",
    link: "/signup?ref=collections",
  },
  "debt": {
    headline: "Drowning in debt?",
    cta: "Fix your credit, pay less interest →",
    link: "/signup?ref=debt",
  },
  "dispute": {
    headline: "Need help disputing errors?",
    cta: "Let our experts handle it →",
    link: "/signup?ref=dispute",
  },
  "mortgage": {
    headline: "Dreaming of homeownership?",
    cta: "Improve your score for better rates →",
    link: "/signup?ref=mortgage",
  },
  "auto loan": {
    headline: "Need a better car loan rate?",
    cta: "Higher score = lower payments →",
    link: "/signup?ref=auto",
  },
  "bankruptcy": {
    headline: "Life after bankruptcy?",
    cta: "We help you rebuild →",
    link: "/signup?ref=bankruptcy",
  },
  "identity theft": {
    headline: "Been a victim of identity theft?",
    cta: "We'll help restore your credit →",
    link: "/services/identity-theft",
  },
  default: {
    headline: "Ready to take control of your credit?",
    cta: "Start your free consultation →",
    link: "/signup",
  },
};

function getSmartCTA(tags: string[], category: string) {
  // Check tags first for specific CTAs
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    for (const [keyword, cta] of Object.entries(keywordCTAs)) {
      if (lowerTag.includes(keyword) || keyword.includes(lowerTag)) {
        return cta;
      }
    }
  }

  // Fall back to category-based CTA
  const categoryLower = category.toLowerCase();
  for (const [keyword, cta] of Object.entries(keywordCTAs)) {
    if (categoryLower.includes(keyword)) {
      return cta;
    }
  }

  return keywordCTAs.default;
}

export function RelatedContent({
  currentPostId,
  tags,
  category,
  limit = 4,
}: RelatedContentProps) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const smartCTA = getSmartCTA(tags, category);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const response = await fetch(
          `/api/blog/related?postId=${currentPostId}&tags=${tags.join(",")}&category=${category}&limit=${limit}`
        );
        const data = await response.json();
        setRelatedPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching related content:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelated();
  }, [currentPostId, tags, category, limit]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-2xl p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8">
      {/* Smart CTA Banner */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A6F] rounded-xl p-6 mb-8 text-white">
        <h3 className="text-xl font-bold mb-2">{smartCTA.headline}</h3>
        <Link
          href={smartCTA.link}
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          {smartCTA.cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Related Articles You Might Like
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow group"
              >
                <span className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
                  {post.category}
                </span>
                <h4 className="font-medium text-gray-900 mt-1 group-hover:text-[#1E3A5F] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                {post.readTime && (
                  <span className="text-xs text-gray-400 mt-2 block">
                    {post.readTime}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Browse by Category */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          Explore More Topics
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            "Credit Scores",
            "Credit Repair",
            "Credit Cards",
            "Debt",
            "Credit Building",
          ].map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

