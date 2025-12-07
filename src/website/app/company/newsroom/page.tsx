import { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  Download,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Newsroom | Press & Media",
  description:
    "Latest news announcements and press releases from Horizon Credit Repair. Media inquiries welcome.",
  keywords: [
    "Horizon Credit news",
    "credit repair news",
    "press releases",
    "media inquiries",
    "company announcements",
  ],
};

const pressReleases = [
  {
    date: "December 2024",
    title: "Horizon Credit Repair Launches AI-Powered Credit Analysis",
    excerpt:
      "New technology helps clients identify credit report errors faster and more accurately than ever before.",
    featured: true,
  },
  {
    date: "November 2024",
    title: "Horizon Credit Expands Services to Include Business Credit",
    excerpt:
      "Small business owners can now access expert business credit building and repair services.",
    featured: false,
  },
  {
    date: "October 2024",
    title: "Company Celebrates Helping 50000 Americans Improve Their Credit",
    excerpt:
      "Milestone reflects company commitment to accessible credit repair services.",
    featured: false,
  },
  {
    date: "September 2024",
    title: "Horizon Credit Partners with Local Schools for Financial Literacy",
    excerpt:
      "New program brings credit education to high school students across the Upstate.",
    featured: false,
  },
  {
    date: "August 2024",
    title: "Free Credit Workshop Series Announced for Fall 2024",
    excerpt:
      "Monthly workshops will cover credit basics debt management and homebuyer preparation.",
    featured: false,
  },
];

const mediaFeatures = [
  {
    outlet: "Greenville Business Magazine",
    title: "Local Credit Repair Company Making a Difference",
    date: "November 2024",
  },
  {
    outlet: "Upstate Business Journal",
    title: "Fintech Meets Personal Service at Horizon Credit",
    date: "October 2024",
  },
  {
    outlet: "WSPA News",
    title: "Credit Repair Company Helps Hurricane Victims",
    date: "September 2024",
  },
];

const companyFacts = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Duncan SC" },
  { label: "Clients Helped", value: "50000+" },
  { label: "Average Score Increase", value: "53 points" },
  { label: "Team Members", value: "25+" },
  { label: "States Served", value: "All 50" },
];

export default function NewsroomPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Newspaper className="h-4 w-4" />
              Newsroom
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Press & Media
            </h1>
            <p className="text-lg text-white/80">
              The latest news announcements and press releases from Horizon Credit Repair.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div
                  key={release.title}
                  className={`rounded-xl border bg-card p-6 ${
                    release.featured ? "border-primary" : ""
                  }`}
                >
                  {release.featured && (
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      Featured
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {release.date}
                  </div>
                  <h3 className="mb-2 mt-2 text-lg font-semibold">{release.title}</h3>
                  <p className="text-muted-foreground">{release.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Media Coverage</h2>
            <div className="space-y-4">
              {mediaFeatures.map((feature) => (
                <div key={feature.title} className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-medium text-primary">{feature.outlet}</p>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Company Facts</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {companyFacts.map((fact) => (
                <div key={fact.label} className="rounded-xl border bg-card p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{fact.value}</p>
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl border bg-card p-8 text-center">
              <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 font-serif text-2xl font-bold">Media Inquiries</h2>
              <p className="mb-6 text-muted-foreground">
                For press inquiries interviews or additional information please contact our
                media relations team.
              </p>
              <p className="mb-2 font-medium">Email: press@horizoncredit.net</p>
              <p className="text-muted-foreground">Phone: (864) 237-5511</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


