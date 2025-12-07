import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ThrottlerModule } from "@nestjs/throttler";

// Controllers
import { HealthController } from "./controllers/health.controller";
import { AuthController } from "./controllers/auth.controller";
import { CustomerController } from "./controllers/customer.controller";
import { BillingController } from "./controllers/billing.controller";
import { CreditController } from "./controllers/credit.controller";
import { DisputeController } from "./controllers/dispute.controller";

@Module({
  imports: [
    // Environment Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // Microservice Clients
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || "localhost",
          port: parseInt(process.env.AUTH_SERVICE_PORT || "3002", 10),
        },
      },
      {
        name: "CUSTOMER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.CUSTOMER_SERVICE_HOST || "localhost",
          port: parseInt(process.env.CUSTOMER_SERVICE_PORT || "3006", 10),
        },
      },
      {
        name: "BILLING_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.BILLING_SERVICE_HOST || "localhost",
          port: parseInt(process.env.BILLING_SERVICE_PORT || "3003", 10),
        },
      },
      {
        name: "CREDIT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.CREDIT_SERVICE_HOST || "localhost",
          port: parseInt(process.env.CREDIT_SERVICE_PORT || "3004", 10),
        },
      },
      {
        name: "DISPUTE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.DISPUTE_SERVICE_HOST || "localhost",
          port: parseInt(process.env.DISPUTE_SERVICE_PORT || "3005", 10),
        },
      },
    ]),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000,
        limit: 10,
      },
      {
        name: "medium",
        ttl: 10000,
        limit: 50,
      },
      {
        name: "long",
        ttl: 60000,
        limit: 200,
      },
    ]),
  ],
  controllers: [
    HealthController,
    AuthController,
    CustomerController,
    BillingController,
    CreditController,
    DisputeController,
  ],
  providers: [],
})
export class AppModule {}
