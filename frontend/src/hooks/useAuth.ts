import { useState } from "react";
import { fetchApi } from "../lib/api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      localStorage.setItem("token", data.token);
      // Remove sensitive user storage - profileService handles safe summary
      localStorage.removeItem("user");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userData: any,
    redirectPath: string | null = "/onboarding",
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      localStorage.setItem("token", data.token);
      // Remove sensitive user storage - profileService handles safe summary
      localStorage.removeItem("user");
      if (redirectPath) router.push(redirectPath);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return { login, register, logout, loading, error };
}
