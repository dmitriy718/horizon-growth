# 💻 Horizon Credit Repair — Backend Coding Overview

---

## 1. Technology Justifications

### 1.1 Language Choices

| Technology | Use Case | Justification |
|------------|----------|---------------|
| **TypeScript/Node.js** | Core API | Type safety, vast ecosystem, async performance |
| **Python** | AI/ML Services | Best ML libraries (PyTorch, sklearn), AI ecosystem |
| **Go** | High-performance utilities | Concurrency, speed for data processing |

### 1.2 Framework Selections

| Framework | Purpose | Why Chosen |
|-----------|---------|------------|
| **NestJS** | Main API | Enterprise patterns, DI, modular, TypeScript-native |
| **FastAPI** | AI Services | Async Python, auto docs, type hints, performance |
| **BullMQ** | Job Queue | Redis-based, reliable, TypeScript support |

---

## 2. Project Structure

```
src/backend/
├── apps/                           # Microservices
│   ├── api-gateway/                # Main API Gateway
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   └── config/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── auth-service/               # Authentication Service
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── mfa.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── jwt.service.ts
│   │   │   │   └── mfa.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── oauth.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   └── test/
│   │
│   ├── customer-service/           # Customer Management
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── customer.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── entities/
│   │   │   │   ├── customer.entity.ts
│   │   │   │   └── document.entity.ts
│   │   │   └── repositories/
│   │   └── test/
│   │
│   ├── credit-service/             # Credit Report Management
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── credit.module.ts
│   │   │   ├── controllers/
│   │   │   │   ├── report.controller.ts
│   │   │   │   └── monitoring.controller.ts
│   │   │   ├── services/
│   │   │   │   ├── report.service.ts
│   │   │   │   ├── parser.service.ts
│   │   │   │   └── bureau-api.service.ts
│   │   │   ├── integrations/
│   │   │   │   ├── experian.client.ts
│   │   │   │   ├── equifax.client.ts
│   │   │   │   └── transunion.client.ts
│   │   │   └── dto/
│   │   └── test/
│   │
│   ├── dispute-service/            # Dispute Management
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── dispute.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   │   ├── dispute.service.ts
│   │   │   │   ├── letter-generator.service.ts
│   │   │   │   └── submission.service.ts
│   │   │   ├── templates/
│   │   │   │   ├── general-dispute.hbs
│   │   │   │   └── debt-validation.hbs
│   │   │   └── workflows/
│   │   └── test/
│   │
│   ├── billing-service/            # Payment & Subscriptions
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── billing.module.ts
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   │   ├── subscription.service.ts
│   │   │   │   ├── invoice.service.ts
│   │   │   │   └── stripe.service.ts
│   │   │   └── webhooks/
│   │   │       └── stripe.webhook.ts
│   │   └── test/
│   │
│   ├── notification-service/       # Communications
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── notification.module.ts
│   │   │   ├── channels/
│   │   │   │   ├── email.channel.ts
│   │   │   │   ├── sms.channel.ts
│   │   │   │   └── push.channel.ts
│   │   │   ├── templates/
│   │   │   └── providers/
│   │   │       ├── sendgrid.provider.ts
│   │   │       └── twilio.provider.ts
│   │   └── test/
│   │
│   └── worker-service/             # Background Jobs
│       ├── src/
│       │   ├── main.ts
│       │   ├── worker.module.ts
│       │   ├── processors/
│       │   │   ├── report-fetch.processor.ts
│       │   │   ├── ai-analysis.processor.ts
│       │   │   └── dispute-submit.processor.ts
│       │   └── schedulers/
│       │       ├── monitoring.scheduler.ts
│       │       └── dunning.scheduler.ts
│       └── test/
│
├── ai-services/                    # Python AI Services
│   ├── analyzer/                   # Credit Analysis Service
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── api/
│   │   │   │   └── routes.py
│   │   │   ├── services/
│   │   │   │   ├── analyzer.py
│   │   │   │   ├── predictor.py
│   │   │   │   └── scorer.py
│   │   │   ├── models/
│   │   │   │   ├── dispute_model.py
│   │   │   │   └── score_model.py
│   │   │   └── schemas/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── chatbot/                    # AI Chatbot Service
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── api/
│   │   │   ├── services/
│   │   │   │   ├── conversation.py
│   │   │   │   ├── intent.py
│   │   │   │   └── llm_client.py
│   │   │   └── prompts/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── ocr/                        # Document OCR Service
│       ├── app/
│       │   ├── main.py
│       │   ├── services/
│       │   │   ├── extractor.py
│       │   │   └── parser.py
│       │   └── models/
│       ├── requirements.txt
│       └── Dockerfile
│
├── libs/                           # Shared Libraries
│   ├── common/                     # Common utilities
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── decorators/
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   └── utils/
│   │   └── package.json
│   │
│   ├── database/                   # Database utilities
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── postgres/
│   │   │   ├── mongodb/
│   │   │   └── redis/
│   │   └── package.json
│   │
│   └── contracts/                  # Shared types/interfaces
│       ├── src/
│       │   ├── index.ts
│       │   ├── events/
│       │   ├── dto/
│       │   └── entities/
│       └── package.json
│
├── infrastructure/                 # Infrastructure as Code
│   ├── terraform/
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── production/
│   │   ├── modules/
│   │   │   ├── eks/
│   │   │   ├── rds/
│   │   │   ├── elasticache/
│   │   │   └── s3/
│   │   └── main.tf
│   │
│   ├── kubernetes/
│   │   ├── base/
│   │   │   ├── namespace.yaml
│   │   │   ├── configmap.yaml
│   │   │   └── secrets.yaml
│   │   ├── services/
│   │   │   ├── api-gateway/
│   │   │   ├── auth-service/
│   │   │   └── ...
│   │   └── kustomization.yaml
│   │
│   └── docker/
│       ├── Dockerfile.node
│       ├── Dockerfile.python
│       └── docker-compose.yml
│
├── scripts/                        # Utility scripts
│   ├── setup.sh
│   ├── migrate.sh
│   ├── seed.sh
│   └── deploy.sh
│
├── docs/                           # API Documentation
│   ├── openapi/
│   │   └── api.yaml
│   └── postman/
│       └── collection.json
│
├── package.json                    # Root package.json (monorepo)
├── pnpm-workspace.yaml             # pnpm workspace config
├── turbo.json                      # Turborepo config
├── tsconfig.base.json              # Base TypeScript config
└── .env.example                    # Environment template
```

---

## 3. Coding Patterns & Architecture

### 3.1 NestJS Module Pattern

```typescript
// apps/customer-service/src/customer.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
```

### 3.2 Service Layer Pattern

```typescript
// apps/customer-service/src/services/customer.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Customer } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: CustomerRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepo.create(dto);
    const saved = await this.customerRepo.save(customer);
    
    this.eventEmitter.emit('customer.created', {
      customerId: saved.id,
      email: saved.email,
    });
    
    return saved;
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findById(id);
    Object.assign(customer, dto);
    return this.customerRepo.save(customer);
  }

  async delete(id: string): Promise<void> {
    const result = await this.customerRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    
    this.eventEmitter.emit('customer.deleted', { customerId: id });
  }
}
```

### 3.3 Repository Pattern

```typescript
// apps/customer-service/src/repositories/customer.repository.ts

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.findOne({ where: { email: email.toLowerCase() } });
  }

  async findActiveCustomers(page: number, limit: number): Promise<[Customer[], number]> {
    return this.findAndCount({
      where: { status: 'active' },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }

  async findWithSubscription(customerId: string): Promise<Customer | null> {
    return this.findOne({
      where: { id: customerId },
      relations: ['subscription', 'subscription.plan'],
    });
  }
}
```

### 3.4 DTO Validation Pattern

```typescript
// apps/customer-service/src/dto/create-customer.dto.ts

import { 
  IsEmail, 
  IsString, 
  IsOptional, 
  IsDateString,
  MinLength,
  MaxLength,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AddressDto {
  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[A-Z]{2}$/)
  state: string;

  @ApiProperty()
  @IsString()
  @Matches(/^\d{5}(-\d{4})?$/)
  zipCode: string;
}

export class CreateCustomerDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: '+15551234567' })
  @IsString()
  @Matches(/^\+1\d{10}$/)
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ type: AddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
```

---

## 4. Key Libraries & Dependencies

### 4.1 Node.js Services (package.json)

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/swagger": "^7.0.0",
    "@nestjs/bull": "^10.0.0",
    "@nestjs/event-emitter": "^2.0.0",
    "@nestjs/microservices": "^10.0.0",
    
    "typeorm": "^0.3.17",
    "pg": "^8.11.0",
    "mongoose": "^8.0.0",
    "ioredis": "^5.3.0",
    
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.0",
    "passport-google-oauth20": "^2.0.0",
    "bcrypt": "^5.1.0",
    "speakeasy": "^2.0.0",
    
    "bullmq": "^4.0.0",
    "kafkajs": "^2.2.0",
    
    "stripe": "^14.0.0",
    "@sendgrid/mail": "^8.0.0",
    "twilio": "^4.0.0",
    
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    
    "winston": "^3.11.0",
    "helmet": "^7.0.0",
    "compression": "^1.7.0",
    
    "date-fns": "^2.30.0",
    "lodash": "^4.17.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.0",
    "@types/passport-jwt": "^3.0.0",
    "@types/bcrypt": "^5.0.0",
    
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    
    "jest": "^29.7.0",
    "@nestjs/testing": "^10.0.0",
    "supertest": "^6.3.0",
    
    "eslint": "^8.54.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "prettier": "^3.1.0"
  }
}
```

### 4.2 Python AI Services (requirements.txt)

```
# Web Framework
fastapi==0.104.0
uvicorn[standard]==0.24.0
pydantic==2.5.0

# ML/AI
openai==1.3.0
langchain==0.0.340
langchain-openai==0.0.2
transformers==4.35.0
torch==2.1.0
scikit-learn==1.3.0
numpy==1.26.0
pandas==2.1.0

# Database
sqlalchemy==2.0.0
asyncpg==0.29.0
motor==3.3.0
redis==5.0.0

# Utilities
python-multipart==0.0.6
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.0
httpx==0.25.0

# OCR/Document Processing
pytesseract==0.3.10
pdf2image==1.16.0
pillow==10.1.0

# Testing
pytest==7.4.0
pytest-asyncio==0.21.0
httpx==0.25.0

# Monitoring
prometheus-client==0.18.0
opentelemetry-api==1.21.0
```

---

## 5. Testing Strategy

### 5.1 Unit Testing

```typescript
// apps/customer-service/test/customer.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerService } from '../src/services/customer.service';
import { Customer } from '../src/entities/customer.entity';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockRepository: any;
  let mockEventEmitter: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      softDelete: jest.fn(),
    };

    mockEventEmitter = {
      emit: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  describe('create', () => {
    it('should create a customer and emit event', async () => {
      const dto = { email: 'test@example.com', firstName: 'John', lastName: 'Doe' };
      const customer = { id: '123', ...dto };

      mockRepository.create.mockReturnValue(customer);
      mockRepository.save.mockResolvedValue(customer);

      const result = await service.create(dto as any);

      expect(result).toEqual(customer);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith('customer.created', {
        customerId: '123',
        email: 'test@example.com',
      });
    });
  });

  describe('findById', () => {
    it('should return customer if found', async () => {
      const customer = { id: '123', email: 'test@example.com' };
      mockRepository.findOne.mockResolvedValue(customer);

      const result = await service.findById('123');

      expect(result).toEqual(customer);
    });

    it('should throw NotFoundException if not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('123')).rejects.toThrow(NotFoundException);
    });
  });
});
```

### 5.2 Integration Testing

```typescript
// apps/api-gateway/test/integration/auth.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'StrongPassword123!',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.email).toBe('newuser@example.com');
        });
    });

    it('should reject duplicate email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'StrongPassword123!',
        })
        .expect(409);
    });
  });

  describe('POST /auth/login', () => {
    it('should return tokens for valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'valid@example.com',
          password: 'ValidPassword123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.accessToken).toBeDefined();
          expect(res.body.data.refreshToken).toBeDefined();
        });
    });
  });
});
```

### 5.3 Test Coverage Requirements

| Area | Coverage Target |
|------|-----------------|
| Services | 90%+ |
| Controllers | 85%+ |
| Repositories | 80%+ |
| Utilities | 95%+ |
| Integration | Critical paths |

---

## 6. Error Handling

### 6.1 Global Exception Filter

```typescript
// libs/common/src/filters/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = uuid();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_ERROR';
    let details: Record<string, string[]> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const resp = exceptionResponse as any;
        message = resp.message || message;
        code = resp.code || this.getCodeFromStatus(status);
        details = resp.details;
      }
    }

    this.logger.error({
      requestId,
      path: request.url,
      method: request.method,
      status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      success: false,
      error: {
        code,
        message,
        details,
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }

  private getCodeFromStatus(status: number): string {
    const codeMap: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'VALIDATION_ERROR',
      429: 'RATE_LIMITED',
      500: 'INTERNAL_ERROR',
    };
    return codeMap[status] || 'UNKNOWN_ERROR';
  }
}
```

---

## 7. Security Implementation

### 7.1 Rate Limiting

```typescript
// libs/common/src/guards/rate-limit.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Redis } from 'ioredis';
import { TooManyRequestsException } from '../exceptions';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const limit = this.reflector.get<number>('rateLimit', context.getHandler()) || 100;
    const window = this.reflector.get<number>('rateLimitWindow', context.getHandler()) || 60;

    const key = `rate_limit:${request.ip}:${request.path}`;
    const current = await this.redis.incr(key);

    if (current === 1) {
      await this.redis.expire(key, window);
    }

    if (current > limit) {
      throw new TooManyRequestsException('Rate limit exceeded');
    }

    return true;
  }
}
```

### 7.2 Field Encryption

```typescript
// libs/common/src/utils/encryption.ts

import * as crypto from 'crypto';

export class FieldEncryption {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly tagLength = 16;

  constructor(private readonly masterKey: string) {}

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const key = this.deriveKey(this.masterKey);
    
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  }

  decrypt(ciphertext: string): string {
    const [ivHex, tagHex, encrypted] = ciphertext.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const key = this.deriveKey(this.masterKey);
    
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  private deriveKey(password: string): Buffer {
    return crypto.scryptSync(password, 'horizon-salt', this.keyLength);
  }
}
```

---

*Document Version: 1.0*
*Last Updated: December 2024*

