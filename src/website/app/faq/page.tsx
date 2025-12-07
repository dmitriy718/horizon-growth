import { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Credit Repair FAQ",
  description:
    "Get answers to common questions about credit repair, credit scores, and Horizon Credit Repair services. Everything you need to know about improving your credit.",
  keywords: [
    "credit repair FAQ",
    "credit score questions",
    "credit repair questions",
    "how credit repair works",
    "credit repair cost",
  ],
};

const faqCategories = [
  {
    category: "About Credit Repair",
    questions: [
      {
        q: "What is credit repair?",
        a: "Credit repair is the process of identifying and disputing inaccurate, incomplete, or unverifiable information on your credit reports. Under the Fair Credit Reporting Act (FCRA), you have the right to dispute any information that is not 100% accurate. Credit repair services like ours handle this process on your behalf, using proven strategies to maximize results.",
      },
      {
        q: "Is credit repair legal?",
        a: "Yes, credit repair is 100% legal. The Fair Credit Reporting Act (FCRA) gives every American the right to dispute inaccurate information on their credit reports. Credit repair companies are regulated under the Credit Repair Organizations Act (CROA), which protects consumers from fraudulent practices. Horizon Credit Repair is fully compliant with all federal and state regulations.",
      },
      {
        q: "What can be removed from my credit report?",
        a: "Any information that is inaccurate, incomplete, unverifiable, or reported in violation of consumer protection laws can potentially be removed. This includes collections, late payments, charge-offs, bankruptcies, judgments, liens, repossessions, and foreclosures. However, accurate information that is properly reported cannot be legally removed simply because it is negative.",
      },
      {
        q: "How long does credit repair take?",
        a: "Most clients see their first results within 30-45 days. The full credit repair process typically takes 3-6 months, depending on the number and complexity of negative items on your reports. Some clients with simpler cases see significant improvement in just 2-3 months, while more complex cases involving many items may take longer.",
      },
      {
        q: "Can you guarantee results?",
        a: "No legitimate credit repair company can guarantee specific results, and you should be wary of any company that does. What we can guarantee is that we will work diligently on your behalf using proven legal strategies. Our track record shows that 95% of our clients see improvement in their credit scores, with an average increase of 40-100 points over 6 months.",
      },
      {
        q: "Can I repair my credit myself?",
        a: "Yes, you have the legal right to dispute errors on your credit report yourself at no cost. However, professional credit repair services offer expertise in consumer credit law, proven dispute strategies, and significant time savings. Many people find that DIY attempts result in generic disputes that are easily dismissed, while professional services achieve better and faster results.",
      },
    ],
  },
  {
    category: "About Credit Scores",
    questions: [
      {
        q: "What is a credit score?",
        a: "A credit score is a three-digit number (typically 300-850) that represents your creditworthiness. It is calculated based on information in your credit reports, including payment history, credit utilization, length of credit history, credit mix, and new credit inquiries. Lenders, landlords, insurers, and employers use credit scores to make decisions about you.",
      },
      {
        q: "Why do I have different credit scores?",
        a: "You have multiple credit scores because: (1) There are three credit bureaus (Experian, Equifax, TransUnion) that may have different information; (2) There are multiple scoring models (FICO 8, FICO 9, VantageScore, etc.) that calculate scores differently; (3) There are industry-specific scores for auto loans, mortgages, etc. The score you see from a free service may differ from what a lender sees.",
      },
      {
        q: "What factors affect my credit score?",
        a: "The main factors are: Payment History (35%) - your track record of paying on time; Credit Utilization (30%) - how much of your available credit you are using; Length of Credit History (15%) - how long you have had credit; Credit Mix (10%) - variety of account types; and New Credit (10%) - recent applications and inquiries.",
      },
      {
        q: "How can I improve my credit score quickly?",
        a: "The fastest ways to improve your score are: (1) Pay down credit card balances to under 30% (ideally under 10%) of your limits; (2) Get added as an authorized user on someone else's good account; (3) Dispute and remove errors from your credit reports; (4) Make all payments on time; (5) Keep old accounts open. Some improvements can happen within 30 days.",
      },
      {
        q: "Does checking my own credit hurt my score?",
        a: "No! Checking your own credit is a soft inquiry and has zero impact on your credit score. You can check your own credit as often as you like without any negative effect. Only hard inquiries from lenders when you apply for credit can affect your score (typically 5-10 points for 12 months).",
      },
    ],
  },
  {
    category: "Our Services",
    questions: [
      {
        q: "How does your service work?",
        a: "Our process has four steps: (1) Analyze - we pull and review your credit reports from all three bureaus; (2) Identify - our experts find items that may be inaccurate or disputable; (3) Dispute - we create and send customized dispute letters on your behalf; (4) Track - we monitor progress and continue working until we achieve the best possible results.",
      },
      {
        q: "What do I need to get started?",
        a: "To get started, you will need to provide: your full legal name, current address, Social Security number, date of birth, email address, and phone number. You will also sign an authorization allowing us to work on your behalf. We guide you through everything step by step.",
      },
      {
        q: "How much does your service cost?",
        a: "We offer three plans: Basic at $79/month with essential credit repair services; Premier at $109/month with priority processing and additional features; and Premier Plus at $139/month with unlimited disputes and dedicated support. There are no setup fees, no long-term contracts, and you can cancel anytime. We also offer a 90-day money-back guarantee.",
      },
      {
        q: "Is there a contract or commitment?",
        a: "No. We operate on a month-to-month basis with no long-term contracts required. You can cancel your service at any time with no cancellation fees. We believe in earning your business every month through results, not locking you into a contract.",
      },
      {
        q: "Do you offer a guarantee?",
        a: "Yes! We offer a 90-day money-back guarantee. If you are not satisfied with our service within your first 90 days, we will refund your payments. We also provide a progress guarantee - if you do not see any improvements within 90 days, we will continue working on your case at no additional charge until you do.",
      },
      {
        q: "How do I track my progress?",
        a: "All clients have access to our online dashboard where you can track your progress in real-time. You can see which items have been disputed, their current status, and any updates to your credit scores. We also send regular email updates and progress reports.",
      },
    ],
  },
  {
    category: "Credit Reports & Bureaus",
    questions: [
      {
        q: "What are the three credit bureaus?",
        a: "The three major credit bureaus are Experian, Equifax, and TransUnion. These companies collect and maintain information about your credit history and provide credit reports to lenders, landlords, and others who request them. Each bureau may have slightly different information, which is why you should check all three reports.",
      },
      {
        q: "How do I get my credit reports?",
        a: "You are entitled to one free credit report from each bureau every 12 months through AnnualCreditReport.com - the only official source for free reports. During certain periods, weekly free reports may be available. When you become a Horizon Credit client, we pull your reports for you as part of our service.",
      },
      {
        q: "How long do negative items stay on my credit report?",
        a: "Most negative items stay on your credit report for 7 years from the date of first delinquency. Bankruptcies stay for 7 years (Chapter 13) or 10 years (Chapter 7). Hard inquiries stay for 2 years but only affect your score for 12 months. Positive information can stay indefinitely.",
      },
      {
        q: "Why are my three credit reports different?",
        a: "Your credit reports may differ because not all creditors report to all three bureaus. Some creditors only report to one or two bureaus, and they may report at different times during the month. This is why it is important to check and dispute errors with all three bureaus.",
      },
    ],
  },
  {
    category: "Disputes & Results",
    questions: [
      {
        q: "How do credit disputes work?",
        a: "When we file a dispute with a credit bureau, they are legally required under the FCRA to investigate within 30 days. They contact the creditor who reported the information and ask them to verify it. If the creditor cannot verify the information or fails to respond, the item must be removed from your report.",
      },
      {
        q: "What happens after a dispute is filed?",
        a: "After filing a dispute, the credit bureau has 30 days to investigate. They will contact the creditor to verify the information. You will receive a response letter with the results. If the dispute is successful, the item is removed or corrected. If not, we may file additional disputes with different strategies or escalate the matter.",
      },
      {
        q: "What if a dispute is denied?",
        a: "A denied dispute does not mean the end of the road. We have multiple strategies for each item. We may dispute with a different bureau, use a different legal basis for the dispute, contact the creditor directly, request method of verification, or escalate to regulatory agencies. Persistence and strategy are key.",
      },
      {
        q: "Can removed items come back on my report?",
        a: "Yes, in some cases items can be re-reported if a creditor later verifies the information. However, this is relatively rare. If it happens, we will dispute the item again. The bureau must notify you when items are re-inserted, and you have the right to dispute them again.",
      },
    ],
  },
  {
    category: "Billing & Account",
    questions: [
      {
        q: "When am I charged?",
        a: "You are charged monthly on the anniversary of your signup date. For example, if you sign up on the 15th, you will be charged on the 15th of each following month. You can view your billing date and history in your account dashboard.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards. Payments are processed securely through Stripe. We do not accept cash, checks, or money orders.",
      },
      {
        q: "How do I cancel my account?",
        a: "You can cancel your account at any time by logging into your dashboard and clicking Cancel Subscription, by calling us at (864) 237-5511, or by emailing support@horizoncredit.net. There are no cancellation fees or penalties. Your service will continue until the end of your current billing period.",
      },
      {
        q: "Can I pause my subscription?",
        a: "Yes, you can pause your subscription for up to 3 months if you need to take a break. Contact our support team to arrange a pause. Your progress and account information will be preserved while paused.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80">
              Get answers to common questions about credit repair, credit scores, and our services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {faqCategories.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="mb-6 font-serif text-2xl font-bold">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((item) => (
                    <details key={item.q} className="group rounded-xl border bg-card">
                      <summary className="flex cursor-pointer items-center justify-between p-6">
                        <span className="font-medium">{item.q}</span>
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="border-t px-6 py-4">
                        <p className="text-muted-foreground">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">
              Still Have Questions?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border bg-card p-6 text-center">
                <Phone className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Call Us</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Speak with a credit specialist
                </p>
                <a href="tel:+18642375511" className="text-primary hover:underline">
                  (864) 237-5511
                </a>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Email Us</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  We respond within 24 hours
                </p>
                <a href="mailto:support@horizoncredit.net" className="text-primary hover:underline">
                  support@horizoncredit.net
                </a>
              </div>
              <div className="rounded-xl border bg-card p-6 text-center">
                <MessageCircle className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">Live Chat</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  Chat with our AI assistant
                </p>
                <button className="text-primary hover:underline">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Start your credit repair journey today with a free analysis.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


