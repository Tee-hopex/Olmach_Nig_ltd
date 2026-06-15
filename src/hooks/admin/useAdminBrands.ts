import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, api } from '../../lib/api';
import toast from 'react-hot-toast';

export function useAdminBrands() {
  return useQuery({
    queryKey: ['admin-brands'],
    queryFn: async () => {
      const { data } = await adminApi.get('/brands');
      return data;
    },
  });
}

export function usePublicBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await api.get('/brands');
      return data;
    },
  });
}

export function useCreateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const { data } = await adminApi.post('/brands', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-brands'] });
      toast.success('Brand created');
    },
    onError: () => toast.error('Failed to create brand'),
  });
}

export function useUpdateBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: { id: string; [k: string]: unknown }) => {
      const { data } = await adminApi.patch(`/brands/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-brands'] });
      toast.success('Brand updated');
    },
    onError: () => toast.error('Failed to update brand'),
  });
}

export function useDeleteBrand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await adminApi.delete(`/brands/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-brands'] });
      toast.success('Brand deleted');
    },
    onError: () => toast.error('Failed to delete brand'),
  });
}
