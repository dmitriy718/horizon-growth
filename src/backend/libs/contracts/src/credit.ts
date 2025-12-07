// Credit DTOs

export type CreditBureau = "EXPERIAN" | "EQUIFAX" | "TRANSUNION";

export interface CreditScoreDto {
  id: string;
  customerId: string;
  bureau: CreditBureau;
  scoreType: string;
  score: number;
  factors?: string[];
  recordedAt: string;
}

export interface CreditReportDto {
  id: string;
  customerId: string;
  bureau: CreditBureau;
  reportDate: string;
  status: "PENDING" | "PROCESSING" | "PARSED" | "ERROR";
  tradelines: TradelineDto[];
  inquiries: InquiryDto[];
  publicRecords: PublicRecordDto[];
  createdAt: string;
}

export interface TradelineDto {
  id: string;
  creditReportId: string;
  creditorName: string;
  accountNumber?: string;
  accountType: string;
  accountStatus?: string;
  dateOpened?: string;
  dateClosed?: string;
  lastActivityDate?: string;
  creditLimit?: number;
  highBalance?: number;
  currentBalance?: number;
  paymentStatus?: string;
  isNegative: boolean;
  isDisputable: boolean;
}

export interface InquiryDto {
  id: string;
  creditReportId: string;
  creditorName: string;
  inquiryDate: string;
  inquiryType: "HARD" | "SOFT";
}

export interface PublicRecordDto {
  id: string;
  creditReportId: string;
  recordType: string;
  courtName?: string;
  caseNumber?: string;
  filedDate?: string;
  amount?: number;
  status?: string;
}

export interface CreditSummaryDto {
  scores: {
    experian?: number;
    equifax?: number;
    transunion?: number;
    average: number;
  };
  totalAccounts: number;
  negativeItems: number;
  openCollections: number;
  hardInquiries: number;
  utilization?: number;
  oldestAccount?: string;
  recentActivity?: string;
}

export interface ParseReportRequestDto {
  text: string;
  customerId: string;
  bureau: CreditBureau;
}

export interface AIAnalysisDto {
  reasons: string[];
  probability: number;
  recommendedStrategy: string;
}

