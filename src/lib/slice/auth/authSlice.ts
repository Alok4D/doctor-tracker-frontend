import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@/types/auth.types";

interface AuthState {
  user: TUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getInitialUser = (): TUser | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialToken = getInitialToken();
const initialUser = getInitialUser();

const initialState: AuthState = {
  user: initialUser,
  token: initialToken,
  isAuthenticated: Boolean(initialToken),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: TUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

