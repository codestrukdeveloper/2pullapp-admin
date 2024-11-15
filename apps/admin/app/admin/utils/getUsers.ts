import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

interface User {
    id: string;
    name: string;
    profilePicUrl: string;
    phoneNumber: string;
    email: string;
    // Add other fields as per your user object
}

interface AuthState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    fetchAllUsers: (token: string) => Promise<void>;
}

export const useGetUSers = create<AuthState>((set) => ({
    users: [],
    isLoading: false,
    error: null,

    // Function to fetch all users
    fetchAllUsers: async (token) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('api/v1/admin/user/all', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const users = response.data.data;
            console.log('All Users:', users);
            set({ users, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch users', isLoading: false });
            console.error('Error fetching users:', error);
        }
    },


}));
