import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-54-193-43-48.us-west-1.compute.amazonaws.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
