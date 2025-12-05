/**
 * Credit Bureau Types
 * Based on standard credit report data structures
 */

export type CreditBureau = "experian" | "equifax" | "transunion";

export interface CreditScore {
  bureau: CreditBureau;
  score: number;
  scoreModel: "FICO8" | "FICO9" | "VantageScore3" | "VantageScore4";
  dateGenerated: Date;
  factors: ScoreFactor[];
}

export interface ScoreFactor {
  code: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export interface CreditReport {
  id: string;
  userId: string;
  bureau: CreditBureau;
  pullDate: Date;
  score: CreditScore;
  personalInfo: PersonalInfo;
  accounts: TradelineAccount[];
  inquiries: CreditInquiry[];
  publicRecords: PublicRecord[];
  collections: CollectionAccount[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  ssn: string; // Last 4 only in responses
  addresses: Address[];
  employers: Employer[];
}

export interface Address {
  type: "current" | "previous";
  street: string;
  city: string;
  state: string;
  zip: string;
  dateReported: Date;
}

export interface Employer {
  name: string;
  dateReported: Date;
}

export interface TradelineAccount {
  id: string;
  accountNumber: string; // Masked
  creditorName: string;
  accountType: AccountType;
  accountStatus: AccountStatus;
  dateOpened: Date;
  dateClosed?: Date;
  dateLastActive: Date;
  creditLimit?: number;
  highBalance?: number;
  currentBalance: number;
  monthlyPayment?: number;
  paymentStatus: PaymentStatus;
  paymentHistory: PaymentHistoryItem[];
  responsibilityType: "individual" | "joint" | "authorized" | "cosigner";
  remarks?: string[];
  disputeStatus?: DisputeStatus;
}

export type AccountType =
  | "revolving"
  | "installment"
  | "mortgage"
  | "auto"
  | "student"
  | "personal"
  | "credit_card"
  | "retail"
  | "line_of_credit"
  | "collection"
  | "other";

export type AccountStatus =
  | "open"
  | "closed"
  | "paid"
  | "charged_off"
  | "transferred"
  | "collection";

export type PaymentStatus =
  | "current"
  | "30_days_late"
  | "60_days_late"
  | "90_days_late"
  | "120_days_late"
  | "150_days_late"
  | "180_days_late"
  | "collection"
  | "charge_off"
  | "foreclosure"
  | "repossession";

export interface PaymentHistoryItem {
  month: Date;
  status: PaymentStatus;
}

export interface CreditInquiry {
  id: string;
  creditorName: string;
  inquiryDate: Date;
  inquiryType: "hard" | "soft";
  purpose?: string;
}

export interface PublicRecord {
  id: string;
  type: "bankruptcy" | "tax_lien" | "civil_judgment" | "foreclosure";
  dateFiledOrRecorded: Date;
  dateSatisfied?: Date;
  status: "active" | "released" | "dismissed";
  amount?: number;
  court?: string;
  caseNumber?: string;
}

export interface CollectionAccount {
  id: string;
  collectorName: string;
  originalCreditor?: string;
  accountNumber: string; // Masked
  dateOpened: Date;
  dateReported: Date;
  originalBalance: number;
  currentBalance: number;
  status: "open" | "paid" | "settled" | "deleted";
}

export interface DisputeStatus {
  isDisputed: boolean;
  disputeDate?: Date;
  disputeReason?: string;
  resolution?: "in_progress" | "verified" | "updated" | "deleted";
  resolutionDate?: Date;
}

/**
 * Analysis types for AI-powered credit review
 */
export interface CreditAnalysis {
  reportId: string;
  analyzedAt: Date;
  overallHealth: "excellent" | "good" | "fair" | "poor" | "very_poor";
  scoreBreakdown: {
    paymentHistory: number; // 35%
    creditUtilization: number; // 30%
    creditAge: number; // 15%
    creditMix: number; // 10%
    newCredit: number; // 10%
  };
  issues: CreditIssue[];
  recommendations: Recommendation[];
  disputeOpportunities: DisputeOpportunity[];
}

export interface CreditIssue {
  id: string;
  severity: "critical" | "major" | "minor" | "info";
  category: string;
  title: string;
  description: string;
  affectedAccount?: string;
  potentialScoreImpact: number;
}

export interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  category: "dispute" | "behavior" | "strategy";
  title: string;
  description: string;
  estimatedScoreImpact: number;
  timeframe: string;
  steps: string[];
}

export interface DisputeOpportunity {
  id: string;
  accountId: string;
  creditorName: string;
  reason: DisputeReason;
  confidence: "high" | "medium" | "low";
  description: string;
  suggestedAction: string;
}

export type DisputeReason =
  | "not_my_account"
  | "incorrect_balance"
  | "incorrect_payment_status"
  | "account_paid"
  | "duplicate_account"
  | "outdated_information"
  | "identity_theft"
  | "incorrect_dates"
  | "incorrect_credit_limit"
  | "account_closed"
  | "never_late"
  | "other";

/**
 * Provider-agnostic request/response types
 */
export interface PullCreditRequest {
  userId: string;
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: string; // YYYY-MM-DD
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  bureaus?: CreditBureau[];
  consentTimestamp: Date;
  ipAddress: string;
}

export interface PullCreditResponse {
  success: boolean;
  reports: CreditReport[];
  errors?: {
    bureau: CreditBureau;
    error: string;
  }[];
}

export interface SubmitDisputeRequest {
  userId: string;
  reportId: string;
  accountId: string;
  bureau: CreditBureau;
  reason: DisputeReason;
  explanation: string;
  supportingDocuments?: string[]; // URLs to uploaded documents
}

export interface SubmitDisputeResponse {
  success: boolean;
  disputeId: string;
  confirmationNumber: string;
  estimatedResolutionDate: Date;
}

