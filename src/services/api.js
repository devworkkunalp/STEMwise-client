import axios from 'axios';
import { supabase } from '../utils/supabase';

/**
 * Custom Axios Instance for .NET Backend
 * Automatically injects the Supabase JWT token from current session.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5297/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // Get current Supabase session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (session?.access_token) {
      // Injects the Supabase JWT into the Authorization header
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios Response Interceptor (for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors globally if needed
    if (error.response?.status === 401) {
      console.warn('Unauthorized API call. Token might be expired.');
    }
    return Promise.reject(error);
  }
);

export default api;
