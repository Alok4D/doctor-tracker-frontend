export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: "admin";
    };
  };
}

export interface UserProfileResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: "admin";
  };
}
