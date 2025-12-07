"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils/cn";
import { SearchButton } from "@/components/search/search-modal";

const navigation = {
  services: {
    title: "Horizon Services",
    items: [
      {
        title: "Credit Repair Services",
        href: "/services/credit-repair",
        description: "Professional credit repair tailored to your needs",
      },
      {
        title: "Pricing & Plans",
        href: "/pricing",
        description: "Transparent pricing with no hidden fees",
      },
      {
        title: "How It Works",
        href: "/how-it-works",
        description: "Our proven 4-step credit repair process",
      },
      {
        title: "Free Tools",
        href: "/tools",
        description: "Credit calculators and simulators",
      },
    ],
  },
  education: {
    title: "Credit Education",
    items: [
      { title: "Fixing Credit", href: "/learn/fixing-credit" },
      { title: "Understanding Credit", href: "/learn/understanding-credit" },
      { title: "Managing Credit", href: "/learn/managing-credit" },
      { title: "Rebuilding Credit", href: "/learn/rebuilding-credit" },
      { title: "Common Myths", href: "/learn/myths" },
      { title: "DIY vs Professional", href: "/learn/diy-vs-professional" },
    ],
  },
  company: {
    title: "Company",
    items: [
      { title: "About Us", href: "/company/about" },
      { title: "Community Outreach", href: "/company/community" },
      { title: "Newsroom", href: "/company/newsroom" },
      { title: "Careers", href: "/careers" },
      { title: "Our Mission", href: "/company/mission" },
    ],
  },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo variant="full" size="md" theme="light" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {Object.entries(navigation).map(([key, section]) => (
            <div key={key} className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {section.title}
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
                <div className="w-64 rounded-lg border bg-background p-4 shadow-lg">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      <span className="font-medium">{item.title}</span>
                      {"description" in item && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <SearchButton />
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t lg:hidden">
          <div className="container space-y-4 py-4">
            {Object.entries(navigation).map(([key, section]) => (
              <div key={key}>
                <p className="mb-2 font-medium">{section.title}</p>
                <div className="space-y-1 pl-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-1 text-sm text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

