import { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers | Join Our Team",
  description:
    "Join the Horizon Credit Repair team. We are looking for passionate people who want to help others achieve their financial goals.",
  keywords: [
    "credit repair jobs",
    "Horizon Credit careers",
    "financial services jobs",
    "Duncan SC jobs",
    "remote credit jobs",
  ],
};

const benefits = [
  { icon: DollarSign, title: "Competitive Pay", description: "Salary plus performance bonuses" },
  { icon: Heart, title: "Health Benefits", description: "Medical dental and vision coverage" },
  { icon: Clock, title: "Flexible Schedule", description: "Remote and hybrid options available" },
  { icon: TrendingUp, title: "Growth Opportunities", description: "Clear career advancement paths" },
  { icon: Users, title: "Great Team", description: "Supportive collaborative environment" },
  { icon: CheckCircle, title: "Paid Training", description: "Comprehensive onboarding program" },
];

const openPositions = [
  {
    title: "Credit Specialist",
    department: "Client Services",
    location: "Duncan SC / Remote",
    type: "Full-time",
    description:
      "Analyze credit reports identify errors and create dispute strategies for clients. Help people improve their credit scores.",
    requirements: [
      "1+ years credit repair or financial services experience",
      "Strong attention to detail",
      "Excellent communication skills",
      "Ability to explain complex topics simply",
    ],
  },
  {
    title: "Customer Success Manager",
    department: "Client Services",
    location: "Duncan SC / Remote",
    type: "Full-time",
    description:
      "Build relationships with clients guide them through the credit repair process and ensure their satisfaction.",
    requirements: [
      "2+ years customer service experience",
      "Experience in financial services preferred",
      "Problem-solving mindset",
      "Empathy and patience",
    ],
  },
  {
    title: "Sales Representative",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description:
      "Help people understand how credit repair can benefit them. Convert inquiries into happy clients.",
    requirements: [
      "1+ years sales experience",
      "Consultative selling approach",
      "Self-motivated and goal-oriented",
      "Comfortable with phone and video calls",
    ],
  },
  {
    title: "Content Writer",
    department: "Marketing",
    location: "Remote",
    type: "Part-time / Contract",
    description:
      "Create educational content about credit repair credit scores and personal finance for our blog and resources.",
    requirements: [
      "Strong writing and research skills",
      "Knowledge of credit and personal finance",
      "SEO experience preferred",
      "Ability to meet deadlines",
    ],
  },
];

const culturePoints = [
  "We genuinely care about helping people improve their financial lives",
  "We celebrate wins together both company and client successes",
  "We value work-life balance and flexibility",
  "We invest in our team members growth and development",
  "We maintain a positive supportive work environment",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Briefcase className="h-4 w-4" />
              Careers
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Join Our Growing Team
            </h1>
            <p className="text-lg text-white/80">
              Help people take control of their financial futures. We are looking for
              passionate individuals who believe in second chances.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">Why Work With Us</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-xl border bg-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Our Culture</h2>
            <div className="rounded-xl border bg-card p-8">
              <ul className="space-y-4">
                {culturePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div key={position.title} className="rounded-xl border bg-card p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{position.title}</h3>
                      <p className="text-sm text-muted-foreground">{position.department}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {position.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-muted-foreground">{position.description}</p>
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium">Requirements:</p>
                    <ul className="space-y-1">
                      {position.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild>
                    <Link href={`mailto:careers@horizoncredit.net?subject=Application: ${position.title}`}>
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
              <h2 className="mb-4 font-serif text-2xl font-bold">Do Not See Your Role?</h2>
              <p className="mb-6 text-muted-foreground">
                We are always looking for talented people. Send us your resume and tell us
                how you can contribute to our mission.
              </p>
              <Button asChild>
                <Link href="mailto:careers@horizoncredit.net">
                  Send Your Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

