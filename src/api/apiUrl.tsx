//API url apiUrl.tsx
import axios from 'axios';

export const apiUrl = {
  // apiUrlConfig: "https://vysyamaladevnew-aehaazdxdzegasfb.westcentralus-01.azurewebsites.net/",
  apiUrlConfig: "https://app.vysyamala.com/",
  // apiUrlConfig: "https://vysyamaladevnew-aehaazdxdzegasfb.westcentralus-01.azurewebsites.net/",    // Azure
  //http://103.214.132.20:8000
}

// Create an Axios instance with the base URL
export const apiAxios = axios.create({
  baseURL: apiUrl.apiUrlConfig,
  // You can add default headers here if needed
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});