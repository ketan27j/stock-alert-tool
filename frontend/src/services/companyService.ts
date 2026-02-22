import api from './api';
import { Company } from '@typings/announcement.types';

export const companyService = {
  getAll: async (exchange?: 'NSE' | 'BSE') => {
    const response = await api.get<Company[]>('/companies', {
      params: { exchange },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  },

  search: async (query: string) => {
    const response = await api.get<Company[]>('/companies/search', {
      params: { q: query },
    });
    return response.data;
  },
};