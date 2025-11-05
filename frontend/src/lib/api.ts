import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { authService } from "./auth";
import {
  AuthResponse,
  LoginFormData,
  RegisterFormData,
  Post,
  ApiResponse,
  PostFormData,
} from "@/types";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token to headers
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      authService.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API Service
export const apiService = {
  // Auth endpoints
  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Post endpoints
  async getPosts(
    page: number = 1,
    perPage: number = 10
  ): Promise<ApiResponse<Post[]>> {
    const response = await api.get<ApiResponse<Post[]>>(
      `/posts?page=${page}&per_page=${perPage}`
    );
    return response.data;
  },

  async getPost(id: number): Promise<ApiResponse<Post>> {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data;
  },

  async createPost(data: PostFormData): Promise<ApiResponse<Post>> {
    const response = await api.post<ApiResponse<Post>>("/posts", data);
    return response.data;
  },

  async updatePost(
    id: number,
    data: Partial<PostFormData>
  ): Promise<ApiResponse<Post>> {
    const response = await api.put<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data;
  },

  async deletePost(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/posts/${id}`);
    return response.data;
  },
};

export default api;