import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../../lib/api';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const { data } = await adminApi.get('/admin/dashboard');
      return data;
    },
    refetchInterval: 60_000,
  });
}

export function useAdminSettings() {
  return useQuery({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const { data } = await adminApi.get('/admin/settings');
      return data;
    },
  });
}

export function useAdminBlog(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['admin-blog', params],
    queryFn: async () => {
      const { data } = await adminApi.get('/blog', { params });
      return data;
    },
  });
}
