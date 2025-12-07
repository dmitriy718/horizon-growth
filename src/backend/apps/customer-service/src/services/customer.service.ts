import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "@horizon/database";
import { Customer, Prisma } from "@prisma/client";

export interface CreateCustomerData {
  userId: string;
  ssnLast4?: string;
  dateOfBirth?: Date;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  goals?: string[];
  referralSource?: string;
}

export interface UpdateCustomerData {
  ssnLast4?: string;
  dateOfBirth?: Date;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  goals?: string[];
}

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerData): Promise<Customer> {
    return this.prisma.customer.create({
      data: {
        userId: data.userId,
        ssnLast4: data.ssnLast4,
        dateOfBirth: data.dateOfBirth,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        goals: data.goals || [],
        referralSource: data.referralSource,
      },
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: { userId },
    });
  }

  async findByIdWithUser(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
  }

  async findByUserIdWithUser(userId: string) {
    return this.prisma.customer.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, data: UpdateCustomerData): Promise<Customer> {
    // Verify ownership
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    if (customer.userId !== userId) {
      throw new ForbiddenException("Not authorized to update this customer");
    }

    return this.prisma.customer.update({
      where: { id },
      data: {
        ssnLast4: data.ssnLast4,
        dateOfBirth: data.dateOfBirth,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        goals: data.goals,
      },
    });
  }

  async updateSubscription(
    customerId: string,
    tier: "NONE" | "BASIC" | "PREMIER" | "PREMIER_PLUS",
    stripeCustomerId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<Customer> {
    return this.prisma.customer.update({
      where: { id: customerId },
      data: {
        subscriptionTier: tier,
        stripeCustomerId,
        subscriptionStartDate: startDate,
        subscriptionEndDate: endDate,
      },
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    // Verify ownership
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    if (customer.userId !== userId) {
      throw new ForbiddenException("Not authorized to delete this customer");
    }

    // Soft delete the user (which cascades to customer)
    await this.prisma.user.update({
      where: { id: userId },
      data: { status: "DELETED" },
    });
  }

  async getCustomerStats(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        creditScores: {
          orderBy: { recordedAt: "desc" },
          take: 3,
        },
        disputes: {
          where: {
            status: {
              notIn: ["DRAFT"],
            },
          },
        },
        creditReports: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException("Customer not found");
    }

    const totalDisputes = customer.disputes.length;
    const resolvedDisputes = customer.disputes.filter(d => d.status === "RESOLVED").length;
    const deletedItems = customer.disputes.filter(d => d.resolution === "DELETED").length;

    return {
      customerId,
      subscriptionTier: customer.subscriptionTier,
      latestScores: customer.creditScores.reduce((acc, score) => {
        acc[score.bureau.toLowerCase()] = score.score;
        return acc;
      }, {} as Record<string, number>),
      totalDisputes,
      resolvedDisputes,
      deletedItems,
      successRate: totalDisputes > 0 ? Math.round((deletedItems / totalDisputes) * 100) : 0,
      hasRecentReport: customer.creditReports.length > 0,
    };
  }

  async listCustomers(options: {
    page?: number;
    limit?: number;
    search?: string;
    tier?: string;
  }) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.CustomerWhereInput = {};

    if (options.tier) {
      where.subscriptionTier = options.tier as any;
    }

    if (options.search) {
      where.user = {
        OR: [
          { email: { contains: options.search, mode: "insensitive" } },
          { firstName: { contains: options.search, mode: "insensitive" } },
          { lastName: { contains: options.search, mode: "insensitive" } },
        ],
      };
    }

    const [customers, total] = await Promise.all([
      this.prisma.customer.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.customer.count({ where }),
    ]);

    return {
      customers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async exportCustomerData(customerId: string, userId: string) {
    // Verify ownership
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer || customer.userId !== userId) {
      throw new ForbiddenException("Not authorized");
    }

    // Get all customer data for GDPR export
    const data = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            createdAt: true,
          },
        },
        creditReports: true,
        creditScores: true,
        disputes: {
          include: {
            activities: true,
          },
        },
        documents: true,
        payments: true,
      },
    });

    return data;
  }
}

