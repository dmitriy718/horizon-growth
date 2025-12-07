import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CustomerService, CreateCustomerData, UpdateCustomerData } from "../services/customer.service";

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: "customer_create" })
  async create(@Payload() data: CreateCustomerData) {
    return this.customerService.create(data);
  }

  @MessagePattern({ cmd: "customer_find_by_id" })
  async findById(@Payload() data: { id: string }) {
    return this.customerService.findById(data.id);
  }

  @MessagePattern({ cmd: "customer_find_by_user_id" })
  async findByUserId(@Payload() data: { userId: string }) {
    return this.customerService.findByUserId(data.userId);
  }

  @MessagePattern({ cmd: "customer_find_with_user" })
  async findWithUser(@Payload() data: { id?: string; userId?: string }) {
    if (data.id) {
      return this.customerService.findByIdWithUser(data.id);
    }
    if (data.userId) {
      return this.customerService.findByUserIdWithUser(data.userId);
    }
    return null;
  }

  @MessagePattern({ cmd: "customer_update" })
  async update(@Payload() data: { id: string; userId: string; data: UpdateCustomerData }) {
    return this.customerService.update(data.id, data.userId, data.data);
  }

  @MessagePattern({ cmd: "customer_update_subscription" })
  async updateSubscription(
    @Payload()
    data: {
      customerId: string;
      tier: "NONE" | "BASIC" | "PREMIER" | "PREMIER_PLUS";
      stripeCustomerId?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    return this.customerService.updateSubscription(
      data.customerId,
      data.tier,
      data.stripeCustomerId,
      data.startDate ? new Date(data.startDate) : undefined,
      data.endDate ? new Date(data.endDate) : undefined
    );
  }

  @MessagePattern({ cmd: "customer_delete" })
  async delete(@Payload() data: { id: string; userId: string }) {
    await this.customerService.delete(data.id, data.userId);
    return { success: true };
  }

  @MessagePattern({ cmd: "customer_stats" })
  async getStats(@Payload() data: { customerId: string }) {
    return this.customerService.getCustomerStats(data.customerId);
  }

  @MessagePattern({ cmd: "customer_list" })
  async list(
    @Payload()
    data: {
      page?: number;
      limit?: number;
      search?: string;
      tier?: string;
    }
  ) {
    return this.customerService.listCustomers(data);
  }

  @MessagePattern({ cmd: "customer_export" })
  async exportData(@Payload() data: { customerId: string; userId: string }) {
    return this.customerService.exportCustomerData(data.customerId, data.userId);
  }
}

