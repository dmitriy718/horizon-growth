import { Hero } from "@/components/sections/hero";
import { TrustBadges } from "@/components/sections/trust-badges";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <main>
      <Hero
        title="Your Path to Better Credit"
        subtitle="Starts at the Horizon"
        description="Join 50,000+ Americans who've taken control of their financial future with AI-powered credit repair."
        primaryCta={{ text: "Get Free Credit Analysis", href: "/signup" }}
        secondaryCta={{ text: "See How It Works", href: "#how-it-works" }}
      />

      <TrustBadges />

      <HowItWorks />

      <Testimonials />

      <PricingPreview />

      <CTASection
        title="Ready to Transform Your Credit?"
        description="Start your journey to better credit today. Free analysis, no obligation."
        cta={{ text: "Get Started Free", href: "/signup" }}
      />
    </main>
  );
}

