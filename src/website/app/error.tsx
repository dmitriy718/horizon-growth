"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to our error reporting system
    logError(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[140px] md:text-[180px] font-bold text-red-100 select-none">
              500
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-600 mb-4 max-w-md mx-auto">
          We apologize for the inconvenience. Our team has been notified and 
          is working to fix the issue.
        </p>

        {/* Error digest for support */}
        {error.digest && (
          <p className="text-sm text-gray-400 mb-8">
            Error ID: <code className="bg-gray-100 px-2 py-1 rounded">{error.digest}</code>
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={reset}
            className="px-8 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#2D4A6F] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Support Info */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500 mb-4">Need help? We&apos;re here for you:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="tel:+18642375511"
              className="flex items-center gap-2 text-[#1E3A5F] hover:underline"
            >
              <span>📞</span> (864) 237-5511
            </a>
            <a
              href="mailto:support@horizoncredit.net"
              className="flex items-center gap-2 text-[#1E3A5F] hover:underline"
            >
              <span>✉️</span> support@horizoncredit.net
            </a>
          </div>
        </div>

        {/* Positive message */}
        <div className="mt-12 p-6 bg-blue-50 rounded-2xl max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            <span className="font-semibold">🌟 Don&apos;t worry!</span> Technical 
            hiccups happen, but they don&apos;t affect your credit journey with us. 
            Your data is safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
}

// Error logging function
async function logError(error: Error & { digest?: string }) {
  try {
    // Log to console in development
    console.error("[App Error]", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });

    // Send to error logging API
    await fetch("/api/errors/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "client_error",
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: typeof window !== "undefined" ? window.location.href : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail if error logging fails
    });
  } catch {
    // Silently fail
  }
}

