import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/user";
axios.defaults.withCredentials = true;

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      register: async ({ username, email, password }) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/register", { username, email, password });
          set({ user: res.data.user, loading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Signup failed, bro",
            loading: false,
          });
        }
      },

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post("/login", credentials);
          set({ user: res.data.user, loading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await axios.post("/logout");
          set({ user: null, loading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Logout failed",
            loading: false,
          });
        }
      },

      checkAuth: async () => {
        set({ loading: true, error: null });
        try {
          const res = await axios.get("/checkAuth");
          set({ user: res.data.user, loading: false });
        } catch {
          set({ user: null, loading: false });
        }
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;