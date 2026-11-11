export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Doctor Tracker",
  isProduction: process.env.NODE_ENV === "production",
};

