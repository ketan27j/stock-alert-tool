import { useEffect, useState } from 'react';
import { fetchAnnouncements } from '../services/announcementService';

export const useAnnouncements = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAnnouncements()
      .then((d) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
};

export default useAnnouncements;
