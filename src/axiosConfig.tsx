// src/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '"https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/api/newprofile_get/"', // Change this to your Django server URL
});

export default axiosInstance;
