import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://main.2pullapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
