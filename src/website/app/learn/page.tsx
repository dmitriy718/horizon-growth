import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  TrendingUp,
  Shield,
  Wrench,
  HelpCircle,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Credit Education Center",
  description:
    "Learn everything about credit scores, credit reports, and how to improve your financial health with our free educational resources.",
};

const categories = [
  {
    href: "/learn/fixing-credit",
    icon: Wrench,
    title: "Fixing Credit",
    description:
      "Learn strategies to repair damaged credit and remove negative items from your report.",
    articles: 12,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    href: "/learn/understanding-credit",
    icon: BookOpen,
    title: "Understanding Credit",
    description:
      "Master the fundamentals of credit scores, reports, and how the credit system works.",
    articles: 15,
    color: "bg-green-500/10 text-green-500",
  },
  {
    href: "/learn/managing-credit",
    icon: TrendingUp,
    title: "Managing Credit",
    description:
      "Best practices for maintaining good credit and managing your accounts effectively.",
    articles: 10,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    href: "/learn/rebuilding-credit",
    icon: Shield,
    title: "Rebuilding Credit",
    description:
      "Step-by-step guides for rebuilding credit after bankruptcy, foreclosure, or other setbacks.",
    articles: 8,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    href: "/learn/myths",
    icon: HelpCircle,
    title: "Common Myths",
    description:
      "Debunking popular credit myths and misconceptions that could be hurting your score.",
    articles: 6,
    color: "bg-red-500/10 text-red-500",
  },
  {
    href: "/learn/diy-vs-professional",
    icon: Users,
    title: "DIY vs Professional",
    description:
      "Compare self-help credit repair with professional services to make the right choice.",
    articles: 4,
    color: "bg-teal-500/10 text-teal-500",
  },
];

const featuredArticles = [
  {
    title: "How Credit Scores Are Calculated: The Complete Guide",
    excerpt:
      "Understanding the five factors that make up your credit score and how to optimize each one.",
    category: "Understanding Credit",
    readTime: "8 min read",
    href: "/learn/understanding-credit/how-scores-calculated",
  },
  {
    title: "The Truth About Credit Repair: What Actually Works",
    excerpt:
      "Separate fact from fiction and learn which credit repair strategies are legitimate.",
    category: "Fixing Credit",
    readTime: "12 min read",
    href: "/learn/fixing-credit/what-actually-works",
  },
  {
    title: "Your Complete Guide to Disputing Credit Report Errors",
    excerpt:
      "Step-by-step instructions for identifying and disputing errors on your credit reports.",
    category: "Fixing Credit",
    readTime: "15 min read",
    href: "/learn/fixing-credit/dispute-guide",
  },
  {
    title: "Building Credit from Scratch: A Beginner's Roadmap",
    excerpt:
      "Starting with no credit? Here's how to build a strong credit history from the ground up.",
    category: "Rebuilding Credit",
    readTime: "10 min read",
    href: "/learn/rebuilding-credit/from-scratch",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              Credit <span className="text-primary">Education</span> Center
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Free resources to help you understand, improve, and maintain your
              credit health. Knowledge is the first step to financial freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Browse by Topic
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}
                >
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  {category.articles} articles
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Featured Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">
                  {article.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              Ready to Take Action?
            </h2>
            <p className="mt-4 opacity-90">
              Learning is great, but sometimes you need expert help. Get a free
              credit analysis and see how we can help improve your score.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90"
            >
              Get Free Credit Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

