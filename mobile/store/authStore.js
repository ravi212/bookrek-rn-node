import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      console.log("Registration successful:", data);
      set({ user: data.user, token: data.token, isLoading: false });
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Login failed");
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      console.log("Login successful:", data);
      set({ user: data.user, token: data.token, isLoading: false });
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token && user) {
        set({ token, user: JSON.parse(user) });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ user: null, token: null });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
