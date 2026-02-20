import api from './api';
import { Announcement, AnnouncementFilters } from '../types/announcement.types';

export const fetchAnnouncementsApi = async (
  params: AnnouncementFilters & { page?: number; limit?: number }
): Promise<Announcement[]> => {
  const res = await api.get('/announcements', { params });
  return Array.isArray(res.data?.data) ? res.data.data : [];
};

export const fetchLatestAnnouncementsApi = async (limit: number): Promise<Announcement[]> => {
  const res = await api.get('/announcements/latest', { params: { limit } });
  return Array.isArray(res.data) ? res.data : [];
};
