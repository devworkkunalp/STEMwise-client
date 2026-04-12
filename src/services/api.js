import axios from 'axios';

// Centralized Axios instance configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5200/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach authorization token to every request if user is logged in
api.interceptors.request.use(async (config) => {
  try {
    const localToken = localStorage.getItem('local_jwt');
    if (localToken) {
      config.headers.Authorization = `Bearer ${localToken}`;
    }
  } catch (error) {
    console.warn("API Interceptor error:", error);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Generic response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error formats globally
    const customError = new Error(
      error.response?.data?.message || 
      error.message || 
      'An unexpected network error occurred.'
    );
    customError.status = error.response?.status;
    customError.code = error.code;
    return Promise.reject(customError);
  }
);

export default api;
