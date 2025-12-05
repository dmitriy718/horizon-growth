# 🚀 Horizon Credit Repair — App Deployment Strategy

---

## 1. Build & Distribution Platform

### 1.1 Expo Application Services (EAS)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    EAS BUILD & SUBMIT WORKFLOW                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   LOCAL DEVELOPMENT                                                 │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │  expo start  →  Development builds  →  Expo Go (preview)     │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                              │                                      │
│                              ▼                                      │
│   EAS BUILD                                                         │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │  eas build --platform all --profile preview                  │ │
│   │                                                              │ │
│   │  Profiles:                                                   │ │
│   │  • development - Dev client with debug tools                 │ │
│   │  • preview - Internal testing (ad-hoc/internal)              │ │
│   │  • production - Store submission ready                       │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                              │                                      │
│                              ▼                                      │
│   EAS SUBMIT                                                        │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │  eas submit --platform ios --profile production              │ │
│   │  eas submit --platform android --profile production          │ │
│   │                                                              │ │
│   │  Automatic submission to:                                    │ │
│   │  • Apple App Store Connect                                   │ │
│   │  • Google Play Console                                       │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 EAS Configuration

```json
// eas.json

{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      },
      "env": {
        "APP_ENV": "preview"
      }
    },
    "production": {
      "autoIncrement": true,
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "app-bundle"
      },
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "developer@horizoncreditrepair.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCD1234"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

## 2. CI/CD Pipeline

### 2.1 GitHub Actions Workflow

```yaml
# .github/workflows/mobile-ci.yml

name: Mobile CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'src/app/**'
      - '.github/workflows/mobile-*.yml'
  pull_request:
    branches: [main]

env:
  EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: src/app/package-lock.json
      
      - name: Install dependencies
        working-directory: src/app
        run: npm ci
      
      - name: Run linter
        working-directory: src/app
        run: npm run lint
      
      - name: Run type check
        working-directory: src/app
        run: npm run type-check
      
      - name: Run tests
        working-directory: src/app
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          directory: src/app/coverage

  build-preview:
    needs: lint-and-test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        working-directory: src/app
        run: npm ci
      
      - name: Build preview (iOS)
        working-directory: src/app
        run: eas build --platform ios --profile preview --non-interactive
      
      - name: Build preview (Android)
        working-directory: src/app
        run: eas build --platform android --profile preview --non-interactive

  build-production:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        working-directory: src/app
        run: npm ci
      
      - name: Build production (iOS)
        working-directory: src/app
        run: eas build --platform ios --profile production --non-interactive
      
      - name: Build production (Android)
        working-directory: src/app
        run: eas build --platform android --profile production --non-interactive

  submit-stores:
    needs: build-production
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Submit to App Store
        working-directory: src/app
        run: eas submit --platform ios --latest --non-interactive
        env:
          EXPO_APPLE_APP_SPECIFIC_PASSWORD: ${{ secrets.APPLE_APP_SPECIFIC_PASSWORD }}
      
      - name: Submit to Play Store
        working-directory: src/app
        run: eas submit --platform android --latest --non-interactive
```

---

## 3. App Store Configuration

### 3.1 iOS App Store

```
┌─────────────────────────────────────────────────────────────────────┐
│                    APP STORE CONNECT SETUP                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  APP INFORMATION                                                    │
│  ├── App Name: Horizon Credit Repair                               │
│  ├── Subtitle: AI-Powered Credit Improvement                       │
│  ├── Bundle ID: com.horizoncreditrepair.app                        │
│  ├── SKU: HCR-IOS-001                                              │
│  └── Primary Language: English (US)                                │
│                                                                     │
│  CATEGORIES                                                         │
│  ├── Primary: Finance                                              │
│  └── Secondary: Utilities                                          │
│                                                                     │
│  PRICING                                                            │
│  ├── Price: Free (with in-app subscriptions)                       │
│  └── Availability: United States, Canada                           │
│                                                                     │
│  IN-APP PURCHASES                                                   │
│  ├── Basic Plan - $79.99/month (auto-renewable)                    │
│  ├── Premier Plan - $109.99/month (auto-renewable)                 │
│  └── Premier Plus - $139.99/month (auto-renewable)                 │
│                                                                     │
│  APP PRIVACY                                                        │
│  ├── Data Collection: Yes                                          │
│  │   ├── Financial Info (credit scores, payment info)              │
│  │   ├── Contact Info (name, email, phone)                         │
│  │   ├── Identifiers (user ID, device ID)                          │
│  │   └── Usage Data                                                │
│  └── Privacy Policy URL: https://horizoncreditrepair.com/privacy   │
│                                                                     │
│  APP REVIEW INFORMATION                                             │
│  ├── Demo Account: demo@horizon.test / TestDemo123!                │
│  └── Notes: Credit repair service app requiring identity verify    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Google Play Store

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GOOGLE PLAY CONSOLE SETUP                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  APP DETAILS                                                        │
│  ├── App Name: Horizon Credit Repair                               │
│  ├── Short Description: Fix your credit with AI guidance           │
│  ├── Full Description: [500 character limit]                       │
│  └── Package Name: com.horizoncreditrepair.app                     │
│                                                                     │
│  STORE LISTING                                                      │
│  ├── Category: Finance                                             │
│  ├── Content Rating: Everyone                                      │
│  ├── Contact Email: support@horizoncreditrepair.com                │
│  └── Privacy Policy: https://horizoncreditrepair.com/privacy       │
│                                                                     │
│  RELEASE MANAGEMENT                                                 │
│  ├── Production Track                                              │
│  ├── Open Testing Track (Beta)                                     │
│  ├── Closed Testing Track (Alpha)                                  │
│  └── Internal Testing Track                                        │
│                                                                     │
│  IN-APP PRODUCTS                                                    │
│  ├── horizon.basic.monthly                                         │
│  ├── horizon.premier.monthly                                       │
│  └── horizon.premierplus.monthly                                   │
│                                                                     │
│  DATA SAFETY                                                        │
│  ├── Data Encrypted in Transit: Yes                                │
│  ├── Data Deletion Request: Yes                                    │
│  └── Data Types Collected: (same as iOS)                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Desktop App Deployment (Electron)

### 4.1 Electron Builder Configuration

```javascript
// electron-builder.config.js

module.exports = {
  appId: 'com.horizoncreditrepair.desktop',
  productName: 'Horizon Credit Repair',
  directories: {
    output: 'dist',
    buildResources: 'build',
  },
  files: [
    'build/**/*',
    'node_modules/**/*',
    'package.json',
  ],
  mac: {
    category: 'public.app-category.finance',
    icon: 'build/icon.icns',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist',
    target: [
      { target: 'dmg', arch: ['x64', 'arm64'] },
      { target: 'zip', arch: ['x64', 'arm64'] },
    ],
  },
  win: {
    icon: 'build/icon.ico',
    target: [
      { target: 'nsis', arch: ['x64'] },
      { target: 'portable', arch: ['x64'] },
    ],
    certificateFile: process.env.WIN_CERT_FILE,
    certificatePassword: process.env.WIN_CERT_PASSWORD,
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
  publish: {
    provider: 'github',
    owner: 'horizon-credit-repair',
    repo: 'desktop-app',
    releaseType: 'release',
  },
  afterSign: 'scripts/notarize.js',
};
```

### 4.2 Auto-Update Configuration

```typescript
// electron/main/updater.ts

import { autoUpdater } from 'electron-updater';
import { app, BrowserWindow, dialog } from 'electron';
import log from 'electron-log';

export function setupAutoUpdater(mainWindow: BrowserWindow) {
  autoUpdater.logger = log;
  autoUpdater.autoDownload = false;

  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for updates...');
  });

  autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Available',
      message: `Version ${info.version} is available. Would you like to download it now?`,
      buttons: ['Download', 'Later'],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: 'Update Ready',
      message: 'Update downloaded. The app will restart to install.',
      buttons: ['Restart Now', 'Later'],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  // Check for updates on app start
  autoUpdater.checkForUpdates();

  // Check for updates every 4 hours
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 4 * 60 * 60 * 1000);
}
```

---

## 5. Over-the-Air Updates (OTA)

### 5.1 EAS Update Configuration

```json
// app.json (partial)

{
  "expo": {
    "updates": {
      "enabled": true,
      "checkAutomatically": "ON_LOAD",
      "fallbackToCacheTimeout": 30000,
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

### 5.2 Update Workflow

```
OTA UPDATE FLOW

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   DEVELOPMENT                                                       │
│   ┌──────────────┐                                                 │
│   │ Code Change  │                                                 │
│   │ (JS/Assets)  │                                                 │
│   └──────┬───────┘                                                 │
│          │                                                          │
│          ▼                                                          │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐       │
│   │   Commit &   │────▶│  EAS Update  │────▶│   CDN Edge   │       │
│   │     Push     │     │   Publish    │     │  Distribution│       │
│   └──────────────┘     └──────────────┘     └──────────────┘       │
│                                                      │              │
│                                                      ▼              │
│   USER'S DEVICE                                                     │
│   ┌──────────────────────────────────────────────────────────────┐ │
│   │  1. App opens                                                │ │
│   │  2. Checks for updates (background)                          │ │
│   │  3. Downloads update bundle if available                     │ │
│   │  4. Applies on next launch                                   │ │
│   └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│   CHANNELS:                                                         │
│   • production - Live users                                        │
│   • preview - QA/Staging                                           │
│   • development - Internal testing                                 │
│                                                                     │
│   COMMANDS:                                                         │
│   eas update --branch production --message "Bug fix for..."        │
│   eas update --branch preview --message "Testing feature X"        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Monitoring & Analytics

### 6.1 Crash Reporting (Sentry)

```typescript
// App initialization

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://xxx@sentry.io/xxx',
  environment: process.env.APP_ENV,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,
  tracesSampleRate: 0.2,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['api.horizoncreditrepair.com'],
      routingInstrumentation: Sentry.reactNavigationIntegration,
    }),
  ],
});
```

### 6.2 Analytics (Mixpanel)

```typescript
// services/analytics.ts

import { Mixpanel } from 'mixpanel-react-native';

const mixpanel = new Mixpanel('YOUR_MIXPANEL_TOKEN', true);

export const analytics = {
  init: async () => {
    await mixpanel.init();
  },

  identify: (userId: string) => {
    mixpanel.identify(userId);
  },

  track: (event: string, properties?: Record<string, any>) => {
    mixpanel.track(event, properties);
  },

  setUserProperties: (properties: Record<string, any>) => {
    mixpanel.getPeople().set(properties);
  },

  // Pre-defined events
  events: {
    APP_OPENED: 'App Opened',
    SIGNUP_STARTED: 'Signup Started',
    SIGNUP_COMPLETED: 'Signup Completed',
    CREDIT_REPORT_VIEWED: 'Credit Report Viewed',
    DISPUTE_STARTED: 'Dispute Started',
    DISPUTE_SUBMITTED: 'Dispute Submitted',
    AI_CHAT_OPENED: 'AI Chat Opened',
    SUBSCRIPTION_STARTED: 'Subscription Started',
  },
};
```

---

## 7. Release Checklist

```
PRE-RELEASE CHECKLIST
═════════════════════

□ All tests passing (unit, integration, e2e)
□ No critical/high severity bugs
□ Performance benchmarks met
□ Accessibility audit passed
□ Security review completed
□ Privacy policy updated (if needed)
□ App Store metadata updated
□ Screenshots updated (if UI changed)
□ Release notes written
□ Version number incremented
□ Changelog updated
□ Beta testing completed
□ Stakeholder sign-off

POST-RELEASE CHECKLIST
══════════════════════

□ Monitor crash reports (first 24-48 hours)
□ Monitor user feedback/reviews
□ Monitor analytics for anomalies
□ Verify OTA updates working
□ Confirm push notifications working
□ Test critical user flows in production
□ Document any issues for next release
```

---

## 8. Cost Estimates

```
MOBILE DEPLOYMENT COSTS (Monthly)

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  EAS BUILD (Expo)                                                   │
│  ├── Production tier: $99/month                                    │
│  ├── Includes: 50 builds/month, OTA updates, team features         │
│  └── Overage: $2/build                                             │
│                                                                     │
│  APPLE DEVELOPER                                                    │
│  └── Annual fee: $99/year (~$8.25/month)                           │
│                                                                     │
│  GOOGLE PLAY DEVELOPER                                              │
│  └── One-time fee: $25 (already paid)                              │
│                                                                     │
│  MONITORING                                                         │
│  ├── Sentry (Team): $26/month                                      │
│  ├── Mixpanel (Growth): $25/month                                  │
│  └── Firebase (Blaze): ~$20/month                                  │
│                                                                     │
│  CODE SIGNING                                                       │
│  └── Code signing cert (Windows): ~$200/year (~$17/month)          │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│  TOTAL ESTIMATED: ~$195/month                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.0*
*Last Updated: December 2024*

