import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricEnabled: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  login: (email: string, password?: string, isBiometric?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  setUser: (user: User) => void;
  setBiometricEnabled: (enabled: boolean) => void;
  setOnboardingComplete: () => void;
  checkAuth: () => Promise<boolean>;
}

// API Base URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.horizoncredit.net";

// Secure storage helpers
const saveSecureItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

const getSecureItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

const deleteSecureItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error deleting ${key}:`, error);
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      biometricEnabled: false,
      hasCompletedOnboarding: false,

      login: async (email: string, password?: string, isBiometric?: boolean) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, isBiometric }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
          }

          const tokens: AuthTokens = await response.json();

          // Store tokens securely
          await saveSecureItem("accessToken", tokens.accessToken);
          await saveSecureItem("refreshToken", tokens.refreshToken);

          // Fetch user profile
          const userResponse = await fetch(`${API_BASE_URL}/customers/me`, {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });

          let user: User | null = null;
          if (userResponse.ok) {
            const customerData = await userResponse.json();
            user = {
              id: customerData.user.id,
              email: customerData.user.email,
              firstName: customerData.user.firstName,
              lastName: customerData.user.lastName,
              phone: customerData.user.phone,
            };
          }

          set({
            tokens,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
          }

          const tokens: AuthTokens = await response.json();

          // Store tokens securely
          await saveSecureItem("accessToken", tokens.accessToken);
          await saveSecureItem("refreshToken", tokens.refreshToken);

          // Set user from registration data
          const user: User = {
            id: "", // Will be populated after first profile fetch
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
          };

          set({
            tokens,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        const { tokens } = get();
        
        try {
          if (tokens?.refreshToken) {
            await fetch(`${API_BASE_URL}/auth/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            });
          }
        } catch (error) {
          console.error("Logout API error:", error);
        }

        // Clear secure storage
        await deleteSecureItem("accessToken");
        await deleteSecureItem("refreshToken");

        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      refreshTokens: async () => {
        const { tokens } = get();
        if (!tokens?.refreshToken) {
          throw new Error("No refresh token available");
        }

        try {
          const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
          });

          if (!response.ok) {
            throw new Error("Token refresh failed");
          }

          const newTokens: AuthTokens = await response.json();

          // Update secure storage
          await saveSecureItem("accessToken", newTokens.accessToken);
          await saveSecureItem("refreshToken", newTokens.refreshToken);

          set({ tokens: newTokens });
        } catch (error) {
          // If refresh fails, logout
          await get().logout();
          throw error;
        }
      },

      setUser: (user: User) => {
        set({ user });
      },

      setBiometricEnabled: (enabled: boolean) => {
        set({ biometricEnabled: enabled });
      },

      setOnboardingComplete: () => {
        set({ hasCompletedOnboarding: true });
      },

      checkAuth: async () => {
        const accessToken = await getSecureItem("accessToken");
        const refreshToken = await getSecureItem("refreshToken");

        if (!accessToken || !refreshToken) {
          set({ isAuthenticated: false, tokens: null, user: null });
          return false;
        }

        // Check if access token is expired
        const { tokens } = get();
        if (tokens && tokens.expiresAt < Date.now()) {
          try {
            await get().refreshTokens();
            return true;
          } catch {
            return false;
          }
        }

        return true;
      },
    }),
    {
      name: "horizon-auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist non-sensitive data
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        biometricEnabled: state.biometricEnabled,
        // User info is persisted but tokens are stored in SecureStore
        user: state.user,
      }),
    }
  )
);
