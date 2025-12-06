import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Horizon Credit Repair | Your Path to Better Credit",
    template: "%s | Horizon Credit Repair",
  },
  description:
    "Professional credit repair services powered by AI. Fix errors on your credit report, improve your score, and achieve your financial goals. Serving Duncan, SC and nationwide.",
  keywords: [
    "credit repair",
    "credit score",
    "credit report",
    "fix credit",
    "improve credit score",
    "credit repair services",
    "credit repair South Carolina",
    "dispute credit report",
  ],
  authors: [{ name: "Horizon Credit Repair" }],
  creator: "Horizon Credit Repair",
  metadataBase: new URL("https://horizoncredit.net"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://horizoncredit.net",
    siteName: "Horizon Credit Repair",
    title: "Horizon Credit Repair | Your Path to Better Credit",
    description:
      "Professional credit repair services powered by AI. Fix errors on your credit report and improve your score.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Horizon Credit Repair - Professional Credit Repair Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Credit Repair | Your Path to Better Credit",
    description: "Professional credit repair services powered by AI.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add your verification codes when you have them
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

