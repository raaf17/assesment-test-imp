import Cookies from "js-cookie";
import { User } from "@/types";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authService = {
  // Save token to cookies
  setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 day
  },

  // Get token from cookies
  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY);
  },

  // Remove token
  removeToken(): void {
    Cookies.remove(TOKEN_KEY);
  },

  // Save user to localStorage
  setUser(user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  // Get user from localStorage
  getUser(): User | null {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  // Remove user
  removeUser(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Logout (clear all auth data)
  logout(): void {
    this.removeToken();
    this.removeUser();
  },
};