# 🌅 Horizon Credit Repair

> **AI-Powered Credit Repair Services**

A comprehensive SaaS platform for credit repair, featuring a marketing website, backend API services, and cross-platform mobile/desktop applications.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Horizon Credit Repair (HCR) is a modern credit repair company designed to empower individuals to take control of their financial futures. The platform consists of three main components:

1. **Website** - Public-facing marketing and educational site
2. **Backend** - API services, AI processing, and business logic
3. **App** - Cross-platform client application (iOS, Android, Windows, macOS)

### Key Features

- 🤖 **AI-Powered Analysis** - Intelligent credit report analysis and recommendations
- 📊 **Real-Time Monitoring** - Credit score tracking with instant alerts
- ⚡ **Automated Disputes** - Streamlined dispute creation and tracking
- 📚 **Education Hub** - Comprehensive credit education resources
- 🔒 **Bank-Level Security** - SOC 2 compliant with end-to-end encryption

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HORIZON PLATFORM                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   CLIENTS                                                           │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│   │   Web    │  │   iOS    │  │ Android  │  │ Desktop  │          │
│   │  (Next)  │  │  (RN)    │  │  (RN)    │  │(Electron)│          │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│        └─────────────┴──────┬──────┴─────────────┘                 │
│                             ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    API GATEWAY (NestJS)                     │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                             │                                       │
│   ┌─────────────────────────┴─────────────────────────┐            │
│   │                  MICROSERVICES                     │            │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │            │
│   │  │  Auth   │ │Customer │ │ Credit  │ │ Dispute │ │            │
│   │  │ Service │ │ Service │ │ Service │ │ Service │ │            │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │            │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐             │            │
│   │  │ Billing │ │  Notif  │ │  Worker │             │            │
│   │  │ Service │ │ Service │ │ Service │             │            │
│   │  └─────────┘ └─────────┘ └─────────┘             │            │
│   └───────────────────────────────────────────────────┘            │
│                             │                                       │
│   ┌─────────────────────────┴─────────────────────────┐            │
│   │                   DATA LAYER                       │            │
│   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐     │            │
│   │  │Postgres│ │ Redis  │ │MongoDB │ │Elastic │     │            │
│   │  └────────┘ └────────┘ └────────┘ └────────┘     │            │
│   └───────────────────────────────────────────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Horizon/
├── docs/                          # 📚 Documentation
│   ├── website/                   # Website docs
│   │   ├── Brief.md
│   │   ├── Design.md
│   │   ├── Code.md
│   │   └── Deployment.md
│   ├── backend/                   # Backend docs
│   │   ├── Brief.md
│   │   ├── Design.md
│   │   ├── Code.md
│   │   └── Deployment.md
│   └── app/                       # App docs
│       ├── Brief.md
│       ├── Design.md
│       ├── Code.md
│       └── Deployment.md
│
├── src/                           # 💻 Source Code
│   ├── website/                   # Next.js marketing site
│   ├── backend/                   # NestJS microservices
│   └── app/                       # React Native + Expo app
│
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20 LTS or higher
- **pnpm** 8.x (package manager)
- **Docker** & Docker Compose (for local development)
- **Expo CLI** (for mobile development)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/horizoncreditrepair/horizon.git
cd horizon

# Install dependencies (all projects)
pnpm install

# Start infrastructure (databases, etc.)
cd src/backend
pnpm docker:up

# Start all services in development
pnpm dev
```

### Individual Projects

**Website:**
```bash
cd src/website
pnpm install
pnpm dev
# Open http://localhost:3000
```

**Backend:**
```bash
cd src/backend
pnpm install
pnpm docker:up  # Start databases
pnpm dev
# API at http://localhost:3001
# Docs at http://localhost:3001/docs
```

**Mobile App:**
```bash
cd src/app
pnpm install
pnpm start
# Scan QR code with Expo Go app
```

---

## 📖 Documentation

Detailed documentation is available in the `/docs` directory:

| Component | Brief | Design | Code | Deployment |
|-----------|-------|--------|------|------------|
| Website | [📄](docs/website/Brief.md) | [🎨](docs/website/Design.md) | [💻](docs/website/Code.md) | [🚀](docs/website/Deployment.md) |
| Backend | [📄](docs/backend/Brief.md) | [🎨](docs/backend/Design.md) | [💻](docs/backend/Code.md) | [🚀](docs/backend/Deployment.md) |
| App | [📄](docs/app/Brief.md) | [🎨](docs/app/Design.md) | [💻](docs/app/Code.md) | [🚀](docs/app/Deployment.md) |

---

## 🛠️ Tech Stack

### Website
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **CMS:** Sanity.io
- **Deployment:** Vercel

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Databases:** PostgreSQL, MongoDB, Redis
- **Queue:** BullMQ
- **AI:** OpenAI GPT-4, Custom ML models
- **Deployment:** AWS EKS

### Mobile App
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **State:** Zustand + TanStack Query
- **UI:** Tamagui
- **Deployment:** EAS Build + App Stores

---

## 💻 Development

### Code Quality

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

### Branch Strategy

- `main` - Production branch
- `staging` - Pre-production testing
- `develop` - Active development
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add credit score simulator
fix: resolve login issue on iOS
docs: update API documentation
chore: upgrade dependencies
```

---

## 🚢 Deployment

### Website
- Automatic deployment via Vercel on push to `main`
- Preview deployments for all PRs

### Backend
- CI/CD via GitHub Actions
- Kubernetes deployment on AWS EKS
- Canary releases for production

### Mobile App
- EAS Build for iOS/Android builds
- OTA updates for JS changes
- Store submissions via EAS Submit

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Proprietary - All rights reserved © 2024 Horizon Credit Repair

---

## 📞 Support

- **Documentation:** [docs.horizoncredit.net](https://docs.horizoncredit.net)
- **Email:** support@horizoncredit.net
- **Slack:** #horizon-engineering (internal)

---

<p align="center">
  Made with ❤️ by the Horizon Team
</p>

