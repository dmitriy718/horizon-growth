import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreditModule } from './report-parser/credit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    CreditModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
