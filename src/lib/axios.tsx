/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const headers = { ...config };
        headers.headers.Authorization = `Bearer ${token}`;
        return headers;
      }
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error?.response?.status === 401) {
      // console.log("axiosss", error);
      // Handle unauthorized errors (e.g., redirect to login)
      // console.log("Unauthorized, logging out...");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    // else if (error?.response?.status === 403) {
    //   toast.error("Your account is restricted from accessing this feature", {
    //     style: { backgroundColor: "#f44336", color: "white" },
    //   });
    // }
    return Promise.reject(error);
  }
);

export default api;
