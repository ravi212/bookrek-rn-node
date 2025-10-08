import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "http://192.168.137.1:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      
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
}));
