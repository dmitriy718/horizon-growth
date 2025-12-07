import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { ExitIntentPopup } from "@/components/marketing/exit-intent-popup";
import { NewsletterSignup } from "@/components/marketing/newsletter-signup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      
      {/* Newsletter Banner - appears before footer */}
      <NewsletterSignup 
        variant="banner" 
        title="Stay Ahead of Your Credit Game"
        description="Get weekly tips and strategies to improve your credit score delivered straight to your inbox."
      />
      
      <Footer />
      <ChatWidget />
      <ExitIntentPopup />
    </>
  );
}
