"use client";

import { useEffect, useCallback, useState } from "react";

// Declare global grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) {
      console.warn("[reCAPTCHA] Site key not configured");
      return;
    }

    // Check if already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      setError("Failed to load reCAPTCHA");
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      const existingScript = document.querySelector(
        `script[src*="recaptcha"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
      // Also remove the badge if desired
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) {
        badge.remove();
      }
    };
  }, []);

  /**
   * Execute reCAPTCHA and get a token
   */
  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY) {
        console.warn("[reCAPTCHA] Site key not configured, returning null");
        return null;
      }

      if (!isLoaded || !window.grecaptcha) {
        console.warn("[reCAPTCHA] Not loaded yet");
        return null;
      }

      try {
        const token = await window.grecaptcha.execute(SITE_KEY, { action });
        return token;
      } catch (err) {
        console.error("[reCAPTCHA] Execution error:", err);
        setError("reCAPTCHA execution failed");
        return null;
      }
    },
    [isLoaded]
  );

  return {
    isLoaded,
    error,
    executeRecaptcha,
    isConfigured: Boolean(SITE_KEY),
  };
}

