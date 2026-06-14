import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export const api = axios.create({ baseURL: API_BASE });

export const adminApi = axios.create({ baseURL: API_BASE });

adminApi.interceptors.request.use((config) => {
  const stored = localStorage.getItem('sewing-hub-admin');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Zustand v5 persist wraps state: { state: { token, admin }, version }
      const token = parsed?.state?.token ?? parsed?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

adminApi.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sewing-hub-admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);
