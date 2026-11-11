"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSuccess, logout } from "@/lib/slice/auth/authSlice";
import { useLoginMutation, useGetMeQuery } from "@/lib/feature/auth/authApi";
import { LoginPayload } from "@/types/auth.types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const [loginMutation, { isLoading }] = useLoginMutation();

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
