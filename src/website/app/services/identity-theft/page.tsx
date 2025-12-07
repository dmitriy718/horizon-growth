import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  Lock,
  Eye,
  UserX,
  CreditCard,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Identity Theft Recovery Services",
  description:
    "Expert identity theft recovery services. We help victims restore their credit, dispute fraudulent accounts, and protect their financial future. Available 24/7.",
  keywords: [
    "identity theft recovery",
    "identity theft help",
    "fraud victim assistance",
    "credit fraud repair",
    "identity restoration",
    "stolen identity help",
  ],
};

const warningSignss = [
  {
    icon: CreditCard,
    title: "Unfamiliar Accounts",
    description: "Credit cards or loans you didn't open appearing on your credit report",
  },
  {
    icon: FileText,
    title: "Strange Bills",
    description: "Receiving bills for services or products you never purchased",
  },
  {
    icon: AlertTriangle,
    title: "Collection Calls",
    description: "Debt collectors contacting you about debts you don't recognize",
  },
  {
    icon: UserX,
    title: "Denied Credit",
    description: "Being unexpectedly denied for credit, loans, or services",
  },
  {
    icon: Eye,
    title: "Missing Mail",
    description: "Expected financial statements or bills not arriving",
  },
  {
    icon: Lock,
    title: "IRS Notices",
    description: "Tax return issues or notices about income you didn't earn",
  },
];

const recoverySteps = [
  {
    step: 1,
    title: "Fraud Alert Placement",
    description:
      "We immediately place fraud alerts with all three credit bureaus, making it harder for thieves to open new accounts in your name.",
  },
  {
    step: 2,
    title: "Credit Report Analysis",
    description:
      "Our experts thoroughly analyze your credit reports from Experian, Equifax, and TransUnion to identify all fraudulent activity.",
  },
  {
    step: 3,
    title: "Dispute Filing",
    description:
      "We prepare and file disputes with credit bureaus and creditors for every fraudulent account, following FCRA guidelines.",
  },
  {
    step: 4,
    title: "Documentation Support",
    description:
      "We help you file an Identity Theft Report with the FTC and assist with police reports if needed.",
  },
  {
    step: 5,
    title: "Creditor Communication",
    description:
      "We contact creditors directly to report fraud and request account closure and removal from your credit report.",
  },
  {
    step: 6,
    title: "Ongoing Monitoring",
    description:
      "Continuous monitoring of your credit to catch any new fraudulent activity and ensure removed items stay off.",
  },
];

const stats = [
  { value: "1.4M", label: "Identity theft reports in 2023 (FTC)" },
  { value: "$10.2B", label: "Total losses to identity theft" },
  { value: "33%", label: "Victims experience repeat fraud" },
  { value: "6+ months", label: "Average recovery time without help" },
];

export default function IdentityTheftPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-slate-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-sm">
              <Shield className="h-4 w-4" />
              Identity Theft Recovery Specialists
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Victim of Identity Theft?
              <span className="block text-red-300">We're Here to Help.</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300 md:text-xl">
              Identity theft can be devastating. Our expert team specializes in helping
              victims restore their credit, remove fraudulent accounts, and protect
              their financial future. You don't have to face this alone.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Get Emergency Help Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="tel:+18642375511">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (864) 237-5511
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-red-600">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Warning Signs of Identity Theft
            </h2>
            <p className="mb-12 text-muted-foreground">
              Recognizing identity theft early can minimize damage. Watch for these red flags:
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {warningSignss.map((sign) => (
              <div
                key={sign.title}
                className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <sign.icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 font-semibold">{sign.title}</h3>
                <p className="text-sm text-muted-foreground">{sign.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Process */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Our Identity Theft Recovery Process
            </h2>
            <p className="mb-12 text-muted-foreground">
              We follow a comprehensive, legally-compliant process to restore your identity
              and credit as quickly as possible.
            </p>
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            {recoverySteps.map((item) => (
              <div
                key={item.step}
                className="flex gap-6 rounded-xl border bg-card p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Your Rights as an Identity Theft Victim
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Under the Fair Credit Reporting Act (FCRA)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Free credit reports from all three bureaus</li>
                  <li>• Right to dispute inaccurate information</li>
                  <li>• Fraud alerts lasting 1-7 years</li>
                  <li>• Credit freezes at no cost</li>
                  <li>• Removal of fraudulent accounts within 30 days</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Under the Identity Theft and Assumption Deterrence Act
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Criminal prosecution of identity thieves</li>
                  <li>• Right to an Identity Theft Report</li>
                  <li>• Creditors must provide fraud documentation</li>
                  <li>• Protection from debt collection on fraud accounts</li>
                  <li>• Limited liability for fraudulent charges</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Steps */}
      <section className="bg-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-600" />
            <h2 className="mb-4 font-serif text-3xl font-bold">
              Immediate Steps If You're a Victim
            </h2>
            <p className="mb-8 text-muted-foreground">
              Time is critical. Take these steps immediately while we prepare your full recovery plan:
            </p>
            <div className="space-y-4 text-left">
              <div className="rounded-lg bg-white p-4">
                <p className="font-medium">1. Place a fraud alert</p>
                <p className="text-sm text-muted-foreground">
                  Call any one credit bureau (they must notify the others): Experian (888-397-3742),
                  Equifax (800-525-6285), or TransUnion (800-680-7289)
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="font-medium">2. Report to the FTC</p>
                <p className="text-sm text-muted-foreground">
                  File a report at IdentityTheft.gov to create your official Identity Theft Report
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="font-medium">3. File a police report</p>
                <p className="text-sm text-muted-foreground">
                  Contact your local police department with your FTC Identity Theft Report
                </p>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="font-medium">4. Contact Horizon Credit</p>
                <p className="text-sm text-muted-foreground">
                  Let our experts take over the complex recovery process while you focus on your life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Don't Let Identity Thieves Win
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            The average identity theft victim spends over 200 hours trying to resolve issues
            on their own. Our experts can handle everything for you, faster and more effectively.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Start Your Recovery Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


