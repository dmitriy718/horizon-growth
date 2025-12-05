/**
 * Credit Bureau Integration Module
 * 
 * This module provides an abstraction layer for credit bureau data access.
 * We support multiple aggregators to ensure flexibility and redundancy.
 * 
 * Primary: Array (https://array.com)
 * Fallback: Plaid (https://plaid.com)
 * 
 * IMPORTANT: Credit bureau APIs require:
 * - Business entity verification
 * - Compliance certifications (FCRA, CROA)
 * - Secure data handling
 */

export * from "./providers/array.provider";
export * from "./providers/plaid.provider";
export * from "./credit-bureau.service";
export * from "./types";

