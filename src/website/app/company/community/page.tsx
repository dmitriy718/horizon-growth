import { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Users,
  GraduationCap,
  Home,
  DollarSign,
  Calendar,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Community Outreach | Giving Back",
  description:
    "Horizon Credit Repair is committed to financial literacy and community support. Learn about our outreach programs and how we give back.",
  keywords: [
    "community outreach",
    "financial literacy",
    "credit education",
    "nonprofit partnerships",
    "giving back",
  ],
};

const initiatives = [
  {
    icon: GraduationCap,
    title: "Financial Literacy Workshops",
    description:
      "Free monthly workshops teaching credit basics budgeting and financial planning to community members.",
    impact: "500+ attendees in 2024",
  },
  {
    icon: Home,
    title: "First-Time Homebuyer Program",
    description:
      "Partnering with local housing organizations to help families prepare their credit for homeownership.",
    impact: "75 families helped in 2024",
  },
  {
    icon: Users,
    title: "Youth Financial Education",
    description:
      "Working with high schools to teach teenagers about credit building before they enter adulthood.",
    impact: "12 schools reached",
  },
  {
    icon: DollarSign,
    title: "Pro Bono Services",
    description:
      "Providing free credit repair services to qualifying low-income families and veterans.",
    impact: "100+ families served annually",
  },
];

const partners = [
  { name: "United Way of the Piedmont", type: "Nonprofit Partner" },
  { name: "Habitat for Humanity Greenville", type: "Housing Partner" },
  { name: "SC Works Upstate", type: "Employment Partner" },
  { name: "Spartanburg Community College", type: "Education Partner" },
];

const upcomingEvents = [
  {
    title: "Credit 101 Workshop",
    date: "First Saturday of each month",
    location: "Horizon Credit Office - Duncan SC",
    description: "Free introduction to credit scores and credit reports",
  },
  {
    title: "Homebuyer Readiness Seminar",
    date: "Third Thursday of each month",
    location: "Virtual via Zoom",
    description: "Preparing your credit for mortgage approval",
  },
  {
    title: "Veterans Financial Wellness Day",
    date: "November 11th annually",
    location: "VFW Post 9273",
    description: "Free credit reviews and financial planning for veterans",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Heart className="h-4 w-4" />
              Community Outreach
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Giving Back to Our Community
            </h1>
            <p className="text-lg text-white/80">
              At Horizon Credit Repair we believe everyone deserves access to financial
              education and the opportunity to build a better future. That is why we
              dedicate time and resources to community outreach.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Our Initiatives</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {initiatives.map((initiative) => (
                <div key={initiative.title} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <initiative.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{initiative.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{initiative.description}</p>
                  <p className="text-sm font-medium text-primary">{initiative.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Community Partners</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {partners.map((partner) => (
                <div key={partner.name} className="rounded-xl border bg-card p-4">
                  <p className="font-semibold">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">{partner.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.title} className="rounded-xl border bg-card p-6">
                  <div className="flex flex-wrap gap-4 md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Want to Partner With Us?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            We are always looking for organizations schools and businesses to partner with
            on financial literacy initiatives. Let us work together to empower our community.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


