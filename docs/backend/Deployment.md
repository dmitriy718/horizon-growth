# 🚀 Horizon Credit Repair — Backend Deployment Strategy

---

## 1. Infrastructure Overview

### 1.1 Cloud Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AWS INFRASTRUCTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          VPC (10.0.0.0/16)                          │   │
│  │                                                                     │   │
│  │   PUBLIC SUBNETS (10.0.1.0/24, 10.0.2.0/24)                        │   │
│  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │   │
│  │   │     ALB      │    │   NAT GW     │    │   Bastion    │         │   │
│  │   │   (Public)   │    │   (AZ-A)     │    │    Host      │         │   │
│  │   └──────────────┘    └──────────────┘    └──────────────┘         │   │
│  │                                                                     │   │
│  │   PRIVATE SUBNETS (10.0.10.0/24, 10.0.20.0/24)                     │   │
│  │   ┌──────────────────────────────────────────────────────────┐     │   │
│  │   │                    EKS CLUSTER                           │     │   │
│  │   │   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │     │   │
│  │   │   │API Pods │  │Auth Pods│  │Credit   │  │Dispute  │    │     │   │
│  │   │   │(3 min)  │  │(2 min)  │  │Pods(3)  │  │Pods(3)  │    │     │   │
│  │   │   └─────────┘  └─────────┘  └─────────┘  └─────────┘    │     │   │
│  │   │   ┌─────────┐  ┌─────────┐  ┌─────────┐                 │     │   │
│  │   │   │Billing  │  │Notif    │  │Worker   │                 │     │   │
│  │   │   │Pods(2)  │  │Pods(2)  │  │Pods(5)  │                 │     │   │
│  │   │   └─────────┘  └─────────┘  └─────────┘                 │     │   │
│  │   └──────────────────────────────────────────────────────────┘     │   │
│  │                                                                     │   │
│  │   DATA SUBNETS (10.0.100.0/24, 10.0.200.0/24)                      │   │
│  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │   │
│  │   │   RDS        │    │ ElastiCache  │    │  DocumentDB  │         │   │
│  │   │ PostgreSQL   │    │   Redis      │    │   MongoDB    │         │   │
│  │   │ Multi-AZ     │    │  Cluster     │    │              │         │   │
│  │   └──────────────┘    └──────────────┘    └──────────────┘         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  EXTERNAL SERVICES                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    S3        │  │ CloudFront   │  │    SES       │  │   Secrets    │    │
│  │  (Storage)   │  │   (CDN)      │  │   (Email)    │  │   Manager    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Multi-Environment Strategy

```
ENVIRONMENT STRATEGY

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  DEVELOPMENT                                                        │
│  ├── Purpose: Local development and testing                        │
│  ├── Infrastructure: Docker Compose (local)                        │
│  ├── Database: PostgreSQL container                                │
│  ├── Access: Developers only                                       │
│  └── Data: Synthetic test data                                     │
│                                                                     │
│  STAGING                                                            │
│  ├── Purpose: QA, integration testing, demos                       │
│  ├── Infrastructure: AWS (reduced capacity)                        │
│  ├── Database: RDS (single instance)                               │
│  ├── Access: QA team, stakeholders                                 │
│  └── Data: Anonymized production sample                            │
│                                                                     │
│  PRODUCTION                                                         │
│  ├── Purpose: Live customer traffic                                │
│  ├── Infrastructure: AWS (full capacity, multi-AZ)                 │
│  ├── Database: RDS (Multi-AZ, read replicas)                       │
│  ├── Access: Operations team only                                  │
│  └── Data: Real customer data (encrypted)                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. CI/CD Pipeline

### 2.1 Pipeline Architecture

```
CI/CD PIPELINE FLOW

┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   DEVELOP BRANCH              STAGING BRANCH              MAIN BRANCH    │
│   (Feature work)              (Pre-release)               (Production)   │
│                                                                          │
│   ┌─────────┐                 ┌─────────┐                 ┌─────────┐    │
│   │  Push   │                 │  Merge  │                 │ Release │    │
│   │ Commit  │                 │  PR     │                 │  Tag    │    │
│   └────┬────┘                 └────┬────┘                 └────┬────┘    │
│        │                           │                           │        │
│        ▼                           ▼                           ▼        │
│   ┌─────────┐                 ┌─────────┐                 ┌─────────┐    │
│   │  Lint   │                 │  Full   │                 │ Full CI │    │
│   │  Test   │                 │   CI    │                 │   +     │    │
│   │  Build  │                 │  Suite  │                 │ Security│    │
│   └────┬────┘                 └────┬────┘                 └────┬────┘    │
│        │                           │                           │        │
│        ▼                           ▼                           ▼        │
│   ┌─────────┐                 ┌─────────┐                 ┌─────────┐    │
│   │ Preview │                 │ Deploy  │                 │ Deploy  │    │
│   │   Env   │                 │ Staging │                 │  Prod   │    │
│   │(Optional)│                │         │                 │         │    │
│   └─────────┘                 └────┬────┘                 └────┬────┘    │
│                                    │                           │        │
│                                    ▼                           ▼        │
│                               ┌─────────┐                 ┌─────────┐    │
│                               │   E2E   │                 │ Canary  │    │
│                               │  Tests  │                 │ Deploy  │    │
│                               └─────────┘                 └────┬────┘    │
│                                                                │        │
│                                                                ▼        │
│                                                           ┌─────────┐    │
│                                                           │  Full   │    │
│                                                           │ Rollout │    │
│                                                           └─────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2.2 GitHub Actions Workflow

```yaml
# .github/workflows/backend-ci.yml

name: Backend CI/CD

on:
  push:
    branches: [main, develop, staging]
    paths:
      - 'src/backend/**'
      - '.github/workflows/backend-*.yml'
  pull_request:
    branches: [main, develop]

env:
  AWS_REGION: us-east-1
  ECR_REGISTRY: ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.us-east-1.amazonaws.com
  EKS_CLUSTER: horizon-production

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: horizon_test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/horizon_test
          REDIS_URL: redis://localhost:6379
      - uses: codecov/codecov-action@v3

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'

  build:
    needs: [lint, test, security-scan]
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [api-gateway, auth-service, customer-service, credit-service, dispute-service, billing-service, notification-service, worker-service]
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build and push Docker image
        run: |
          docker build \
            -f src/backend/infrastructure/docker/Dockerfile.node \
            --build-arg SERVICE=${{ matrix.service }} \
            -t $ECR_REGISTRY/horizon-${{ matrix.service }}:${{ github.sha }} \
            -t $ECR_REGISTRY/horizon-${{ matrix.service }}:latest \
            .
          docker push $ECR_REGISTRY/horizon-${{ matrix.service }} --all-tags

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Deploy to EKS Staging
        run: |
          aws eks update-kubeconfig --name horizon-staging
          kubectl set image deployment/api-gateway \
            api-gateway=$ECR_REGISTRY/horizon-api-gateway:${{ github.sha }} \
            -n horizon-staging
          # Repeat for other services...

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Deploy to EKS Production (Canary)
        run: |
          aws eks update-kubeconfig --name $EKS_CLUSTER
          # Canary deployment with Argo Rollouts
          kubectl argo rollouts set image api-gateway \
            api-gateway=$ECR_REGISTRY/horizon-api-gateway:${{ github.sha }} \
            -n horizon-production
```

---

## 3. Kubernetes Configuration

### 3.1 Service Deployment

```yaml
# kubernetes/services/api-gateway/deployment.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-gateway
  namespace: horizon-production
  labels:
    app: api-gateway
    tier: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-gateway
  template:
    metadata:
      labels:
        app: api-gateway
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "3000"
    spec:
      serviceAccountName: horizon-api
      containers:
        - name: api-gateway
          image: ${ECR_REGISTRY}/horizon-api-gateway:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: horizon-secrets
                  key: database-url
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: horizon-secrets
                  key: redis-url
          livenessProbe:
            httpGet:
              path: /health/live
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: api-gateway
  namespace: horizon-production
spec:
  selector:
    app: api-gateway
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-gateway-hpa
  namespace: horizon-production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-gateway
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

---

## 4. Database Strategy

### 4.1 PostgreSQL Configuration

```
DATABASE ARCHITECTURE

┌─────────────────────────────────────────────────────────────────────┐
│                      RDS POSTGRESQL SETUP                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PRODUCTION CONFIGURATION                                           │
│  ├── Instance: db.r6g.xlarge (4 vCPU, 32 GB RAM)                   │
│  ├── Storage: 500 GB gp3, 3000 IOPS                                │
│  ├── Multi-AZ: Enabled (synchronous standby)                       │
│  ├── Read Replicas: 2 (for read scaling)                           │
│  ├── Encryption: AWS KMS (at rest)                                 │
│  ├── SSL: Required for all connections                             │
│  └── Backup: 7-day automated, point-in-time recovery               │
│                                                                     │
│  CONNECTION POOLING (PgBouncer)                                     │
│  ├── Mode: Transaction pooling                                     │
│  ├── Max connections: 1000                                         │
│  ├── Default pool size: 20 per database                            │
│  └── Deployed as sidecar in Kubernetes                             │
│                                                                     │
│  REPLICATION TOPOLOGY                                               │
│                                                                     │
│       ┌─────────────┐                                              │
│       │   Primary   │                                              │
│       │   (Write)   │                                              │
│       └──────┬──────┘                                              │
│              │                                                      │
│     ┌────────┴────────┐                                            │
│     ▼                 ▼                                            │
│  ┌─────────┐    ┌─────────┐                                        │
│  │ Standby │    │ Replica │                                        │
│  │ (Sync)  │    │ (Async) │                                        │
│  └─────────┘    └─────────┘                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Backup Strategy

| Type | Frequency | Retention | Storage |
|------|-----------|-----------|---------|
| **Automated Snapshots** | Daily | 7 days | S3 |
| **Manual Snapshots** | Weekly | 30 days | S3 |
| **Point-in-Time** | Continuous | 7 days | S3 |
| **Cross-Region** | Daily | 7 days | S3 (us-west-2) |
| **Logical Backup** | Weekly | 90 days | S3 Glacier |

### 4.3 Migration Strategy

```typescript
// Database migration with TypeORM

// migrations/1701432000000-CreateCustomerTable.ts
import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateCustomerTable1701432000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'ssn_encrypted',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'active', 'suspended', 'cancelled'],
            default: "'pending'",
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'customers',
      new Index({
        name: 'IDX_customers_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
```

---

## 5. Monitoring & Observability

### 5.1 Monitoring Stack

```
OBSERVABILITY ARCHITECTURE

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  METRICS (DataDog)                                                  │
│  ├── Infrastructure metrics (CPU, memory, disk)                    │
│  ├── Application metrics (request rate, latency, errors)           │
│  ├── Business metrics (signups, disputes, conversions)             │
│  └── Custom dashboards and alerts                                  │
│                                                                     │
│  LOGGING (DataDog Logs)                                             │
│  ├── Structured JSON logging                                       │
│  ├── Log aggregation from all services                             │
│  ├── Log correlation with traces                                   │
│  └── Log-based alerting                                            │
│                                                                     │
│  TRACING (DataDog APM)                                              │
│  ├── Distributed tracing across services                           │
│  ├── Request flow visualization                                    │
│  ├── Performance bottleneck detection                              │
│  └── Error tracking and root cause analysis                        │
│                                                                     │
│  ALERTING                                                           │
│  ├── PagerDuty integration for critical alerts                     │
│  ├── Slack notifications for warnings                              │
│  ├── Email digests for informational                               │
│  └── Escalation policies and on-call rotation                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Alert Configuration

```yaml
# datadog/monitors/api-alerts.yaml

alerts:
  - name: "API Error Rate High"
    type: metric
    query: "sum:http.server.request.count{status_code:5*, service:api-gateway}.as_rate() / sum:http.server.request.count{service:api-gateway}.as_rate() * 100"
    thresholds:
      critical: 5
      warning: 2
    notify:
      - "@pagerduty-horizon-critical"
      - "@slack-horizon-alerts"
    message: |
      API error rate is {{value}}%.
      Check logs: https://app.datadoghq.com/logs?query=service:api-gateway%20status:error

  - name: "API Latency P95 High"
    type: metric
    query: "avg:http.server.request.duration{service:api-gateway}.rollup(avg, 300).percentile(0.95)"
    thresholds:
      critical: 2000  # 2 seconds
      warning: 1000   # 1 second
    notify:
      - "@slack-horizon-alerts"

  - name: "Database Connection Pool Exhausted"
    type: metric
    query: "avg:postgresql.connections.active{db:horizon_production} / avg:postgresql.max_connections{db:horizon_production} * 100"
    thresholds:
      critical: 90
      warning: 75
    notify:
      - "@pagerduty-horizon-critical"

  - name: "Redis Memory Usage High"
    type: metric
    query: "avg:redis.mem.used{cluster:horizon-production} / avg:redis.mem.max{cluster:horizon-production} * 100"
    thresholds:
      critical: 90
      warning: 80
```

---

## 6. Disaster Recovery

### 6.1 Recovery Procedures

```
DISASTER RECOVERY PLAN

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  SCENARIO 1: Single Service Failure                                 │
│  ────────────────────────────────                                   │
│  RTO: < 5 minutes | RPO: 0 (no data loss)                          │
│                                                                     │
│  Steps:                                                             │
│  1. Kubernetes auto-restarts failed pod                            │
│  2. Health check fails → pod removed from service                  │
│  3. New pod scheduled and health checked                           │
│  4. Traffic resumes to healthy pods                                │
│                                                                     │
│  SCENARIO 2: Database Failure                                       │
│  ───────────────────────────────                                    │
│  RTO: < 15 minutes | RPO: < 1 minute                               │
│                                                                     │
│  Steps:                                                             │
│  1. Multi-AZ failover triggers automatically                       │
│  2. DNS updates to standby (60-120 seconds)                        │
│  3. Applications reconnect automatically                           │
│  4. Monitor for data consistency                                   │
│                                                                     │
│  SCENARIO 3: Full Region Failure                                    │
│  ─────────────────────────────────                                  │
│  RTO: < 4 hours | RPO: < 1 hour                                    │
│                                                                     │
│  Steps:                                                             │
│  1. Activate DR region (us-west-2)                                 │
│  2. Restore database from cross-region backup                      │
│  3. Deploy services to DR EKS cluster                              │
│  4. Update Route 53 health checks                                  │
│  5. DNS failover to DR region                                      │
│  6. Verify all services operational                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Runbooks

| Incident | Runbook Link | Expected Resolution |
|----------|--------------|---------------------|
| API Gateway Down | `runbooks/api-gateway-failure.md` | 5 minutes |
| Database Failover | `runbooks/database-failover.md` | 15 minutes |
| Redis Cluster Issue | `runbooks/redis-recovery.md` | 10 minutes |
| Kafka Consumer Lag | `runbooks/kafka-consumer-lag.md` | 30 minutes |
| SSL Certificate Expiry | `runbooks/ssl-renewal.md` | 30 minutes |
| Full Region DR | `runbooks/regional-disaster-recovery.md` | 4 hours |

---

## 7. Cost Optimization

### 7.1 Estimated Monthly Costs

```
AWS COST BREAKDOWN (Production)

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  COMPUTE                                               $2,500/mo    │
│  ├── EKS Cluster (control plane)              $73                  │
│  ├── EC2 Nodes (m6i.xlarge x 4)               $1,200               │
│  ├── EC2 Nodes (r6i.large x 2 for workers)    $300                 │
│  └── Load Balancers (ALB x 2)                 $927                 │
│                                                                     │
│  DATABASE                                              $1,800/mo    │
│  ├── RDS PostgreSQL (db.r6g.xlarge)           $800                 │
│  ├── RDS Read Replica                         $400                 │
│  ├── ElastiCache Redis (r6g.large x 2)        $350                 │
│  └── DocumentDB (db.r5.large)                 $250                 │
│                                                                     │
│  STORAGE                                               $500/mo      │
│  ├── S3 (documents, backups)                  $200                 │
│  ├── EBS Volumes                              $200                 │
│  └── S3 Glacier (archives)                    $100                 │
│                                                                     │
│  NETWORKING                                            $400/mo      │
│  ├── Data Transfer                            $200                 │
│  ├── NAT Gateway                              $100                 │
│  └── Route 53                                 $100                 │
│                                                                     │
│  THIRD-PARTY SERVICES                                  $1,200/mo    │
│  ├── DataDog (APM, Logs, Metrics)             $600                 │
│  ├── Sentry (Error Tracking)                  $100                 │
│  ├── PagerDuty                                $100                 │
│  └── Snyk (Security Scanning)                 $400                 │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  TOTAL ESTIMATED:                              ~$6,400/mo           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Cost Optimization Strategies

| Strategy | Potential Savings |
|----------|-------------------|
| Reserved Instances (1-year) | 30-40% on compute |
| Spot Instances for workers | 60-70% on batch processing |
| S3 Intelligent-Tiering | 20-30% on storage |
| Right-sizing instances | 10-20% overall |
| Scheduled scaling | 15-25% during off-peak |

---

*Document Version: 1.0*
*Last Updated: December 2024*

