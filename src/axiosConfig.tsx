// src/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '"https://app.vysyamala.com/api/newprofile_get/"', // Change this to your Django server URL
});

export default axiosInstance;
