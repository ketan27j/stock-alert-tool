import api from './api';
import { Alert, CreateAlertDto } from '../types/alert.types';

export const alertService = {
  getAll: async (userId: number) => {
    const response = await api.get<Alert[]>(`/alerts/user/${userId}`);
    return response.data;
  },

  create: async (userId: number, alertData: CreateAlertDto) => {
    const response = await api.post<Alert>('/alerts', {
      userId,
      ...alertData,
    });
    return response.data;
  },

  toggle: async (id: number, userId: number) => {
    const response = await api.patch<Alert>(`/alerts/${id}/toggle`, { userId });
    return response.data;
  },

  delete: async (id: number, userId: number) => {
    await api.delete(`/alerts/${id}`, { data: { userId } });
  },
};