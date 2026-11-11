"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, logout } from "@/lib/slice/auth/authSlice";
import {
  useLoginMutation,
  useLogoutMutation,
} from "@/lib/feature/auth/authApi";
import baseApi from "@/lib/api/baseApi";
import { LoginPayload } from "@/types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const loginUser = async (credentials: LoginPayload) => {
    try {
      const res = await loginMutation(credentials).unwrap();
      if (res.success && res.data) {
        dispatch(
          loginSuccess({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );
        return { success: true, data: res.data };
      }
      return {
        success: false,
        message: res.message || "Failed to login",
      };
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Invalid email or password";
      return { success: false, message: errorMessage };
    }
  };

  const logoutUser = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Proceed to clear local session regardless of backend error
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isLoggingOut,
    loginUser,
    logoutUser,
  };
}
