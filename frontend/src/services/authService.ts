import apiClient from "@/lib/apiClient";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post("/auth/login", credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post("/auth/register", credentials);
    return data;
  },

  getProfile: async () => {
    const { data } = await apiClient.get("/auth/me");
    return data;
  },

  changePassword: async (passwordData: any) => {
    const { data } = await apiClient.post(
      "/auth/change-password",
      passwordData,
    );
    return data;
  },
};
