import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

interface Address {
    location: {
        type: string;
        coordinates: [number, number];
    };
    name: string;
    address: string;
    cityAndDistrict: string;
    state: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    subscriptionType: string;
    coin: number;
    role: string;
    dateOfBirth: string;
    gender: string;
    profilePhoto: string[];
    verified: boolean;
    refferalCode: string;
    isBlocked: boolean;
    address: Address[];
    profilePhotoLink : string;
}

interface AuthState {
    users: User[];
    userDetails: User | null;
    isLoading: boolean;
    error: string | null;
    fetchAllUsers: (token: string) => Promise<void>;
    fetchUserById: (id: string, token: string) => Promise<void>;
}

export const useGetUsers = create<AuthState>((set) => ({
    users: [],
    userDetails: null,
    isLoading: false,
    error: null,

    // Function to fetch all users
    fetchAllUsers: async (token) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('api/v1/admin/user/all', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const users = response.data.data.users;
            set({ users, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch users', isLoading: false });
        }
    },

    // Function to fetch user details by ID
    fetchUserById: async (id, token) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            console.log('user',response.data.data);
            set({ userDetails: response.data.data, isLoading: false });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'Failed to fetch user details', isLoading: false });
        }
    },
}));
