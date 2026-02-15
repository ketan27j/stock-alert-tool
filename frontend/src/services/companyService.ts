import api from './api';

export const searchCompanies = async (query: string) => {
  const res = await api.get(`/companies?search=${encodeURIComponent(query)}`);
  return res.data;
};
