import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DisputeModule } from './letters/dispute.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DisputeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
