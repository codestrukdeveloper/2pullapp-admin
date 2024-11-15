import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

interface User {
  name: string;
  profilePicUrl: string;
  // Add other fields as per your user object
}
interface AuthState {
  user: any; // Change type as needed for your user object
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (phoneNumber: string, password: string, onSuccess: () => void) => Promise<void>; // Update here
  fetchUserProfile: (token: string) => Promise<User>; // Return type is User
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Login function to get the token
  login: async (phoneNumber, password , onSuccess: () => void) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/v1/admin/sign-in', { phoneNumber, password });
      console.log('Token:', response.data);
      const  token  = response?.data?.data?.token;
      set({ token, isLoading: false });
      localStorage.setItem('token', token);
   
      // Fetch user profile after successful login
      await useAuthStore.getState().fetchUserProfile(token);
      // Call the onSuccess callback to trigger redirection
    if (onSuccess) onSuccess();
    } catch (error: any) {
      console.log(error);
      set({ error: 'Invalid Phone Number or Password!', isLoading: false });
    }
  },

  // Function to fetch user profile using the token
  fetchUserProfile: async (token) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get('api/v1/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data.data;
      console.log(user);
      set({ user, isLoading: false });
      return user;
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
