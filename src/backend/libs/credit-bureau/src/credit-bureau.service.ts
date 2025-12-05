/**
 * Credit Bureau Service
 * 
 * Unified service that orchestrates credit data operations
 * across different providers.
 */

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ArrayProvider } from "./providers/array.provider";
import { PlaidProvider } from "./providers/plaid.provider";
import {
  CreditAnalysis,
  CreditReport,
  DisputeOpportunity,
  PullCreditRequest,
  PullCreditResponse,
  SubmitDisputeRequest,
  SubmitDisputeResponse,
} from "./types";

@Injectable()
export class CreditBureauService {
  private readonly logger = new Logger(CreditBureauService.name);
  private readonly primaryProvider: "array" | "plaid";

  constructor(
    private readonly configService: ConfigService,
    private readonly arrayProvider: ArrayProvider,
    private readonly plaidProvider: PlaidProvider
  ) {
    // Array is primary, Plaid is fallback
    this.primaryProvider = this.configService.get<"array" | "plaid">(
      "CREDIT_PRIMARY_PROVIDER",
      "array"
    );
    this.logger.log(`Credit bureau service initialized. Primary: ${this.primaryProvider}`);
  }

  /**
   * Pull credit reports from all three bureaus
   */
  async pullFullCreditReport(
    request: PullCreditRequest
  ): Promise<PullCreditResponse> {
    this.logger.log(`Initiating full credit pull for user: ${request.userId}`);

    try {
      // Use Array as primary provider
      if (this.primaryProvider === "array") {
        return await this.arrayProvider.pullCreditReport(request);
      }

      // Plaid would require Link flow
      throw new Error("Configure Array as primary provider for direct credit pulls");
    } catch (error) {
      this.logger.error(`Credit pull failed: ${error}`);
      throw error;
    }
  }

  /**
   * Submit a dispute to a credit bureau
   */
  async submitDispute(
    request: SubmitDisputeRequest
  ): Promise<SubmitDisputeResponse> {
    this.logger.log(
      `Submitting dispute for account ${request.accountId} to ${request.bureau}`
    );

    return this.arrayProvider.submitDispute(request);
  }

  /**
   * Check status of an existing dispute
   */
  async getDisputeStatus(disputeId: string) {
    return this.arrayProvider.getDisputeStatus(disputeId);
  }

  /**
   * Enable credit monitoring for a user
   */
  async enableCreditMonitoring(userId: string) {
    return this.arrayProvider.enableCreditMonitoring(userId);
  }

  /**
   * Analyze credit report and identify issues/opportunities
   * This would integrate with OpenAI for intelligent analysis
   */
  async analyzeCreditReport(report: CreditReport): Promise<CreditAnalysis> {
    this.logger.log(`Analyzing credit report: ${report.id}`);

    const issues = this.identifyIssues(report);
    const opportunities = this.identifyDisputeOpportunities(report);
    const recommendations = this.generateRecommendations(report, issues);

    return {
      reportId: report.id,
      analyzedAt: new Date(),
      overallHealth: this.calculateOverallHealth(report.score.score),
      scoreBreakdown: this.calculateScoreBreakdown(report),
      issues,
      recommendations,
      disputeOpportunities: opportunities,
    };
  }

  /**
   * Calculate overall credit health from score
   */
  private calculateOverallHealth(
    score: number
  ): "excellent" | "good" | "fair" | "poor" | "very_poor" {
    if (score >= 750) return "excellent";
    if (score >= 700) return "good";
    if (score >= 650) return "fair";
    if (score >= 550) return "poor";
    return "very_poor";
  }

  /**
   * Calculate breakdown of score factors
   */
  private calculateScoreBreakdown(report: CreditReport) {
    const accounts = report.accounts;
    
    // Payment history (35%)
    const latePayments = accounts.filter(
      (a) => a.paymentStatus !== "current"
    ).length;
    const paymentHistory = Math.max(0, 100 - latePayments * 15);

    // Credit utilization (30%)
    const revolvingAccounts = accounts.filter(
      (a) => a.accountType === "revolving" || a.accountType === "credit_card"
    );
    const totalLimit = revolvingAccounts.reduce(
      (sum, a) => sum + (a.creditLimit || 0),
      0
    );
    const totalBalance = revolvingAccounts.reduce(
      (sum, a) => sum + a.currentBalance,
      0
    );
    const utilization = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;
    const creditUtilization = Math.max(0, 100 - utilization * 2);

    // Credit age (15%)
    const oldestAccount = accounts.reduce((oldest, a) => {
      return a.dateOpened < oldest ? a.dateOpened : oldest;
    }, new Date());
    const ageInYears =
      (Date.now() - oldestAccount.getTime()) / (365 * 24 * 60 * 60 * 1000);
    const creditAge = Math.min(100, ageInYears * 10);

    // Credit mix (10%)
    const accountTypes = new Set(accounts.map((a) => a.accountType));
    const creditMix = Math.min(100, accountTypes.size * 25);

    // New credit (10%)
    const recentInquiries = report.inquiries.filter(
      (i) =>
        i.inquiryType === "hard" &&
        Date.now() - i.inquiryDate.getTime() < 365 * 24 * 60 * 60 * 1000
    ).length;
    const newCredit = Math.max(0, 100 - recentInquiries * 20);

    return {
      paymentHistory: Math.round(paymentHistory),
      creditUtilization: Math.round(creditUtilization),
      creditAge: Math.round(creditAge),
      creditMix: Math.round(creditMix),
      newCredit: Math.round(newCredit),
    };
  }

  /**
   * Identify issues in the credit report
   */
  private identifyIssues(report: CreditReport) {
    const issues: CreditAnalysis["issues"] = [];

    // Check for late payments
    report.accounts.forEach((account) => {
      if (account.paymentStatus !== "current") {
        issues.push({
          id: `late_${account.id}`,
          severity: this.getLateSeverity(account.paymentStatus),
          category: "Payment History",
          title: `Late payment on ${account.creditorName}`,
          description: `Account shows ${account.paymentStatus.replace("_", " ")} status`,
          affectedAccount: account.id,
          potentialScoreImpact: this.estimateLatePaymentImpact(
            account.paymentStatus
          ),
        });
      }
    });

    // Check for high utilization
    const revolvingAccounts = report.accounts.filter(
      (a) => a.accountType === "revolving" || a.accountType === "credit_card"
    );
    revolvingAccounts.forEach((account) => {
      if (account.creditLimit && account.currentBalance / account.creditLimit > 0.3) {
        const utilization = Math.round(
          (account.currentBalance / account.creditLimit) * 100
        );
        issues.push({
          id: `util_${account.id}`,
          severity: utilization > 70 ? "major" : "minor",
          category: "Credit Utilization",
          title: `High utilization on ${account.creditorName}`,
          description: `${utilization}% utilization (recommended: under 30%)`,
          affectedAccount: account.id,
          potentialScoreImpact: Math.min(50, utilization - 30),
        });
      }
    });

    // Check for collections
    report.collections.forEach((collection) => {
      if (collection.status === "open") {
        issues.push({
          id: `coll_${collection.id}`,
          severity: "critical",
          category: "Collections",
          title: `Collection from ${collection.collectorName}`,
          description: `Original creditor: ${collection.originalCreditor || "Unknown"}. Balance: $${collection.currentBalance}`,
          affectedAccount: collection.id,
          potentialScoreImpact: 100,
        });
      }
    });

    // Check for public records
    report.publicRecords.forEach((record) => {
      if (record.status === "active") {
        issues.push({
          id: `pub_${record.id}`,
          severity: "critical",
          category: "Public Records",
          title: `${record.type.charAt(0).toUpperCase() + record.type.slice(1)}`,
          description: `Filed: ${record.dateFiledOrRecorded.toLocaleDateString()}`,
          affectedAccount: record.id,
          potentialScoreImpact: 150,
        });
      }
    });

    // Check for too many hard inquiries
    const recentInquiries = report.inquiries.filter(
      (i) =>
        i.inquiryType === "hard" &&
        Date.now() - i.inquiryDate.getTime() < 365 * 24 * 60 * 60 * 1000
    );
    if (recentInquiries.length > 4) {
      issues.push({
        id: "inquiries",
        severity: "minor",
        category: "New Credit",
        title: "Multiple recent inquiries",
        description: `${recentInquiries.length} hard inquiries in the last 12 months`,
        potentialScoreImpact: (recentInquiries.length - 4) * 5,
      });
    }

    return issues.sort((a, b) => b.potentialScoreImpact - a.potentialScoreImpact);
  }

  /**
   * Identify potential dispute opportunities
   */
  private identifyDisputeOpportunities(
    report: CreditReport
  ): DisputeOpportunity[] {
    const opportunities: DisputeOpportunity[] = [];

    // Old negative items (7+ years for most items)
    report.accounts.forEach((account) => {
      if (account.paymentStatus !== "current") {
        const ageInYears =
          (Date.now() - account.dateLastActive.getTime()) /
          (365 * 24 * 60 * 60 * 1000);
        if (ageInYears > 6.5) {
          opportunities.push({
            id: `old_${account.id}`,
            accountId: account.id,
            creditorName: account.creditorName,
            reason: "outdated_information",
            confidence: "high",
            description: `Account is ${Math.round(ageInYears)} years old and may be near statute of limitations`,
            suggestedAction: "Request removal due to age",
          });
        }
      }
    });

    // Collections that may have issues
    report.collections.forEach((collection) => {
      // Check if original creditor info is missing
      if (!collection.originalCreditor) {
        opportunities.push({
          id: `coll_unknown_${collection.id}`,
          accountId: collection.id,
          creditorName: collection.collectorName,
          reason: "not_my_account",
          confidence: "medium",
          description: "Original creditor not listed - may not have proper documentation",
          suggestedAction: "Request debt validation",
        });
      }

      // Old collections
      const ageInYears =
        (Date.now() - collection.dateOpened.getTime()) /
        (365 * 24 * 60 * 60 * 1000);
      if (ageInYears > 6) {
        opportunities.push({
          id: `coll_old_${collection.id}`,
          accountId: collection.id,
          creditorName: collection.collectorName,
          reason: "outdated_information",
          confidence: "high",
          description: `Collection is ${Math.round(ageInYears)} years old`,
          suggestedAction: "Request removal due to age",
        });
      }
    });

    // Paid collections still showing
    report.collections
      .filter((c) => c.status === "paid" && c.currentBalance === 0)
      .forEach((collection) => {
        opportunities.push({
          id: `coll_paid_${collection.id}`,
          accountId: collection.id,
          creditorName: collection.collectorName,
          reason: "account_paid",
          confidence: "high",
          description: "Paid collection should be marked as satisfied or removed",
          suggestedAction: "Request update to show paid status or removal",
        });
      });

    return opportunities.sort((a, b) => {
      const confidenceOrder = { high: 0, medium: 1, low: 2 };
      return confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    });
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    report: CreditReport,
    issues: CreditAnalysis["issues"]
  ) {
    const recommendations: CreditAnalysis["recommendations"] = [];

    // High utilization recommendations
    const highUtilIssues = issues.filter(
      (i) => i.category === "Credit Utilization"
    );
    if (highUtilIssues.length > 0) {
      recommendations.push({
        id: "reduce_util",
        priority: "high",
        category: "behavior",
        title: "Reduce credit card balances",
        description:
          "Paying down credit card balances is one of the fastest ways to improve your score",
        estimatedScoreImpact: 30,
        timeframe: "1-2 months",
        steps: [
          "List all credit cards with balances above 30% utilization",
          "Focus on paying down the highest utilization cards first",
          "Consider the snowball method for motivation",
          "Request credit limit increases (without hard inquiries)",
        ],
      });
    }

    // Collection recommendations
    const collectionIssues = issues.filter((i) => i.category === "Collections");
    if (collectionIssues.length > 0) {
      recommendations.push({
        id: "dispute_collections",
        priority: "high",
        category: "dispute",
        title: "Dispute collection accounts",
        description: "Collections often have inaccuracies that can be disputed",
        estimatedScoreImpact: 50,
        timeframe: "30-45 days per dispute",
        steps: [
          "Send debt validation letters to each collection agency",
          "Review responses for FCRA compliance",
          "Dispute inaccurate information with credit bureaus",
          "Negotiate pay-for-delete if validation is provided",
        ],
      });
    }

    // Late payment recommendations
    const latePaymentIssues = issues.filter(
      (i) => i.category === "Payment History"
    );
    if (latePaymentIssues.length > 0) {
      recommendations.push({
        id: "goodwill",
        priority: "medium",
        category: "strategy",
        title: "Request goodwill adjustments",
        description:
          "Creditors sometimes remove late payments as a courtesy for good customers",
        estimatedScoreImpact: 20,
        timeframe: "2-4 weeks",
        steps: [
          "Identify accounts with isolated late payments",
          "Write goodwill letters explaining circumstances",
          "Highlight your positive payment history since",
          "Be polite and persistent",
        ],
      });
    }

    // Credit mix recommendation
    const accountTypes = new Set(report.accounts.map((a) => a.accountType));
    if (accountTypes.size < 3) {
      recommendations.push({
        id: "credit_mix",
        priority: "low",
        category: "strategy",
        title: "Diversify your credit mix",
        description:
          "Having different types of credit accounts shows you can manage various credit types",
        estimatedScoreImpact: 10,
        timeframe: "3-6 months",
        steps: [
          "Consider a credit-builder loan if you don't have installment credit",
          "Become an authorized user on a family member's card",
          "Apply for a secured credit card if needed",
          "Only open new accounts strategically",
        ],
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private getLateSeverity(
    status: string
  ): "critical" | "major" | "minor" | "info" {
    if (status.includes("90") || status.includes("120") || status.includes("150")) {
      return "critical";
    }
    if (status.includes("60")) {
      return "major";
    }
    return "minor";
  }

  private estimateLatePaymentImpact(status: string): number {
    if (status.includes("150") || status.includes("180")) return 120;
    if (status.includes("120")) return 100;
    if (status.includes("90")) return 80;
    if (status.includes("60")) return 50;
    if (status.includes("30")) return 30;
    return 20;
  }
}

