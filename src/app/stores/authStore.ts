import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricsEnabled: boolean;

  // Actions
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  setBiometrics: (enabled: boolean) => void;
  refreshAuth: () => Promise<void>;
}

// Secure storage adapter for Zustand
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
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
      biometricsEnabled: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      setTokens: (tokens) => set({ tokens }),

      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setBiometrics: (enabled) => set({ biometricsEnabled: enabled }),

      refreshAuth: async () => {
        const { tokens, logout } = get();
        if (!tokens?.refreshToken) {
          logout();
          return;
        }

        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            }
          );

          if (response.ok) {
            const newTokens = await response.json();
            set({ tokens: newTokens.data });
          } else {
            logout();
          }
        } catch (error) {
          console.error("Auth refresh failed:", error);
          logout();
        }
      },
    }),
    {
      name: "horizon-auth-storage",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        tokens: state.tokens,
        biometricsEnabled: state.biometricsEnabled,
      }),
    }
  )
);

