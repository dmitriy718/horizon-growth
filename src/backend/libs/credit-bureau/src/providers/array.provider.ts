/**
 * Array Credit Bureau Provider
 * 
 * Array provides a unified API for credit data access, including:
 * - Tri-bureau credit reports
 * - Credit scores
 * - Credit monitoring
 * - Dispute submission
 * 
 * Documentation: https://docs.array.com
 * Dashboard: https://dashboard.array.com
 * 
 * SETUP REQUIREMENTS:
 * 1. Create Array account at https://array.com/developers
 * 2. Complete business verification
 * 3. Obtain API credentials
 * 4. Configure webhook for credit monitoring alerts
 */

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  CreditBureau,
  CreditReport,
  PullCreditRequest,
  PullCreditResponse,
  SubmitDisputeRequest,
  SubmitDisputeResponse,
} from "../types";

interface ArrayConfig {
  apiKey: string;
  secretKey: string;
  environment: "sandbox" | "production";
  baseUrl: string;
}

@Injectable()
export class ArrayProvider {
  private readonly logger = new Logger(ArrayProvider.name);
  private readonly config: ArrayConfig;

  constructor(private readonly configService: ConfigService) {
    const env = this.configService.get<string>("ARRAY_ENVIRONMENT", "sandbox");
    
    this.config = {
      apiKey: this.configService.get<string>("ARRAY_API_KEY", ""),
      secretKey: this.configService.get<string>("ARRAY_SECRET", ""),
      environment: env as "sandbox" | "production",
      baseUrl:
        env === "production"
          ? "https://api.array.com/v1"
          : "https://sandbox.array.com/v1",
    };

    if (!this.config.apiKey) {
      this.logger.warn(
        "Array API key not configured. Credit pulls will fail in production."
      );
    }
  }

  /**
   * Authenticate user and initiate credit report pull
   */
  async pullCreditReport(
    request: PullCreditRequest
  ): Promise<PullCreditResponse> {
    this.logger.log(`Initiating credit pull for user: ${request.userId}`);

    // Validate required fields
    this.validateRequest(request);

    try {
      // Step 1: Create user in Array
      const arrayUserId = await this.createOrGetUser(request);

      // Step 2: Initiate credit pull with consent
      const reports = await this.initiateCreditPull(arrayUserId, request);

      return {
        success: true,
        reports,
      };
    } catch (error) {
      this.logger.error(`Credit pull failed: ${error}`);
      throw error;
    }
  }

  /**
   * Create or retrieve user in Array system
   */
  private async createOrGetUser(request: PullCreditRequest): Promise<string> {
    const payload = {
      externalId: request.userId,
      firstName: request.firstName,
      lastName: request.lastName,
      dateOfBirth: request.dateOfBirth,
      ssn: request.ssn, // Encrypted in transit
      address: request.address,
      consent: {
        timestamp: request.consentTimestamp.toISOString(),
        ipAddress: request.ipAddress,
        terms: "credit_pull_v1",
      },
    };

    const response = await this.makeRequest("POST", "/users", payload);
    return response.userId;
  }

  /**
   * Initiate credit pull from selected bureaus
   */
  private async initiateCreditPull(
    arrayUserId: string,
    request: PullCreditRequest
  ): Promise<CreditReport[]> {
    const bureaus = request.bureaus || ["experian", "equifax", "transunion"];

    const payload = {
      userId: arrayUserId,
      bureaus,
      product: "credit_report_with_score",
    };

    const response = await this.makeRequest(
      "POST",
      "/credit/pull",
      payload
    );

    // Transform Array response to our standardized format
    return this.transformReports(response.reports, request.userId);
  }

  /**
   * Submit a dispute to a credit bureau
   */
  async submitDispute(
    request: SubmitDisputeRequest
  ): Promise<SubmitDisputeResponse> {
    this.logger.log(
      `Submitting dispute for account: ${request.accountId} to ${request.bureau}`
    );

    const payload = {
      userId: request.userId,
      bureau: request.bureau,
      accountIdentifier: request.accountId,
      disputeType: request.reason,
      description: request.explanation,
      documents: request.supportingDocuments,
    };

    const response = await this.makeRequest(
      "POST",
      "/disputes",
      payload
    );

    return {
      success: true,
      disputeId: response.disputeId,
      confirmationNumber: response.confirmationNumber,
      estimatedResolutionDate: new Date(response.estimatedResolution),
    };
  }

  /**
   * Get dispute status
   */
  async getDisputeStatus(disputeId: string): Promise<{
    status: "pending" | "in_progress" | "resolved";
    resolution?: "verified" | "updated" | "deleted";
    updatedAt: Date;
  }> {
    const response = await this.makeRequest(
      "GET",
      `/disputes/${disputeId}`
    );

    return {
      status: response.status,
      resolution: response.resolution,
      updatedAt: new Date(response.updatedAt),
    };
  }

  /**
   * Set up credit monitoring alerts
   */
  async enableCreditMonitoring(userId: string): Promise<{
    monitoringId: string;
    startDate: Date;
  }> {
    const response = await this.makeRequest(
      "POST",
      "/monitoring/enable",
      { userId, alertTypes: ["score_change", "new_account", "inquiry", "derogatory"] }
    );

    return {
      monitoringId: response.monitoringId,
      startDate: new Date(response.startDate),
    };
  }

  /**
   * Transform Array API response to our standardized format
   */
  private transformReports(
    arrayReports: any[],
    userId: string
  ): CreditReport[] {
    return arrayReports.map((report) => ({
      id: report.reportId,
      userId,
      bureau: report.bureau as CreditBureau,
      pullDate: new Date(report.pullDate),
      score: {
        bureau: report.bureau,
        score: report.score.value,
        scoreModel: report.score.model,
        dateGenerated: new Date(report.score.date),
        factors: report.score.factors.map((f: any) => ({
          code: f.code,
          description: f.text,
          impact: this.mapFactorImpact(f.impact),
        })),
      },
      personalInfo: this.transformPersonalInfo(report.consumer),
      accounts: this.transformAccounts(report.tradelines),
      inquiries: this.transformInquiries(report.inquiries),
      publicRecords: this.transformPublicRecords(report.publicRecords),
      collections: this.transformCollections(report.collections),
    }));
  }

  private transformPersonalInfo(consumer: any) {
    return {
      firstName: consumer.firstName,
      lastName: consumer.lastName,
      middleName: consumer.middleName,
      dateOfBirth: new Date(consumer.dob),
      ssn: consumer.ssnLast4,
      addresses: consumer.addresses.map((a: any) => ({
        type: a.current ? "current" : "previous",
        street: a.street,
        city: a.city,
        state: a.state,
        zip: a.zip,
        dateReported: new Date(a.reportedDate),
      })),
      employers: consumer.employers?.map((e: any) => ({
        name: e.name,
        dateReported: new Date(e.reportedDate),
      })) || [],
    };
  }

  private transformAccounts(tradelines: any[]) {
    return tradelines.map((t) => ({
      id: t.id,
      accountNumber: t.accountNumberMasked,
      creditorName: t.creditorName,
      accountType: this.mapAccountType(t.accountType),
      accountStatus: this.mapAccountStatus(t.status),
      dateOpened: new Date(t.dateOpened),
      dateClosed: t.dateClosed ? new Date(t.dateClosed) : undefined,
      dateLastActive: new Date(t.lastActivity),
      creditLimit: t.creditLimit,
      highBalance: t.highBalance,
      currentBalance: t.balance,
      monthlyPayment: t.monthlyPayment,
      paymentStatus: this.mapPaymentStatus(t.paymentStatus),
      paymentHistory: t.paymentHistory.map((h: any) => ({
        month: new Date(h.date),
        status: this.mapPaymentStatus(h.status),
      })),
      responsibilityType: t.responsibility.toLowerCase(),
      remarks: t.remarks,
      disputeStatus: t.dispute
        ? {
            isDisputed: true,
            disputeDate: new Date(t.dispute.date),
            disputeReason: t.dispute.reason,
            resolution: t.dispute.resolution,
            resolutionDate: t.dispute.resolutionDate
              ? new Date(t.dispute.resolutionDate)
              : undefined,
          }
        : undefined,
    }));
  }

  private transformInquiries(inquiries: any[]) {
    return inquiries.map((i) => ({
      id: i.id,
      creditorName: i.creditorName,
      inquiryDate: new Date(i.date),
      inquiryType: i.type === "hard" ? "hard" : "soft",
      purpose: i.purpose,
    }));
  }

  private transformPublicRecords(records: any[]) {
    return records.map((r) => ({
      id: r.id,
      type: r.type.toLowerCase(),
      dateFiledOrRecorded: new Date(r.dateFiled),
      dateSatisfied: r.dateSatisfied ? new Date(r.dateSatisfied) : undefined,
      status: r.status.toLowerCase(),
      amount: r.amount,
      court: r.court,
      caseNumber: r.caseNumber,
    }));
  }

  private transformCollections(collections: any[]) {
    return collections.map((c) => ({
      id: c.id,
      collectorName: c.collectorName,
      originalCreditor: c.originalCreditor,
      accountNumber: c.accountNumberMasked,
      dateOpened: new Date(c.dateOpened),
      dateReported: new Date(c.dateReported),
      originalBalance: c.originalBalance,
      currentBalance: c.balance,
      status: c.status.toLowerCase(),
    }));
  }

  private mapFactorImpact(impact: string): "high" | "medium" | "low" {
    const mapping: Record<string, "high" | "medium" | "low"> = {
      HIGH: "high",
      MEDIUM: "medium",
      LOW: "low",
    };
    return mapping[impact] || "low";
  }

  private mapAccountType(type: string) {
    const mapping: Record<string, string> = {
      REVOLVING: "revolving",
      INSTALLMENT: "installment",
      MORTGAGE: "mortgage",
      AUTO: "auto",
      STUDENT: "student",
      CREDIT_CARD: "credit_card",
    };
    return mapping[type] || "other";
  }

  private mapAccountStatus(status: string) {
    const mapping: Record<string, string> = {
      OPEN: "open",
      CLOSED: "closed",
      PAID: "paid",
      CHARGED_OFF: "charged_off",
    };
    return mapping[status] || "open";
  }

  private mapPaymentStatus(status: string) {
    const mapping: Record<string, string> = {
      CURRENT: "current",
      "30_DAYS": "30_days_late",
      "60_DAYS": "60_days_late",
      "90_DAYS": "90_days_late",
      "120_DAYS": "120_days_late",
      COLLECTION: "collection",
      CHARGE_OFF: "charge_off",
    };
    return mapping[status] || "current";
  }

  private validateRequest(request: PullCreditRequest): void {
    if (!request.ssn || request.ssn.length !== 9) {
      throw new Error("Valid SSN is required for credit pull");
    }
    if (!request.firstName || !request.lastName) {
      throw new Error("Full name is required");
    }
    if (!request.consentTimestamp) {
      throw new Error("User consent timestamp is required");
    }
  }

  /**
   * Make authenticated request to Array API
   */
  private async makeRequest(
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    body?: any
  ): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    // In sandbox mode, return mock data for development
    if (this.config.environment === "sandbox" && !this.config.apiKey) {
      this.logger.warn(`Sandbox mode: Returning mock data for ${endpoint}`);
      return this.getMockResponse(endpoint, method);
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
        "X-Array-Secret": this.config.secretKey,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Array API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Mock responses for sandbox/development mode
   */
  private getMockResponse(endpoint: string, method: string): any {
    if (endpoint === "/users" && method === "POST") {
      return { userId: `array_user_${Date.now()}` };
    }

    if (endpoint === "/credit/pull" && method === "POST") {
      return {
        reports: [
          this.getMockReport("experian"),
          this.getMockReport("equifax"),
          this.getMockReport("transunion"),
        ],
      };
    }

    if (endpoint.startsWith("/disputes") && method === "POST") {
      return {
        disputeId: `disp_${Date.now()}`,
        confirmationNumber: `CONF${Date.now()}`,
        estimatedResolution: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      };
    }

    return {};
  }

  private getMockReport(bureau: string): any {
    return {
      reportId: `${bureau}_${Date.now()}`,
      bureau,
      pullDate: new Date().toISOString(),
      score: {
        value: Math.floor(Math.random() * 200) + 600, // 600-800 range
        model: "FICO8",
        date: new Date().toISOString(),
        factors: [
          { code: "01", text: "Length of credit history", impact: "MEDIUM" },
          { code: "02", text: "Credit utilization", impact: "HIGH" },
        ],
      },
      consumer: {
        firstName: "Test",
        lastName: "User",
        dob: "1990-01-01",
        ssnLast4: "1234",
        addresses: [
          {
            current: true,
            street: "123 Test St",
            city: "Duncan",
            state: "SC",
            zip: "29334",
            reportedDate: new Date().toISOString(),
          },
        ],
        employers: [],
      },
      tradelines: [],
      inquiries: [],
      publicRecords: [],
      collections: [],
    };
  }
}

