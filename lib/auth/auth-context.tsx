"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { User, LoginData, RegisterData, authApi } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Login
  const login = useCallback(async (data: LoginData) => {
    const res = await authApi.login(data);

    setUser(res.data.user);
  }, []);

  // Register
  const register = useCallback(async (data: RegisterData) => {
    const res = await authApi.register(data);

    setUser(res.data.user);
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  }, []);

  // Fetch current user
  const fetchUser = useCallback(async () => {
    try {
      const res = await authApi.me();

      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  }, []);

  // Initialize authentication
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        /*
         * First request /auth/me.
         *
         * If Access Token is expired,
         * client.ts automatically calls:
         *
         * POST /auth/refresh
         *
         * Then it retries /auth/me.
         */
        const res = await authApi.me();

        if (mounted) {
          setUser(res.data.user);
        }
      } catch {
        /*
         * Only clear user when both:
         * Access Token and Refresh Token
         * are invalid/expired.
         */
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}
