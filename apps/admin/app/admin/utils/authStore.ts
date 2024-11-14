import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

interface AuthState {
  user: any; // Change type as needed for your user object
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (phoneNumber: string, password: string) => Promise<void>;
  fetchUserProfile: (token: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Login function to get the token
  login: async (phoneNumber, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/v1/admin/sign-in', { phoneNumber, password });
      console.log('Token:', response);
      const { token } = response.data;
      set({ token, isLoading: false });
      localStorage.setItem('token', token);
   

      // Fetch user profile after successful login
      await useAuthStore.getState().fetchUserProfile(token);
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
    }
  },

  // Function to fetch user profile using the token
  fetchUserProfile: async (token) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('api/v1/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;
      set({ user, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch user profile', isLoading: false });
      console.error('Error fetching profile:', error);
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },
}));
