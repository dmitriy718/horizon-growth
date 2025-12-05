import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Horizon Credit Repair services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl font-bold">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: December 2024
          </p>

          <div className="prose prose-gray mt-12 max-w-none dark:prose-invert">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the services provided by {siteConfig.name} ("Company,"
              "we," "us," or "our"), you agree to be bound by these Terms of
              Service ("Terms"). If you do not agree to these Terms, you may not
              access or use our services.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              {siteConfig.name} provides credit repair services, which may include:
            </p>
            <ul>
              <li>Analysis of credit reports from Experian, Equifax, and TransUnion</li>
              <li>Identification of potentially inaccurate, unverifiable, or unfair items</li>
              <li>Preparation and sending of dispute letters to credit bureaus and creditors</li>
              <li>Ongoing monitoring and tracking of disputes</li>
              <li>Educational resources about credit management</li>
              <li>AI-powered credit analysis tools</li>
            </ul>

            <h2>3. Credit Repair Organizations Act (CROA) Disclosure</h2>
            <p>
              In compliance with the Credit Repair Organizations Act (15 U.S.C. 1679 et
              seq.), we provide the following disclosures:
            </p>
            <div className="rounded-lg border bg-muted/50 p-6">
              <h3 className="mt-0 text-lg font-semibold">Consumer Credit File Rights</h3>
              <p>You have a right to:</p>
              <ol>
                <li>
                  Dispute inaccurate information in your credit report by contacting the
                  credit bureau directly at no charge.
                </li>
                <li>
                  Obtain a free copy of your credit report from each of the three major
                  credit bureaus once every 12 months at{" "}
                  <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer">
                    AnnualCreditReport.com
                  </a>
                  .
                </li>
                <li>
                  Cancel this contract within three (3) business days without any charge.
                </li>
              </ol>
              <p className="font-semibold">
                No one can legally remove accurate and timely negative information from a
                credit report. The credit bureau must remove accurate negative information
                only after 7 years (10 years for bankruptcies).
              </p>
            </div>

            <h2>4. Services We Do NOT Provide</h2>
            <p>{siteConfig.name}:</p>
            <ul>
              <li>Is not a law firm and does not provide legal advice</li>
              <li>Does not guarantee specific credit score increases</li>
              <li>Does not advise you to dispute accurate information</li>
              <li>Does not help you create a "new credit identity"</li>
              <li>Cannot remove accurate negative information before the legally mandated time period</li>
            </ul>

            <h2>5. Fees and Payment</h2>
            <p>Our services are provided on a monthly subscription basis:</p>
            <ul>
              <li>Basic Plan: $79.99/month</li>
              <li>Premier Plan: $109.99/month</li>
              <li>Premier Plus Plan: $139.99/month</li>
            </ul>
            <p>
              A one-time setup fee of $14.99 is charged at enrollment. The first monthly
              fee is not charged until after the 7-day free trial period ends.
            </p>

            <h2>6. Cancellation and Refunds</h2>
            <p>
              <strong>Right to Cancel:</strong> You may cancel this agreement within
              three (3) business days from the date you signed the contract without
              paying any fees or charges.
            </p>
            <p>
              <strong>90-Day Guarantee:</strong> If you are not satisfied with our
              services within the first 90 days, you may request a full refund of
              service fees paid during that period.
            </p>
            <p>
              <strong>Monthly Cancellation:</strong> You may cancel your subscription at
              any time. Your service will continue through the end of your current
              billing period.
            </p>

            <h2>7. Your Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul>
              <li>Provide accurate and complete personal information</li>
              <li>
                Grant us authorization to access your credit reports for the purpose of
                credit repair services
              </li>
              <li>Respond to our requests for information in a timely manner</li>
              <li>Review and approve dispute letters before submission</li>
              <li>Keep your payment method current</li>
            </ul>

            <h2>8. Privacy and Data Security</h2>
            <p>
              We take your privacy seriously. Please review our{" "}
              <a href="/privacy">Privacy Policy</a> for information on how we collect,
              use, and protect your personal information. We use bank-level 256-bit
              encryption and are SOC 2 certified.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {siteConfig.name} shall not be
              liable for any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or other
              intangible losses, resulting from your use of our services.
            </p>

            <h2>10. Dispute Resolution</h2>
            <p>
              Any disputes arising from these Terms or our services shall be resolved
              through binding arbitration in accordance with the American Arbitration
              Association's rules, except where prohibited by law.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you
              of significant changes via email or through our website. Your continued use
              of our services after changes constitutes acceptance of the new Terms.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us:
            </p>
            <address className="not-italic">
              {siteConfig.name}
              <br />
              {siteConfig.contact.address.street}
              <br />
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
              <br />
              Phone: {siteConfig.contact.phone.display}
              <br />
              Email: {siteConfig.contact.email.legal}
            </address>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws
              of the State of South Carolina, without regard to its conflict of law
              provisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

