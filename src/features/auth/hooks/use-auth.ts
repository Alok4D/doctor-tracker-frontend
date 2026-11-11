"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, logout } from "@/store/slices/auth-slice";
import { LoginCredentials } from "../types/auth.types";
import { useState } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Static mock login handler for visual demonstration
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockResponse = {
        user: {
          id: "admin-1",
          name: "Admin",
          email: credentials.email,
          role: "admin" as const,
        },
        token: "mock-jwt-token-care-guide",
      };

      dispatch(loginSuccess(mockResponse));
      return { success: true, data: mockResponse };
    } catch {
      return { success: false, message: "Invalid credentials" };
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    loginUser,
    logoutUser,
  };
}

