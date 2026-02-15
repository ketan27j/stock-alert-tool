import api from './api';

export const fetchAnnouncements = async () => {
  const res = await api.get('/announcements');
  return res.data;
};
