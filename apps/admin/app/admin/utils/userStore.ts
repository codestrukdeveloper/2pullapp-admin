import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  fetchUsers: (token: string, page: number) => Promise<void>;
  addUser: (token: string, userData: Omit<User, "_id">) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,

  fetchUsers: async (token: string, page: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/register",
        { page },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { users, totalPages, currentPage } = response.data.data;

      set({
        users,
        totalPages,
        currentPage,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        isLoading: false,
      });
    }
  },

  addUser: async (token: string, userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(
        "/api/v1/user/register",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        users: [...state.users, response.data.data],
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to add user",
        isLoading: false,
      });
    }
  },
}));
