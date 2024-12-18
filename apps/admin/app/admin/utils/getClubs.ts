import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

interface Club {
  _id: string;
  name: string;
  categories: string[];
  rating: string;
  thumbnail: string;
 
}

interface ClubState {
  clubs: Club[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  totalClubs: number;
  error: string | null;
  fetchClubs: (token: string, page: number) => Promise<void>;
}

export const useGetClubs = create<ClubState>((set) => ({
  clubs: [],
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  totalClubs: 0,
  fetchClubs: async (token: string, page: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(
        "/api/v1/admin/club/all",
        { page },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clubs, totalClubs, totalPages, currentPage } = response.data.data;

      set({
        clubs,
        totalPages,
        currentPage,totalClubs,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch clubs",
        isLoading: false,
      });
    }
  },
}));
