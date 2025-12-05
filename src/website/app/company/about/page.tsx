import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Award, Target, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Horizon Credit Repair - our mission, values, and commitment to helping you achieve financial freedom.",
};

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We understand that credit struggles can be stressful. We approach every client with empathy and without judgment.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with complete transparency and follow all laws including CROA and FCRA. We never make promises we can't keep.",
  },
  {
    icon: Target,
    title: "Results-Focused",
    description:
      "We're committed to achieving real, measurable results for our clients. Your success is our success.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We leverage cutting-edge AI technology to analyze credit reports and optimize dispute strategies for better outcomes.",
  },
];

const stats = [
  { value: "50,000+", label: "Clients Served" },
  { value: "4.9★", label: "Average Rating" },
  { value: "2024", label: "Founded" },
  { value: "100%", label: "CROA Compliant" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              About <span className="text-primary">Horizon</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We're on a mission to help every American achieve their financial
              goals by removing inaccurate information from their credit reports.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold">Our Story</h2>
            <div className="mt-8 space-y-6 text-muted-foreground">
              <p>
                Horizon Credit Repair was founded with a simple belief: everyone
                deserves accurate credit reporting. We saw too many people
                struggling with errors on their credit reports that were holding
                them back from achieving their dreams—buying homes, starting
                businesses, and providing for their families.
              </p>
              <p>
                Studies show that approximately 80% of credit reports contain
                errors. These mistakes can cost consumers thousands of dollars in
                higher interest rates and can even prevent them from qualifying
                for loans altogether. That's not fair, and we're here to fix it.
              </p>
              <p>
                Based in {siteConfig.contact.address.city},{" "}
                {siteConfig.contact.address.state}, Horizon combines expert
                knowledge of credit law with cutting-edge AI technology to
                identify and dispute inaccurate items on your credit report. We've
                helped over 50,000 clients improve their credit scores and take
                control of their financial futures.
              </p>
              <p>
                We're not a law firm, and we don't make unrealistic promises.
                What we do is work diligently, ethically, and effectively to
                ensure your credit report accurately reflects your credit
                history. When inaccurate items are removed, your score naturally
                improves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Our Values
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold">
            Our Commitment
          </h2>
          <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">CROA Compliant</h3>
                <p className="text-sm text-muted-foreground">
                  Credit Repair Organizations Act
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>
                Horizon Credit Repair operates in full compliance with the Credit
                Repair Organizations Act (CROA) and all applicable state and
                federal laws. This means:
              </p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  We provide a written contract detailing services and your
                  cancellation rights
                </li>
                <li>We don't charge upfront fees before services are rendered</li>
                <li>
                  We never advise you to dispute accurate information or create a
                  new credit identity
                </li>
                <li>
                  We clearly explain what you can do yourself for free
                </li>
                <li>
                  You have the right to cancel within 3 days without any charge
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold">Get in Touch</h2>
            <p className="mt-4 text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-card p-6">
                <h3 className="font-semibold">Address</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {siteConfig.contact.address.street}
                  <br />
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.state}{" "}
                  {siteConfig.contact.address.zip}
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <h3 className="font-semibold">Phone</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a
                    href={`tel:${siteConfig.contact.phone.raw}`}
                    className="text-primary hover:underline"
                  >
                    {siteConfig.contact.phone.display}
                  </a>
                </p>
              </div>
              <div className="rounded-lg bg-card p-6">
                <h3 className="font-semibold">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${siteConfig.contact.email.support}`}
                    className="text-primary hover:underline"
                  >
                    {siteConfig.contact.email.support}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Join thousands of satisfied clients who've improved their credit
              with Horizon.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link href="/signup">
                Get Your Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

