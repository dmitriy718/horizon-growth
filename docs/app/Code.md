# 💻 Horizon Credit Repair — App Coding Overview

---

## 1. Technology Stack

### 1.1 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.73+ | Cross-platform mobile framework |
| **Expo** | SDK 50+ | Development platform & services |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Node.js** | 20 LTS | Development runtime |

### 1.2 Key Dependencies

| Category | Library | Purpose |
|----------|---------|---------|
| **Navigation** | expo-router | File-based routing |
| **State** | Zustand | Client state |
| **Server State** | TanStack Query | API data caching |
| **UI** | Tamagui | Cross-platform styling |
| **Forms** | React Hook Form + Zod | Form management |
| **Charts** | Victory Native | Data visualization |
| **Animation** | Reanimated 3 | Native animations |
| **Storage** | expo-secure-store | Encrypted storage |
| **Auth** | expo-local-authentication | Biometrics |

---

## 2. Project Structure

```
src/app/
├── app/                              # Expo Router (file-based routing)
│   ├── (auth)/                       # Auth group (unauthenticated)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── forgot-password.tsx
│   │   └── verify-email.tsx
│   │
│   ├── (onboarding)/                 # Onboarding flow
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── goals.tsx
│   │   ├── identity.tsx
│   │   ├── security-setup.tsx
│   │   └── credit-pull.tsx
│   │
│   ├── (tabs)/                       # Main app tabs (authenticated)
│   │   ├── _layout.tsx
│   │   ├── index.tsx                 # Home/Dashboard
│   │   ├── reports/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx             # Reports overview
│   │   │   ├── score-history.tsx
│   │   │   └── [reportId].tsx        # Report detail
│   │   ├── disputes/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx             # Disputes list
│   │   │   ├── new.tsx               # Create dispute wizard
│   │   │   └── [disputeId].tsx       # Dispute detail
│   │   ├── chat/
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx             # AI Chat
│   │   └── profile/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── settings.tsx
│   │       ├── subscription.tsx
│   │       └── documents.tsx
│   │
│   ├── _layout.tsx                   # Root layout
│   ├── +not-found.tsx                # 404 screen
│   └── +html.tsx                     # Web HTML template
│
├── components/                       # Reusable components
│   ├── ui/                           # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Text.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── credit/                       # Credit-specific components
│   │   ├── ScoreCard.tsx
│   │   ├── ScoreGauge.tsx
│   │   ├── ScoreHistory.tsx
│   │   ├── TradelineCard.tsx
│   │   └── BureauCompare.tsx
│   ├── disputes/                     # Dispute components
│   │   ├── DisputeCard.tsx
│   │   ├── DisputeTimeline.tsx
│   │   ├── DisputeWizard/
│   │   │   ├── ItemSelection.tsx
│   │   │   ├── ReasonSelection.tsx
│   │   │   ├── EvidenceUpload.tsx
│   │   │   └── LetterPreview.tsx
│   │   └── LetterViewer.tsx
│   ├── chat/                         # Chat components
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── SuggestedQuestions.tsx
│   │   └── TypingIndicator.tsx
│   ├── layout/                       # Layout components
│   │   ├── SafeAreaView.tsx
│   │   ├── Header.tsx
│   │   ├── TabBar.tsx
│   │   └── LoadingScreen.tsx
│   └── shared/                       # Shared components
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       ├── RefreshControl.tsx
│       └── Skeleton.tsx
│
├── hooks/                            # Custom hooks
│   ├── useAuth.ts
│   ├── useBiometrics.ts
│   ├── useCreditReport.ts
│   ├── useDisputes.ts
│   ├── useNotifications.ts
│   ├── useSecureStorage.ts
│   └── useTheme.ts
│
├── services/                         # API & external services
│   ├── api/
│   │   ├── client.ts                 # API client setup
│   │   ├── auth.ts
│   │   ├── credit.ts
│   │   ├── disputes.ts
│   │   ├── chat.ts
│   │   └── user.ts
│   ├── ai/
│   │   ├── chat.ts
│   │   └── analysis.ts
│   └── storage/
│       ├── secure.ts
│       └── async.ts
│
├── stores/                           # Zustand stores
│   ├── authStore.ts
│   ├── userStore.ts
│   ├── creditStore.ts
│   ├── disputeStore.ts
│   └── chatStore.ts
│
├── utils/                            # Utility functions
│   ├── format.ts                     # Formatters (currency, date, etc.)
│   ├── validation.ts                 # Validation helpers
│   ├── encryption.ts                 # Encryption utilities
│   └── analytics.ts                  # Analytics helpers
│
├── constants/                        # App constants
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── api.ts
│   └── config.ts
│
├── types/                            # TypeScript types
│   ├── index.ts
│   ├── api.ts
│   ├── credit.ts
│   ├── disputes.ts
│   └── navigation.ts
│
├── assets/                           # Static assets
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── animations/                   # Lottie files
│
├── locales/                          # i18n translations
│   ├── en.json
│   └── es.json
│
├── app.json                          # Expo configuration
├── eas.json                          # EAS Build configuration
├── package.json
├── tsconfig.json
└── tamagui.config.ts                 # Tamagui theme config
```

---

## 3. Key Architectural Patterns

### 3.1 Navigation with Expo Router

```typescript
// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { Home, BarChart2, Zap, MessageCircle, User } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="disputes"
        options={{
          title: 'Disputes',
          tabBarIcon: ({ color, size }) => <Zap size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### 3.2 State Management with Zustand

```typescript
// stores/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { User, AuthTokens } from '@/types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const secureStorage = {
  getItem: async (name: string) => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setTokens: (tokens) => set({ tokens }),
      
      logout: () => {
        set({ user: null, tokens: null, isAuthenticated: false });
      },
      
      refreshAuth: async () => {
        const { tokens } = get();
        if (!tokens?.refreshToken) return;
        
        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });
          
          if (response.ok) {
            const newTokens = await response.json();
            set({ tokens: newTokens });
          } else {
            get().logout();
          }
        } catch (error) {
          get().logout();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({ tokens: state.tokens }),
    }
  )
);
```

### 3.3 API Client with React Query

```typescript
// services/api/client.ts

import { QueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { API_BASE_URL } from '@/constants/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const tokens = useAuthStore.getState().tokens;
    return {
      'Content-Type': 'application/json',
      ...(tokens?.accessToken && {
        Authorization: `Bearer ${tokens.accessToken}`,
      }),
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: await this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: await this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        await useAuthStore.getState().refreshAuth();
      }
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);
```

### 3.4 Custom Hook Pattern

```typescript
// hooks/useCreditReport.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api/client';
import { CreditReport, RefreshReportResponse } from '@/types/credit';

export function useCreditReport() {
  const queryClient = useQueryClient();

  const { data: report, isLoading, error, refetch } = useQuery({
    queryKey: ['creditReport'],
    queryFn: () => api.get<CreditReport>('/credit-reports/latest'),
  });

  const refreshMutation = useMutation({
    mutationFn: () => api.post<RefreshReportResponse>('/credit-reports/refresh'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditReport'] });
    },
  });

  const scoreHistory = useQuery({
    queryKey: ['scoreHistory'],
    queryFn: () => api.get('/credit-reports/score-history'),
  });

  return {
    report,
    isLoading,
    error,
    refetch,
    refreshReport: refreshMutation.mutate,
    isRefreshing: refreshMutation.isPending,
    scoreHistory: scoreHistory.data,
  };
}
```

---

## 4. Component Examples

### 4.1 Score Card Component

```typescript
// components/credit/ScoreCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { CreditScore } from '@/types/credit';
import { ScoreGauge } from './ScoreGauge';

interface ScoreCardProps {
  score: CreditScore;
  previousScore?: number;
  variant?: 'compact' | 'expanded';
}

export function ScoreCard({ score, previousScore, variant = 'compact' }: ScoreCardProps) {
  const { colors } = useTheme();
  const change = previousScore ? score.score - previousScore : 0;
  
  const getScoreColor = (score: number) => {
    if (score >= 750) return colors.scoreExcellent;
    if (score >= 700) return colors.scoreGood;
    if (score >= 650) return colors.scoreFair;
    if (score >= 550) return colors.scorePoor;
    return colors.scoreVeryPoor;
  };

  const scoreColor = getScoreColor(score.score);

  if (variant === 'compact') {
    return (
      <View style={[styles.compactContainer, { backgroundColor: colors.surface }]}>
        <Text style={[styles.scoreNumber, { color: scoreColor }]}>
          {score.score}
        </Text>
        <Text style={[styles.scoreLabel, { color: colors.muted }]}>
          {score.rating}
        </Text>
        {change !== 0 && (
          <Text style={[styles.change, { color: change > 0 ? colors.success : colors.error }]}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.expandedContainer, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Your Credit Score</Text>
      
      <ScoreGauge score={score.score} maxScore={850} color={scoreColor} />
      
      <Text style={[styles.scoreNumber, { color: scoreColor }]}>
        {score.score}
      </Text>
      <Text style={[styles.scoreLabel, { color: colors.muted }]}>
        {score.rating}
      </Text>
      
      {change !== 0 && (
        <View style={styles.changeContainer}>
          <Text style={[styles.change, { color: change > 0 ? colors.success : colors.error }]}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)} from last month
          </Text>
        </View>
      )}
      
      <View style={styles.bureauRow}>
        {['experian', 'equifax', 'transunion'].map((bureau) => (
          <View key={bureau} style={styles.bureauItem}>
            <Text style={[styles.bureauName, { color: colors.muted }]}>
              {bureau.charAt(0).toUpperCase()}
            </Text>
            <Text style={[styles.bureauScore, { color: colors.text }]}>
              {score.bureauScores[bureau]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  compactContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  expandedContainer: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  changeContainer: {
    marginTop: 8,
  },
  bureauRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  bureauItem: {
    alignItems: 'center',
  },
  bureauName: {
    fontSize: 12,
  },
  bureauScore: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

### 4.2 AI Chat Component

```typescript
// components/chat/ChatInterface.tsx

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Send, Mic } from 'lucide-react-native';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { SuggestedQuestions } from './SuggestedQuestions';
import { useChatStore } from '@/stores/chatStore';
import { sendMessage } from '@/services/api/chat';
import { useTheme } from '@/hooks/useTheme';

export function ChatInterface() {
  const { colors } = useTheme();
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const { messages, addMessage, setTyping, isTyping } = useChatStore();

  const mutation = useMutation({
    mutationFn: sendMessage,
    onMutate: () => {
      setTyping(true);
    },
    onSuccess: (response) => {
      addMessage({
        id: Date.now().toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      });
    },
    onSettled: () => {
      setTyping(false);
    },
  });

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput('');
    mutation.mutate({ message: input.trim() });
  }, [input, addMessage, mutation]);

  const handleSuggestion = useCallback((question: string) => {
    setInput(question);
    handleSend();
  }, [handleSend]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble message={item} />}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        ListEmptyComponent={
          <SuggestedQuestions onSelect={handleSuggestion} />
        }
      />

      <View style={[styles.inputContainer, { backgroundColor: colors.surface }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={input}
          onChangeText={setInput}
          placeholder="Ask Horizon AI anything..."
          placeholderTextColor={colors.muted}
          multiline
          maxLength={500}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: colors.primary }]}
          onPress={handleSend}
          disabled={!input.trim() || mutation.isPending}
        >
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
```

---

## 5. Testing Strategy

### 5.1 Unit Tests

```typescript
// __tests__/components/ScoreCard.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ScoreCard } from '@/components/credit/ScoreCard';

describe('ScoreCard', () => {
  const mockScore = {
    score: 645,
    rating: 'Fair',
    bureauScores: {
      experian: 642,
      equifax: 648,
      transunion: 645,
    },
  };

  it('renders score correctly', () => {
    render(<ScoreCard score={mockScore} />);
    expect(screen.getByText('645')).toBeTruthy();
    expect(screen.getByText('Fair')).toBeTruthy();
  });

  it('shows positive change indicator', () => {
    render(<ScoreCard score={mockScore} previousScore={620} />);
    expect(screen.getByText(/↑ 25/)).toBeTruthy();
  });

  it('shows negative change indicator', () => {
    render(<ScoreCard score={mockScore} previousScore={660} />);
    expect(screen.getByText(/↓ 15/)).toBeTruthy();
  });

  it('renders bureau scores in expanded variant', () => {
    render(<ScoreCard score={mockScore} variant="expanded" />);
    expect(screen.getByText('642')).toBeTruthy();
    expect(screen.getByText('648')).toBeTruthy();
  });
});
```

### 5.2 E2E Tests (Detox)

```typescript
// e2e/disputes.e2e.ts

describe('Dispute Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
    await loginUser();
  });

  it('should create a new dispute', async () => {
    // Navigate to disputes
    await element(by.id('tab-disputes')).tap();
    await expect(element(by.text('Active Disputes'))).toBeVisible();

    // Start new dispute
    await element(by.id('new-dispute-button')).tap();
    await expect(element(by.text('Select Items'))).toBeVisible();

    // Select an item
    await element(by.id('dispute-item-0')).tap();
    await element(by.id('continue-button')).tap();

    // Select reason
    await element(by.text('Incorrect balance')).tap();
    await element(by.id('continue-button')).tap();

    // Skip evidence
    await element(by.id('skip-button')).tap();

    // Review and submit
    await expect(element(by.text('Review Your Dispute'))).toBeVisible();
    await element(by.id('submit-button')).tap();

    // Verify success
    await expect(element(by.text('Disputes submitted!'))).toBeVisible();
  });
});
```

---

## 6. Security Implementation

### 6.1 Biometric Authentication

```typescript
// hooks/useBiometrics.ts

import { useCallback, useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricState {
  isAvailable: boolean;
  biometricType: 'fingerprint' | 'facial' | 'iris' | null;
  isEnrolled: boolean;
}

export function useBiometrics() {
  const [state, setState] = useState<BiometricState>({
    isAvailable: false,
    biometricType: null,
    isEnrolled: false,
  });

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    let biometricType: BiometricState['biometricType'] = null;
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      biometricType = 'facial';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      biometricType = 'fingerprint';
    } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      biometricType = 'iris';
    }

    setState({
      isAvailable: compatible,
      biometricType,
      isEnrolled: enrolled,
    });
  };

  const authenticate = useCallback(async (
    promptMessage = 'Authenticate to continue'
  ): Promise<boolean> => {
    if (!state.isAvailable || !state.isEnrolled) {
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel: 'Use passcode',
      disableDeviceFallback: false,
    });

    return result.success;
  }, [state]);

  return {
    ...state,
    authenticate,
  };
}
```

### 6.2 Secure Storage

```typescript
// services/storage/secure.ts

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ENCRYPTION_KEY = 'horizon_encryption_key';

export const secureStorage = {
  async set(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  async get(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  },

  async delete(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.set(key, jsonValue);
  },

  async getObject<T>(key: string): Promise<T | null> {
    const jsonValue = await this.get(key);
    if (!jsonValue) return null;
    return JSON.parse(jsonValue) as T;
  },
};
```

---

*Document Version: 1.0*
*Last Updated: December 2024*

