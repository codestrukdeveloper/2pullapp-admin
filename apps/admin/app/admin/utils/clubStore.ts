import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
import axios, { AxiosResponse } from "axios";

// Define the interface for Club based on your existing context
interface Club {
  _id: string;
  name: string;
  categories: string[];
  thumbnail?: string;
  rating?: number;
  description?: string;
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

// Response data structure from the server
interface FetchClubsResponse {
  clubs: Club[];
}

interface FetchClubDetailsResponse {
  club: Club;
}

// Utility function to extract error messages safely
const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unknown server error occurred.";
  }
  return (error as Error).message || "An unknown error occurred.";
};

// Create the Zustand store
export const useClubStore = create<ClubState>((set) => ({
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,

  fetchClubs: async (token) => {
    console.log("Fetching Clubs:", {
      token: token ? "Token Present" : "No Token",
    });
    set({ isLoading: true, error: null });

    try {
      const response: AxiosResponse<FetchClubsResponse> =
        await axiosInstance.get("/clubs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log("Fetched Clubs Data:", { clubs: response.data.clubs });
      set({ clubs: response.data.clubs, isLoading: false });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.error("Fetch Clubs Error:", errorMessage);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  fetchClubDetails: async (token, clubId) => {
    console.log("Fetching Club Details for ID:", clubId);
    set({ isLoading: true, error: null });

    try {
      const response: AxiosResponse<FetchClubDetailsResponse> =
        await axiosInstance.get(`/clubs/${clubId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log("Fetched Club Details:", { club: response.data });
      set({
        currentClub: response.data.club,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.error("Fetch Club Details Error:", errorMessage);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  updateClub: async (token, clubId, clubData) => {
    console.log("Updating Club Details:", { clubId, clubData });
    set({ isLoading: true, error: null });

    try {
      const response: AxiosResponse<Club> = await axiosInstance.put(
        `/clubs/${clubId}`,
        clubData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated Club Details:", { club: response.data });
      set({
        currentClub: response.data,
        isLoading: false,
      });
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.error("Update Club Details Error:", errorMessage);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
