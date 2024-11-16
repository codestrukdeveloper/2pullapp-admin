import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';

// import { useState, useEffect } from "react";

interface Club {
    id: string;
    name: string;
    description: string;
   
}

interface AuthState {
    clubs: Club[]; 
    isLoading: boolean;
    error: string | null;
    fetchClubs: (token: string) => Promise<void>;
}

// export const useGetClubs = create<AuthState>((set) => ({
//     clubs: [],
//     isLoading: false,
//     error: null,


//     fetchClubs: async (token) => {
//         set({ isLoading: true });
//         try {
//             const response = await axiosInstance.get('/api/v1/admin/club/all', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//           console.log(response , 'helloojfnwkbiu')
//           const clubs = response.data.data;
          
//             set({ clubs, isLoading: false });
//         } catch (error: any) {
//             set({ error: error.response?.data?.message || 'Failed to fetch clubs', isLoading: false });
//         }
//   },
    
// }));
// // src/app/admin/utils/getClubs.ts

// import { useState, useEffect } from "react";

// // Example of a fetch function for clubs
// const fetchClubs = async (token: string) => {
//   const response = await fetch("/api/clubs", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch clubs");
//   }
//   return response.json();
// };

// Custom hook for getting clubs
import { useState, useEffect } from "react";

// Example of a fetch function for clubs
const fetchClubs = async (token: string) => {
  console.log(token, "token")
  const response = await axiosInstance.post("/api/v1/admin/club/all", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzM1YzdlMjE5MGJmOTJiODEzMDM4YmMiLCJpYXQiOjE3MzE3ODIzMTAsImV4cCI6MTczNDM3NDMxMH0.v4QzOfaVjoMvl3-j-T2ZVSlMZZUcRGJR7IoQppxRmgg`,
    },
  });
  console.log(response, "helloojfnwkbiu")

  if (!response)
  
  {
    throw new Error("Failed to fetch clubs");
  }
  return response.data.json();
};

// Custom hook for getting clubs
export const useGetClubs = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setIsLoading(false);
          return;
        }
        console.log(token, "token")
        const data = await fetchClubs(token);
        setClubs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadClubs();
  }, []);

  return { clubs, error, isLoading };
};