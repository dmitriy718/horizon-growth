import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  UnauthorizedException,
  Inject,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { lastValueFrom } from "rxjs";
import { UpdateCustomerDto, CustomerWithUserDto } from "@horizon/contracts";

@ApiTags("Customers")
@ApiBearerAuth()
@Controller("customers")
export class CustomerController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy,
    @Inject("CUSTOMER_SERVICE") private readonly customerClient: ClientProxy
  ) {}

  @Get("me")
  @ApiOperation({ summary: "Get current user's customer profile" })
  async getMyProfile(
    @Headers("authorization") authHeader: string
  ): Promise<CustomerWithUserDto> {
    const userId = await this.getUserId(authHeader);
    return lastValueFrom(
      this.customerClient.send<CustomerWithUserDto>(
        { cmd: "customer_find_with_user" },
        { userId }
      )
    );
  }

  @Get("me/stats")
  @ApiOperation({ summary: "Get current user's credit repair stats" })
  async getMyStats(@Headers("authorization") authHeader: string) {
    const userId = await this.getUserId(authHeader);
    const customer = await lastValueFrom(
      this.customerClient.send({ cmd: "customer_find_by_user_id" }, { userId })
    );
    if (!customer) {
      throw new UnauthorizedException("Customer profile not found");
    }
    return lastValueFrom(
      this.customerClient.send({ cmd: "customer_stats" }, { customerId: customer.id })
    );
  }

  @Put("me")
  @ApiOperation({ summary: "Update current user's customer profile" })
  async updateMyProfile(
    @Headers("authorization") authHeader: string,
    @Body() dto: UpdateCustomerDto
  ): Promise<CustomerWithUserDto> {
    const userId = await this.getUserId(authHeader);
    const customer = await lastValueFrom(
      this.customerClient.send({ cmd: "customer_find_by_user_id" }, { userId })
    );
    if (!customer) {
      throw new UnauthorizedException("Customer profile not found");
    }
    return lastValueFrom(
      this.customerClient.send(
        { cmd: "customer_update" },
        { id: customer.id, userId, data: dto }
      )
    );
  }

  @Delete("me")
  @ApiOperation({ summary: "Delete current user's account (GDPR)" })
  async deleteMyAccount(
    @Headers("authorization") authHeader: string
  ): Promise<{ success: boolean }> {
    const userId = await this.getUserId(authHeader);
    const customer = await lastValueFrom(
      this.customerClient.send({ cmd: "customer_find_by_user_id" }, { userId })
    );
    if (!customer) {
      throw new UnauthorizedException("Customer profile not found");
    }
    return lastValueFrom(
      this.customerClient.send(
        { cmd: "customer_delete" },
        { id: customer.id, userId }
      )
    );
  }

  @Get("me/export")
  @ApiOperation({ summary: "Export all customer data (GDPR)" })
  async exportMyData(@Headers("authorization") authHeader: string) {
    const userId = await this.getUserId(authHeader);
    const customer = await lastValueFrom(
      this.customerClient.send({ cmd: "customer_find_by_user_id" }, { userId })
    );
    if (!customer) {
      throw new UnauthorizedException("Customer profile not found");
    }
    return lastValueFrom(
      this.customerClient.send(
        { cmd: "customer_export" },
        { customerId: customer.id, userId }
      )
    );
  }

  // Admin endpoints
  @Get()
  @ApiOperation({ summary: "List all customers (Admin)" })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "tier", required: false, type: String })
  async listCustomers(
    @Headers("authorization") authHeader: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("search") search?: string,
    @Query("tier") tier?: string
  ) {
    await this.getUserId(authHeader); // Verify auth
    // TODO: Add admin role check
    return lastValueFrom(
      this.customerClient.send(
        { cmd: "customer_list" },
        { page, limit, search, tier }
      )
    );
  }

  @Get(":id")
  @ApiOperation({ summary: "Get customer by ID (Admin)" })
  async getCustomer(
    @Headers("authorization") authHeader: string,
    @Param("id") id: string
  ): Promise<CustomerWithUserDto> {
    await this.getUserId(authHeader); // Verify auth
    // TODO: Add admin role check
    return lastValueFrom(
      this.customerClient.send<CustomerWithUserDto>(
        { cmd: "customer_find_with_user" },
        { id }
      )
    );
  }

  private async getUserId(authHeader: string): Promise<string> {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }
    const token = authHeader.substring(7);
    const payload = await lastValueFrom(
      this.authClient.send<{ valid: boolean; payload?: { sub: string } }>(
        { cmd: "verify_token" },
        { token }
      )
    );
    if (!payload.valid || !payload.payload) {
      throw new UnauthorizedException("Invalid token");
    }
    return payload.payload.sub;
  }
}

