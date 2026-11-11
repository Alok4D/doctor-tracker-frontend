export interface TUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
  avatar?: string;
  isActive?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: TUser;
  };
}

export interface UserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: TUser & {
    _id: string;
  };
}

