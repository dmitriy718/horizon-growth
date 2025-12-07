import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Horizon Credit Repair",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[180px] md:text-[240px] font-bold text-gray-100 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">🔍</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for seems to have wandered off. 
          Don&apos;t worry though - your credit journey is still on track!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-8 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#2D4A6F] transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500 mb-4">Maybe you were looking for:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services/credit-repair"
              className="text-[#1E3A5F] hover:underline"
            >
              Credit Repair Services
            </Link>
            <Link href="/pricing" className="text-[#1E3A5F] hover:underline">
              Pricing
            </Link>
            <Link href="/blog" className="text-[#1E3A5F] hover:underline">
              Blog
            </Link>
            <Link href="/faq" className="text-[#1E3A5F] hover:underline">
              FAQ
            </Link>
            <Link href="/learn" className="text-[#1E3A5F] hover:underline">
              Credit Education
            </Link>
          </div>
        </div>

        {/* Fun credit tip */}
        <div className="mt-12 p-6 bg-emerald-50 rounded-2xl max-w-md mx-auto">
          <p className="text-emerald-800 text-sm">
            <span className="font-semibold">💡 Credit Tip:</span> While this page
            doesn&apos;t exist, your credit score definitely does! The average
            American has a credit score of 714.
          </p>
        </div>
      </div>
    </div>
  );
}

