import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Horizon Credit Repair. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: December 2024
          </p>

          <div className="prose prose-gray mt-12 max-w-none dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>
              {siteConfig.name} ("Company," "we," "us," or "our") respects your privacy
              and is committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website and services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information You Provide</h3>
            <p>We collect information you voluntarily provide, including:</p>
            <ul>
              <li>Full name, date of birth, and Social Security Number</li>
              <li>Current and previous addresses</li>
              <li>Email address and phone number</li>
              <li>Employment information</li>
              <li>Payment and billing information</li>
            </ul>

            <h3>Credit Information</h3>
            <p>
              With your authorization, we access your credit reports from Experian,
              Equifax, and TransUnion. This information includes:
            </p>
            <ul>
              <li>Credit scores and score factors</li>
              <li>Credit accounts and payment history</li>
              <li>Public records and collections</li>
              <li>Credit inquiries</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you use our website, we automatically collect:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide credit repair services</li>
              <li>Analyze your credit reports and identify disputable items</li>
              <li>Prepare and send dispute letters on your behalf</li>
              <li>Communicate with you about your account and services</li>
              <li>Process payments and prevent fraud</li>
              <li>Improve our services and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information
              with:
            </p>
            <ul>
              <li>
                <strong>Credit bureaus and creditors:</strong> To dispute items on your
                behalf, as authorized by you
              </li>
              <li>
                <strong>Service providers:</strong> Third parties who help us operate
                our business (payment processors, email providers, etc.)
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law, court order,
                or government request
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with a merger,
                acquisition, or sale of assets
              </li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement robust security measures to protect your information:
            </p>
            <ul>
              <li>256-bit SSL/TLS encryption for all data transmission</li>
              <li>SOC 2 Type II certified data centers</li>
              <li>Regular security audits and penetration testing</li>
              <li>Role-based access controls</li>
              <li>Encryption of sensitive data at rest</li>
              <li>Employee security training</li>
            </ul>
            <p>
              While we strive to protect your information, no method of transmission or
              storage is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide
              our services and comply with legal obligations. After you terminate your
              account:
            </p>
            <ul>
              <li>
                Active dispute records: Retained for 7 years per FCRA requirements
              </li>
              <li>
                Billing records: Retained for 7 years per tax regulations
              </li>
              <li>
                Other personal information: Deleted or anonymized within 90 days
              </li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>
                <strong>Access:</strong> Request a copy of your personal information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your information, subject
                to legal retention requirements
              </li>
              <li>
                <strong>Opt-out:</strong> Opt out of marketing communications
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a portable format
              </li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email.legal}`}>
                {siteConfig.contact.email.legal}
              </a>
              .
            </p>

            <h2>8. California Privacy Rights (CCPA)</h2>
            <p>
              California residents have additional rights under the California Consumer
              Privacy Act:
            </p>
            <ul>
              <li>Right to know what personal information we collect</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of sale of personal information (we do not sell)</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>

            <h2>9. Gramm-Leach-Bliley Act (GLBA) Compliance</h2>
            <p>
              As a financial services provider, we comply with the GLBA's privacy and
              security requirements for consumer financial information. This includes:
            </p>
            <ul>
              <li>Providing this privacy notice</li>
              <li>Implementing a comprehensive security program</li>
              <li>Limiting disclosure of nonpublic personal information</li>
            </ul>

            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do
              not knowingly collect personal information from children.
            </p>

            <h2>11. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Improve user experience</li>
              <li>Provide personalized content</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling cookies
              may affect website functionality.
            </p>

            <h2>12. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these sites. We encourage you to
              review their privacy policies.
            </p>

            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of
              significant changes via email or website notice. The "Last updated" date
              indicates when the policy was last revised.
            </p>

            <h2>14. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices,
              contact us:
            </p>
            <address className="not-italic">
              {siteConfig.name}
              <br />
              Attn: Privacy Officer
              <br />
              {siteConfig.contact.address.street}
              <br />
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
              {siteConfig.contact.address.zip}
              <br />
              Email: {siteConfig.contact.email.legal}
              <br />
              Phone: {siteConfig.contact.phone.display}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}

