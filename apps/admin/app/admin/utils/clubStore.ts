import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
import axios, { AxiosResponse } from "axios";

// Define the interface for Club based on the API response
interface Club {
  _id: string;
  name: string;
  categories: string[];
  phoneNumber: string;
  rating: string;
  cuisines: string[];
  dietaryOptions: string[];
  capacity: number;
  estimatedCostPerHead: number;
  // Add other fields as needed
}

// Define the store interface
interface ClubState {
  clubs: Club[];
  currentClub: Club | null;
  isLoading: boolean;
  error: string | null;
  fetchClubs: (token: string) => Promise<void>;
  fetchClubDetails: (token: string, clubId: string) => Promise<void>;
  updateClub: (
    token: string,
    clubId: string,
    clubData: Partial<Club>
  ) => Promise<void>;
}

// Utility function to extract error messages safely
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unknown server error occurred.";
  }
  return (error as Error).message || "An unknown error occurred.";
};

// Create the Zustand store
export const useClubStore = create<ClubState>((set, get) => ({
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,

  fetchClubs: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("/clubs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ clubs: response.data.clubs, isLoading: false });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchClubDetails: async (token: string, clubId: string) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`api/v1/club/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const club = response.data.data;
      set({ currentClub: club, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch club details",
        isLoading: false,
      });
      console.error("Error fetching club details:", error);
    }
  },

  updateClub: async (token, clubId, clubData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.put(
        `/api/v1/admin/club/${clubId}`,
        clubData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        currentClub: response.data,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
