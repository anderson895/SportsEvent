import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3006/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;