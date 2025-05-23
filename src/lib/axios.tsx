/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
// api.interceptors.response.use(
//   (response) => {
//     // Any status code that lies within the range of 2xx causes this function to trigger
//     return response;
//   },
//   (error) => {
//     const protectedRoutes = [
//       `auth/${import.meta.env.VITE_KEY_CLOAK}/token`,
//       "appointment/api/doctors/create-account",
//       "/appointment/api/patients/create-account",
//       "/public-endpoint",
//     ];

//     const isProtectedRoute = protectedRoutes.some((route) =>
//       error.config.url.includes(route)
//     );

//     // Any status codes that falls outside the range of 2xx causes this function to trigger
//     if (error?.response?.status === 401) {
//       if (isProtectedRoute) {
//         // Return the error for login page to handle
//         return Promise.reject(error);
//       } else {
//         sessionStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const protectedRoutes = [
      `auth/${import.meta.env.VITE_KEY_CLOAK}/token`,
      "appointment/api/doctors/create-account",
      "/appointment/api/patients/create-account",
      "/public-endpoint",
    ];

    const isProtectedRoute = protectedRoutes.some((route) =>
      originalRequest.url.includes(route)
    );

    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isProtectedRoute) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!refreshToken) {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const { access_token, refresh_token: newRefreshToken } = response.data;

        sessionStorage.setItem("token", access_token);
        if (newRefreshToken) {
          sessionStorage.setItem("refresh_token", newRefreshToken);
        }

        api.defaults.headers.common["Authorization"] = "Bearer " + access_token;
        originalRequest.headers["Authorization"] = "Bearer " + access_token;
        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
