import { useEffect, useState } from 'react';
import { fetchAlerts } from '../services/alertService';

export const useAlerts = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAlerts()
      .then((d) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
};

export default useAlerts;
