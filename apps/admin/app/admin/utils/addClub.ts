import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
interface ClubState {
  loading: boolean;
  error: string | null;
  createClub: (formData: FormData) => Promise<void>;
}

const addClub = create<ClubState>((set) => ({
  loading: false,
  error: null,
  createClub: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/api/v1/club/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to create club",
      });
      throw error;
    }
  },
}));

export default addClub;
