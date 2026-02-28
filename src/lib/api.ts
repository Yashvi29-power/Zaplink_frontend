import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";

/* ===========================
   BASE URL
=========================== */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

/* ===========================
   AXIOS INSTANCE
=========================== */

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
   CENTRALIZED ERROR HANDLING
=========================== */

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;

    let message =
      error.response?.data?.message ||
      "Something went wrong. Please try again.";

    if (status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      message = "Session expired. Please login again.";
      window.location.href = "/login";
    } else if (status === 403) {
      message = "You do not have permission to perform this action.";
    } else if (status === 404) {
      message = "Requested resource not found.";
    } else if (status === 500) {
      message = "Server error. Please try again later.";
    }

    return Promise.reject({
      status,
      message,
    });
  }
);

/* ===========================
   GENERIC RESPONSE TYPE
=========================== */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/* ===========================
   AUTH APIs
=========================== */

export const authApi = {
  login: async (emailOrUsername: string, password: string) => {
    const response = await api.post<ApiResponse<any>>(
      "/api/auth/login",
      { emailOrUsername, password }
    );
    return response.data;
  },

  register: async (
    email: string,
    username: string,
    password: string,
    leetcodeUsername: string
  ) => {
    const response = await api.post<ApiResponse<any>>(
      "/api/auth/register",
      { email, username, password, leetcodeUsername }
    );
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get<ApiResponse<any>>(
      "/api/auth/profile"
    );
    return response.data;
  },

  updateProfile: async (data: { leetcodeUsername?: string }) => {
    const response = await api.put<ApiResponse<any>>(
      "/api/auth/profile",
      data
    );
    return response.data;
  },
};

/* ===========================
   CHALLENGE APIs
=========================== */

export const challengeApi = {
  create: async (data: any) => {
    const response = await api.post<ApiResponse<any>>(
      "/api/challenges",
      data
    );
    return response.data;
  },

  getAll: async (params?: { status?: string; owned?: boolean }) => {
    const response = await api.get<ApiResponse<any>>(
      "/api/challenges",
      { params }
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(
      `/api/challenges/${id}`
    );
    return response.data;
  },
};

/* ===========================
   DASHBOARD APIs
=========================== */

export const dashboardApi = {
  getOverview: async () => {
    const response = await api.get<ApiResponse<any>>(
      "/api/dashboard"
    );
    return response.data;
  },
};

/* ===========================
   EXPORT INSTANCE
=========================== */

export default api;