"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function BlogHeader() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo linking to main site */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo variant="full" size="md" theme="light" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/learn"
              className="text-sm font-medium text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              Education
            </Link>
            <Link
              href="/services/credit-repair"
              className="text-sm font-medium text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-[#1E3A5F] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

