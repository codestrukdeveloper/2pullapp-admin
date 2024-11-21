import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

// Define the interface for the API response
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Define the interface for Club based on the API response
interface Club {
  _id: string;
  name: string;
  phoneNumber: string;
  owner: string;
  rating: string;
  cuisines: string[];
  dietaryOptions: string[];
  beveragesImages: string[];
  facilities: any[];
  categories: string[];
  dressType: string[];
  otherPhotos: any[];
  images: string[];
  venueType: string[];
  socialMedia: any[];
  menuImages: string[];
  capacity: number;
  estimatedCostPerHead: number;
  clubSeat: {
    name: string;
    openDays: {
      day: string;
      slot: {
        opensAt: string;
        closeAt: string;
      };
    }[];
    currency: string;
    prices: any[];
  }[];
  temporaryClosed: boolean;
  isDeleted: boolean;
  isSuspended: boolean;
  isComplete: boolean;
  openToday: boolean;
  createdAt: string;
  updatedAt: string;
  clubLocation: string;
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
  if (axiosInstance(error)) {
   
    if (error instanceof Error) {
      return error.message || "An unexpected error occurred.";
    }

    return "An unhandled error occurred.";
  };
}
// Create the Zustand store
export const useClubStore = create<ClubState>((set, get) => ({
  clubs: [],
  currentClub: null,
  isLoading: false,
  error: null,

  fetchClubs: async (token) => {
    set({ isLoading: true, error: null });

    try {
      const response: ApiResponse<{ clubs: Club[] }> = await axiosInstance.get(
        "/clubs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    set({ isLoading: true, error: null });
    try {
      const response: ApiResponse<{ data: Club }> = await axiosInstance.get(
        `api/v1/club/${clubId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ currentClub: response.data.data, isLoading: false });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({
        error: errorMessage,
        isLoading: false,
      });
      console.error("Error fetching club details:", error);
    }
  },

  updateClub: async (token, clubId, clubData) => {
    set({ isLoading: true, error: null });

    try {
      const response: ApiResponse<Club> = await axiosInstance.put(
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
