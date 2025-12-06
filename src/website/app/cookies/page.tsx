import { Metadata } from "next";
import Link from "next/link";
import { Cookie, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Horizon Credit Repair uses cookies and similar technologies to improve your experience on our website.",
  keywords: ["cookie policy", "cookies", "privacy", "tracking"],
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Cookie className="h-4 w-4" />
              Legal
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Cookie Policy
            </h1>
            <p className="text-white/80">Last updated: December 2024</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device
              when you visit a website. They are widely used to make websites work more
              efficiently and to provide information to the owners of the site.
            </p>
            <p>
              Cookies allow a website to recognize your device and remember information about
              your visit, such as your preferences, login status, and browsing history. This
              helps improve your experience and allows us to analyze how our site is used.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              Horizon Credit Repair uses cookies and similar technologies for several purposes:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable
              core functionality such as security, network management, and account access.
              You cannot opt out of these cookies as the website cannot function without them.
            </p>
            <ul>
              <li>Authentication and login status</li>
              <li>Security and fraud prevention</li>
              <li>Session management</li>
              <li>Load balancing</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as
              remembering your preferences and choices. If you do not allow these cookies,
              some features may not function properly.
            </p>
            <ul>
              <li>Language preferences</li>
              <li>Location settings</li>
              <li>Customized content</li>
              <li>User interface preferences</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by
              collecting and reporting information anonymously. This helps us improve our
              website and services.
            </p>
            <ul>
              <li>Pages visited and time spent</li>
              <li>Click patterns and navigation</li>
              <li>Error messages encountered</li>
              <li>Device and browser information</li>
            </ul>
            <p>
              We use Google Analytics to analyze website traffic. Google Analytics uses
              cookies to collect information about how visitors use our site. This information
              is used to compile reports and help us improve the site.
            </p>

            <h3>Marketing Cookies</h3>
            <p>
              These cookies track your online activity to help advertisers deliver more
              relevant advertising or to limit how many times you see an ad. These cookies
              can share information with other organizations or advertisers.
            </p>
            <ul>
              <li>Advertising and retargeting</li>
              <li>Social media sharing</li>
              <li>Conversion tracking</li>
              <li>Referral tracking</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies
              to report usage statistics, deliver advertisements, and so forth. These may include:
            </p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Google Ads (advertising)</li>
              <li>Facebook Pixel (advertising and analytics)</li>
              <li>Stripe (payment processing)</li>
              <li>Intercom or similar (customer support)</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can
              usually find these settings in the Options or Preferences menu of your browser.
              You can set your browser to:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Notify you when a cookie is set</li>
              <li>Reject all cookies</li>
              <li>Delete cookies periodically</li>
            </ul>
            <p>
              Please note that disabling or deleting cookies may affect the functionality of
              this and many other websites you visit. Therefore, it is recommended that you
              do not disable cookies.
            </p>

            <h3>Browser-Specific Instructions</h3>
            <ul>
              <li>
                <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other
                site data
              </li>
              <li>
                <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
              </li>
              <li>
                <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
              </li>
              <li>
                <strong>Edge:</strong> Settings → Privacy, search, and services → Cookies
              </li>
            </ul>

            <h2>Do Not Track</h2>
            <p>
              Some browsers have a Do Not Track feature that lets you tell websites you do
              not want to be tracked. We currently do not respond to Do Not Track signals,
              but you can manage your cookie preferences as described above.
            </p>

            <h2>Cookie Duration</h2>
            <p>Cookies can be classified by their lifespan:</p>
            <ul>
              <li>
                <strong>Session cookies:</strong> These are temporary and expire when you
                close your browser.
              </li>
              <li>
                <strong>Persistent cookies:</strong> These remain on your device until they
                expire or you delete them. They can last from days to years.
              </li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our
              practices or for other operational, legal, or regulatory reasons. We encourage
              you to review this policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@horizoncredit.net</li>
              <li>Phone: (864) 237-5511</li>
              <li>Address: 204 Hotchkiss Ln, Duncan, SC 29334</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold">Questions?</h2>
          <p className="mb-6 text-muted-foreground">
            Contact us if you have questions about our cookie practices.
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

