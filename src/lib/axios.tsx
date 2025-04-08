/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
console.log(import.meta.env);

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
    const protectedRoutes = [
      `auth/${import.meta.env.VITE_KEY_CLOAK}/token`,
      "appointment/api/doctors/create-account",
      "/appointment/api/patients/create-account",
      "/public-endpoint",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      error.config.url.includes(route)
    );

    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error?.response?.status === 401) {
      if (isProtectedRoute) {
        // Return the error for login page to handle
        return Promise.reject(error);
      } else {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
