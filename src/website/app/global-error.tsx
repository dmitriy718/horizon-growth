"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// This handles errors in the root layout
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error
    console.error("[Global Error]", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });

    // Try to send to error logging API
    fetch("/api/errors/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "global_error",
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: typeof window !== "undefined" ? window.location.href : "",
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "system-ui, sans-serif",
            background: "linear-gradient(to bottom, #f8fafc, #fff)",
          }}
        >
          <div style={{ maxWidth: "500px", textAlign: "center" }}>
            {/* Logo placeholder */}
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 2rem",
                background: "#1E3A5F",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              <span style={{ color: "#fff" }}>H</span>
            </div>

            <h1
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              We&apos;re Experiencing Technical Difficulties
            </h1>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              Our website encountered an unexpected error. Please try again or
              contact us if the problem persists.
            </p>

            {error.digest && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                  marginBottom: "1.5rem",
                }}
              >
                Reference: {error.digest}
              </p>
            )}

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 2rem",
                  background: "#1E3A5F",
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: "0.75rem 2rem",
                  background: "#fff",
                  color: "#374151",
                  fontWeight: "600",
                  borderRadius: "0.75rem",
                  border: "2px solid #e5e7eb",
                  textDecoration: "none",
                }}
              >
                Homepage
              </a>
            </div>

            <div
              style={{
                marginTop: "3rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Need assistance? Call{" "}
                <a
                  href="tel:+18642375511"
                  style={{ color: "#1E3A5F", textDecoration: "none" }}
                >
                  (864) 237-5511
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

