import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { HealthController } from "./controllers/health.controller";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

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
        limit: 100,
      },
    ]),

    // Feature modules will be imported here
    // AuthModule,
    // CustomerModule,
    // CreditModule,
    // DisputeModule,
    // BillingModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

