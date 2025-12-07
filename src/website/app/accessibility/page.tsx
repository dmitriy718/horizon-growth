import { Metadata } from "next";
import Link from "next/link";
import { Accessibility, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Horizon Credit Repair is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility efforts.",
  keywords: ["accessibility", "ADA compliance", "WCAG", "accessible website"],
};

const accessibilityFeatures = [
  "Alternative text for images and non-text content",
  "Keyboard navigation support throughout the site",
  "Consistent and predictable navigation",
  "Sufficient color contrast for text readability",
  "Resizable text without loss of functionality",
  "Clear and descriptive link text",
  "Form labels and error messages for screen readers",
  "Skip navigation links for keyboard users",
  "ARIA landmarks and roles for assistive technologies",
  "Captions for video content when available",
];

const wcagPrinciples = [
  {
    principle: "Perceivable",
    description:
      "Information and user interface components must be presentable to users in ways they can perceive. This includes providing text alternatives, captions, and adaptable content.",
  },
  {
    principle: "Operable",
    description:
      "User interface components and navigation must be operable. This includes keyboard accessibility, sufficient time to read content, and avoiding content that causes seizures.",
  },
  {
    principle: "Understandable",
    description:
      "Information and the operation of the user interface must be understandable. This includes readable text, predictable functionality, and input assistance.",
  },
  {
    principle: "Robust",
    description:
      "Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies. This includes proper HTML markup and compatibility.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Accessibility className="h-4 w-4" />
              Accessibility
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Accessibility Statement
            </h1>
            <p className="text-white/80">
              Our commitment to making credit repair accessible to everyone
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <h2>Our Commitment</h2>
            <p>
              Horizon Credit Repair is committed to ensuring digital accessibility for people
              with disabilities. We are continually improving the user experience for everyone
              and applying the relevant accessibility standards.
            </p>
            <p>
              We believe that everyone deserves equal access to financial services and
              information, regardless of ability. Our goal is to make our website and services
              accessible to the widest possible audience.
            </p>

            <h2>Conformance Status</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
              Level AA standards. These guidelines explain how to make web content more
              accessible to people with disabilities and more user-friendly for everyone.
            </p>
            <p>
              The guidelines have three levels of accessibility (A, AA, and AAA). We have
              chosen Level AA as our target as it addresses the biggest and most common
              barriers for disabled users.
            </p>

            <h2>WCAG 2.1 Principles</h2>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
            {wcagPrinciples.map((item) => (
              <div key={item.principle} className="rounded-xl border bg-card p-6">
                <h3 className="mb-2 font-semibold">{item.principle}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-lg mx-auto mt-12 max-w-4xl">
            <h2>Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features to help users with
              disabilities access our content and services:
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-4xl">
            <div className="rounded-xl border bg-card p-6">
              <ul className="grid gap-3 md:grid-cols-2">
                {accessibilityFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="prose prose-lg mx-auto mt-12 max-w-4xl">
            <h2>Assistive Technologies</h2>
            <p>
              Our website is designed to be compatible with the following assistive
              technologies:
            </p>
            <ul>
              <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Browser accessibility features</li>
            </ul>

            <h2>Browser Compatibility</h2>
            <p>
              Our website is designed to be accessible on the latest versions of the
              following browsers:
            </p>
            <ul>
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              Despite our best efforts to ensure accessibility of our website, there may be
              some limitations. Below is a description of known limitations:
            </p>
            <ul>
              <li>
                Some older PDF documents may not be fully accessible. We are working to
                remediate these documents.
              </li>
              <li>
                Some third-party content embedded on our site may not be fully accessible.
              </li>
              <li>
                Live chat functionality may have limited screen reader support.
              </li>
            </ul>
            <p>
              Please contact us if you encounter any accessibility issues, and we will work
              to provide the information in an alternative format.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of the Horizon Credit Repair
              website. Please let us know if you encounter accessibility barriers:
            </p>
            <ul>
              <li>Email: accessibility@horizoncredit.net</li>
              <li>Phone: (864) 237-5511</li>
              <li>Address: 204 Hotchkiss Ln, Duncan, SC 29334</li>
            </ul>
            <p>
              We try to respond to accessibility feedback within 2 business days.
            </p>

            <h2>Enforcement Procedure</h2>
            <p>
              If you are not satisfied with our response to your accessibility concern, you
              may escalate your complaint to the relevant regulatory body. In the United
              States, this may include:
            </p>
            <ul>
              <li>The Department of Justice (DOJ) for ADA-related complaints</li>
              <li>The Federal Trade Commission (FTC) for consumer protection</li>
              <li>Your state attorney general's office</li>
            </ul>

            <h2>Technical Specifications</h2>
            <p>
              Accessibility of our website relies on the following technologies to work
              with the particular combination of web browser and any assistive technologies
              or plugins installed on your computer:
            </p>
            <ul>
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p>
              These technologies are relied upon for conformance with the accessibility
              standards used.
            </p>

            <h2>Assessment Approach</h2>
            <p>
              Horizon Credit Repair assessed the accessibility of this website by the
              following approaches:
            </p>
            <ul>
              <li>Self-evaluation using automated testing tools</li>
              <li>Manual testing with assistive technologies</li>
              <li>User feedback and testing</li>
            </ul>

            <h2>Date</h2>
            <p>
              This accessibility statement was last updated on December 2024.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold">
            Accessibility Concerns?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Let us know if you encounter any barriers on our website.
          </p>
          <Button asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}


