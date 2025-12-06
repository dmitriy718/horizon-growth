import { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  Scale,
  Clock,
  DollarSign,
  ArrowRight,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "DIY Credit Repair vs Professional Help | Which Is Right for You",
  description:
    "Compare DIY credit repair with professional credit repair services. Learn the pros and cons of each approach to decide what is best for your situation.",
  keywords: [
    "DIY credit repair",
    "professional credit repair",
    "credit repair comparison",
    "credit repair cost",
    "should I hire credit repair",
    "credit repair options",
  ],
};

const diyPros = [
  "Free - no cost other than your time",
  "You learn about credit in the process",
  "Full control over your disputes",
  "No risk of scam companies",
  "Can start immediately",
];

const diyCons = [
  "Time consuming - hours of research and letter writing",
  "Steep learning curve",
  "Generic disputes often get dismissed",
  "May miss strategies professionals know",
  "No expertise in consumer credit law",
  "Easy to make mistakes that delay progress",
];

const proPros = [
  "Expertise in credit law and dispute strategies",
  "Time savings - they handle everything",
  "Often better success rates with proven methods",
  "Knowledge of bureau procedures and loopholes",
  "Ongoing monitoring and follow up",
  "Can escalate to legal action if needed",
];

const proCons = [
  "Monthly cost (typically $79-$150)",
  "Some companies are scams",
  "Results not guaranteed",
  "Less personal control",
  "Need to research and vet companies",
];

const comparisonTable = [
  { factor: "Cost", diy: "Free (just your time)", pro: "$79-$150/month" },
  { factor: "Time Investment", diy: "10-20 hours/month", pro: "Minimal" },
  { factor: "Learning Curve", diy: "Significant", pro: "None" },
  { factor: "Success Rate", diy: "Varies widely", pro: "Generally higher" },
  { factor: "Expertise Level", diy: "Self taught", pro: "Professional" },
  { factor: "Legal Knowledge", diy: "Limited", pro: "Extensive" },
  { factor: "Speed of Results", diy: "Often slower", pro: "Often faster" },
];

const diyBestFor = [
  "Simple errors like wrong address or name spelling",
  "One or two items to dispute",
  "Plenty of time to dedicate to the process",
  "Enjoy learning and research",
  "Tight budget",
  "Good organizational skills",
];

const proBestFor = [
  "Multiple negative items across bureaus",
  "Complex situations like identity theft",
  "Limited time due to work or family",
  "Want faster results",
  "Previous DIY attempts were unsuccessful",
  "Collections from multiple creditors",
  "Need help understanding credit laws",
];

const diySteps = [
  {
    step: 1,
    title: "Get Your Reports",
    description: "Request free reports from AnnualCreditReport.com",
  },
  {
    step: 2,
    title: "Review Carefully",
    description: "Go through each report line by line looking for errors",
  },
  {
    step: 3,
    title: "Gather Evidence",
    description: "Collect documentation supporting your disputes",
  },
  {
    step: 4,
    title: "Write Dispute Letters",
    description: "Create specific detailed letters for each error",
  },
  {
    step: 5,
    title: "Send via Certified Mail",
    description: "Mail disputes with return receipt requested",
  },
  {
    step: 6,
    title: "Track and Follow Up",
    description: "Monitor responses and escalate if needed",
  },
];

export default function DIYvsProfessionalPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/learn"
              className="mb-4 inline-flex items-center text-sm text-white/70 hover:text-white"
            >
              ← Back to Credit Education
            </Link>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              DIY vs Professional Credit Repair
            </h1>
            <p className="text-lg text-white/80">
              Should you repair your credit yourself or hire professionals? Here is an honest
              comparison to help you decide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <p>
              The truth is you have the legal right to dispute errors on your credit report
              yourself completely free of charge. The Fair Credit Reporting Act gives every
              consumer this right. So why do credit repair companies exist?
            </p>
            <p>
              The answer is expertise time and results. While you can do it yourself
              professional services bring knowledge of credit law proven dispute strategies
              and the time to handle everything on your behalf. Let us break down the pros
              and cons of each approach.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold">DIY Credit Repair</h2>
                </div>
                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                    <CheckCircle className="h-5 w-5" /> Pros
                  </h3>
                  <ul className="space-y-2">
                    {diyPros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700">
                    <XCircle className="h-5 w-5" /> Cons
                  </h3>
                  <ul className="space-y-2">
                    {diyCons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Professional Help</h2>
                </div>
                <div className="mb-6">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                    <CheckCircle className="h-5 w-5" /> Pros
                  </h3>
                  <ul className="space-y-2">
                    {proPros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-700">
                    <XCircle className="h-5 w-5" /> Cons
                  </h3>
                  <ul className="space-y-2">
                    {proCons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">Side by Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl border">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left font-semibold">Factor</th>
                    <th className="p-4 text-left font-semibold">DIY</th>
                    <th className="p-4 text-left font-semibold">Professional</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.factor} className="border-t">
                      <td className="p-4 font-medium">{row.factor}</td>
                      <td className="p-4 text-muted-foreground">{row.diy}</td>
                      <td className="p-4 text-muted-foreground">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Which Is Right for You?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">DIY Is Best If You Have</h3>
                <ul className="space-y-2">
                  {diyBestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 font-semibold">Professional Help Is Best If You Have</h3>
                <ul className="space-y-2">
                  {proBestFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-serif text-3xl font-bold">If You Choose DIY</h2>
            <p className="mb-8 text-muted-foreground">
              Here are the basic steps you will need to follow:
            </p>
            <div className="space-y-4">
              {diySteps.map((item) => (
                <div key={item.step} className="flex gap-4 rounded-xl border bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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
            Want Professional Help?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Our team of credit experts is ready to handle your credit repair with proven
            strategies and personal attention. Get started with a free consultation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Get Professional Help
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

