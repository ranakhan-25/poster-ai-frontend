import { apiClient } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface MeResponse {
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export const authApi = {
  login: (data: LoginData) => apiClient.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>("/auth/register", data),

  me: () => apiClient.get<MeResponse>("/auth/me"),

  refresh: () => apiClient.post<AuthResponse>("/auth/refresh", {}),

  logout: () => apiClient.post<LogoutResponse>("/auth/logout", {}),
};
