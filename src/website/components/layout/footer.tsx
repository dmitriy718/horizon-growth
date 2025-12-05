import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/brand/logo";

const footerLinks = {
  services: {
    title: "Services",
    links: [
      { label: "Credit Repair", href: "/services/credit-repair" },
      { label: "Identity Theft Recovery", href: "/services/identity-theft" },
      { label: "Business Credit", href: "/services/business-credit" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  education: {
    title: "Education",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Credit Guides", href: "/learn" },
      { label: "FAQ", href: "/faq" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/company/newsroom" },
      { label: "Contact", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <Logo variant="full" size="md" theme="light" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering individuals to take control of their financial futures
              through expert credit repair and education.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a 
                href={`tel:${siteConfig.contact.phone.raw}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.contact.phone.display}
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email.support}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.contact.email.support}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{siteConfig.contact.address.full}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground max-w-2xl text-center lg:text-right">
              {siteConfig.name} is not a law firm and does not provide legal
              advice. Results may vary. Credit repair services are regulated under 
              the Credit Repair Organizations Act (CROA).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

