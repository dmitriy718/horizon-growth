// Dispute DTOs

export type DisputeStatus = 
  | "DRAFT"
  | "GENERATED"
  | "SUBMITTED"
  | "IN_REVIEW"
  | "PENDING_RESPONSE"
  | "RESPONDED"
  | "RESOLVED"
  | "ESCALATED";

export type DisputeResolution = 
  | "DELETED"
  | "UPDATED"
  | "VERIFIED"
  | "REMAINS"
  | "PARTIAL";

export type DisputeType =
  | "NOT_MINE"
  | "PAID"
  | "DUPLICATE"
  | "INCORRECT_BALANCE"
  | "INCORRECT_STATUS"
  | "INCORRECT_DATE"
  | "UNAUTHORIZED"
  | "FRAUD"
  | "OTHER";

export interface CreateDisputeDto {
  customerId: string;
  tradelineId?: string;
  bureau: "EXPERIAN" | "EQUIFAX" | "TRANSUNION";
  disputeType: DisputeType;
  reason: string;
  customReason?: string;
}

export interface DisputeDto {
  id: string;
  customerId: string;
  tradelineId?: string;
  bureau: "EXPERIAN" | "EQUIFAX" | "TRANSUNION";
  disputeType: DisputeType;
  reason: string;
  customReason?: string;
  aiReasons?: string[];
  successProbability?: number;
  recommendedStrategy?: string;
  status: DisputeStatus;
  submittedAt?: string;
  responseDeadline?: string;
  resolvedAt?: string;
  resolution?: DisputeResolution;
  letterUrl?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DisputeActivityDto {
  id: string;
  disputeId: string;
  activityType: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface GenerateLetterRequestDto {
  disputeId: string;
  userId: string;
  userName: string;
  userAddress: string;
  creditorName: string;
  creditorAddress?: string;
  accountNumber?: string;
  amount?: string;
  reason: string;
}

export interface DisputeSummaryDto {
  totalDisputes: number;
  activeDisputes: number;
  resolvedDisputes: number;
  successRate: number;
  byStatus: Record<DisputeStatus, number>;
  byResolution: Record<DisputeResolution, number>;
}

