import { useEffect, useState } from 'react';
import { fetchAnnouncementsApi } from '../services/announcementService';
import { Announcement } from '@typings/announcement.types';

export const useAnnouncements = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAnnouncementsApi({ exchange: 'ALL' })
      .then((d: Announcement[]) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
};

export default useAnnouncements;
