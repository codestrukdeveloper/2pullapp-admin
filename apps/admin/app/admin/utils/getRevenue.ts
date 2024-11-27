import { create } from "zustand";

// Keep the existing interface
interface RevenueData {
  currentRevenue: number;
  previousRevenue: number;
  revenueChange: number;
}

interface RevenueState {
  revenue: RevenueData | null;
  isLoading: boolean;
  error: string | null;
  fetchRevenue: (token: string, period: 'daily' | 'weekly' | 'monthly') => Promise<void>;
}

// Dummy data generator
const generateDummyRevenueData = (period: 'daily' | 'weekly' | 'monthly'): RevenueData => {
  const multipliers = {
    daily: 50,
    weekly: 350,
    monthly: 1500
  };

  const currentRevenue = multipliers[period];
  const previousRevenue = currentRevenue * 0.8;
  const revenueChange = Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100);

  return {
    currentRevenue,
    previousRevenue,
    revenueChange
  };
};

export const useGetRevenue = create<RevenueState>((set) => ({
  revenue: null,
  isLoading: false,
  error: null,

  fetchRevenue: async (token, period) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate dummy data
      const revenueData = generateDummyRevenueData(period);
      
      set({ 
        revenue: revenueData, 
        isLoading: false 
      });

      // Placeholder for future API call
      // const response = await axiosInstance.get(`/api/v1/admin/revenue/${period}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
    } catch (error: any) {
      set({
        error: "Failed to fetch revenue",
        isLoading: false
      });
    }
  },
}));
