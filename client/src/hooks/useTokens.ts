import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Token, Alert } from '@shared/schema';
import type { TokenFilters, TokenStats } from '@/types';

export function useTokens(filters?: TokenFilters) {
  return useQuery({
    queryKey: ['/api/tokens', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            params.append(key, value.toString());
          }
        });
      }
      const url = `/api/tokens${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json() as Promise<Token[]>;
    },
  });
}

export function useToken(id: number) {
  return useQuery({
    queryKey: ['/api/tokens', id],
    queryFn: async () => {
      const response = await fetch(`/api/tokens/${id}`);
      if (!response.ok) throw new Error('Failed to fetch token');
      return response.json() as Promise<Token>;
    },
  });
}

export function useTokenStats() {
  return useQuery({
    queryKey: ['/api/stats'],
    queryFn: async () => {
      const response = await fetch('/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json() as Promise<TokenStats>;
    },
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ['/api/alerts'],
    queryFn: async () => {
      const response = await fetch('/api/alerts');
      if (!response.ok) throw new Error('Failed to fetch alerts');
      return response.json() as Promise<Alert[]>;
    },
  });
}

export function useMarkAlertAsRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertId: number) => {
      await apiRequest('PATCH', `/api/alerts/${alertId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });
}
