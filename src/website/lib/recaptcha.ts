// Google reCAPTCHA v3 Integration
// Site Key: Add to .env.local as NEXT_PUBLIC_RECAPTCHA_SITE_KEY
// Secret Key: Add to .env.local as RECAPTCHA_SECRET_KEY

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Minimum score to consider the request valid (0.0 to 1.0)
const MIN_SCORE = 0.5;

export interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
}

/**
 * Verify reCAPTCHA token server-side
 */
export async function verifyRecaptcha(
  token: string,
  expectedAction?: string
): Promise<{ valid: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn("[reCAPTCHA] Secret key not configured, skipping verification");
    return { valid: true, score: 1 }; // Pass through if not configured
  }

  if (!token) {
    return { valid: false, error: "No reCAPTCHA token provided" };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data: RecaptchaVerifyResponse = await response.json();

    if (!data.success) {
      console.warn("[reCAPTCHA] Verification failed:", data.error_codes);
      return {
        valid: false,
        error: `Verification failed: ${data.error_codes?.join(", ") || "Unknown error"}`,
      };
    }

    // Check score for v3
    if (data.score !== undefined && data.score < MIN_SCORE) {
      console.warn(`[reCAPTCHA] Low score: ${data.score}`);
      return {
        valid: false,
        score: data.score,
        error: "Request flagged as suspicious",
      };
    }

    // Verify action if specified
    if (expectedAction && data.action !== expectedAction) {
      console.warn(
        `[reCAPTCHA] Action mismatch. Expected: ${expectedAction}, Got: ${data.action}`
      );
      return {
        valid: false,
        error: "Action mismatch",
      };
    }

    return { valid: true, score: data.score };
  } catch (error) {
    console.error("[reCAPTCHA] Verification error:", error);
    return { valid: false, error: "Verification service unavailable" };
  }
}

/**
 * Get the site key for client-side use
 */
export function getRecaptchaSiteKey(): string | undefined {
  return RECAPTCHA_SITE_KEY;
}

/**
 * Check if reCAPTCHA is configured
 */
export function isRecaptchaConfigured(): boolean {
  return Boolean(RECAPTCHA_SITE_KEY && RECAPTCHA_SECRET_KEY);
}

