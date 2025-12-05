/**
 * Plaid Credit Bureau Provider (Alternative/Fallback)
 * 
 * Plaid offers credit data through their Liabilities and Credit products.
 * 
 * Documentation: https://plaid.com/docs/
 * Dashboard: https://dashboard.plaid.com
 * 
 * SETUP REQUIREMENTS:
 * 1. Create Plaid account at https://dashboard.plaid.com
 * 2. Apply for credit product access
 * 3. Complete compliance review
 * 4. Obtain client_id and secret
 */

import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  CreditReport,
  PullCreditRequest,
  PullCreditResponse,
} from "../types";

interface PlaidConfig {
  clientId: string;
  secret: string;
  environment: "sandbox" | "development" | "production";
  baseUrl: string;
}

@Injectable()
export class PlaidProvider {
  private readonly logger = new Logger(PlaidProvider.name);
  private readonly config: PlaidConfig;

  constructor(private readonly configService: ConfigService) {
    const env = this.configService.get<string>("PLAID_ENV", "sandbox");
    
    const envUrls: Record<string, string> = {
      sandbox: "https://sandbox.plaid.com",
      development: "https://development.plaid.com",
      production: "https://production.plaid.com",
    };

    this.config = {
      clientId: this.configService.get<string>("PLAID_CLIENT_ID", ""),
      secret: this.configService.get<string>("PLAID_SECRET", ""),
      environment: env as "sandbox" | "development" | "production",
      baseUrl: envUrls[env] || envUrls.sandbox,
    };
  }

  /**
   * Create a Link token for Plaid Link initialization
   * Used in frontend to open Plaid Link UI
   */
  async createLinkToken(
    userId: string,
    redirectUri?: string
  ): Promise<{ linkToken: string; expiration: Date }> {
    const payload = {
      client_id: this.config.clientId,
      secret: this.config.secret,
      user: { client_user_id: userId },
      client_name: "Horizon Credit Repair",
      products: ["liabilities"],
      country_codes: ["US"],
      language: "en",
      redirect_uri: redirectUri,
    };

    const response = await this.makeRequest("/link/token/create", payload);

    return {
      linkToken: response.link_token,
      expiration: new Date(response.expiration),
    };
  }

  /**
   * Exchange public token from Plaid Link for access token
   */
  async exchangePublicToken(
    publicToken: string
  ): Promise<{ accessToken: string; itemId: string }> {
    const payload = {
      client_id: this.config.clientId,
      secret: this.config.secret,
      public_token: publicToken,
    };

    const response = await this.makeRequest(
      "/item/public_token/exchange",
      payload
    );

    return {
      accessToken: response.access_token,
      itemId: response.item_id,
    };
  }

  /**
   * Get liabilities (credit card, mortgage, student loan data)
   */
  async getLiabilities(accessToken: string): Promise<any> {
    const payload = {
      client_id: this.config.clientId,
      secret: this.config.secret,
      access_token: accessToken,
    };

    return this.makeRequest("/liabilities/get", payload);
  }

  /**
   * Pull credit data through Plaid
   * Note: Plaid's credit product is different from traditional bureau pulls
   */
  async pullCreditReport(
    request: PullCreditRequest
  ): Promise<PullCreditResponse> {
    this.logger.log(
      `Plaid credit pull for user: ${request.userId} (requires Link flow)`
    );

    // Plaid uses a Link flow, so this would typically be called
    // after the user completes Plaid Link in the frontend
    throw new Error(
      "Plaid requires Link token flow. Use createLinkToken() first."
    );
  }

  /**
   * Make authenticated request to Plaid API
   */
  private async makeRequest(endpoint: string, body: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Plaid API error: ${error.error_type} - ${error.error_message}`
      );
    }

    return response.json();
  }
}

