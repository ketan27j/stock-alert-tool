import { useEffect, useState } from 'react';
import { alertService } from '../services/alertService';
import { Alert } from '@typings/alert.types';

export const useAlerts = (userId: number) => {
  const [data, setData] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    alertService.getAll(userId)
      .then((d: Alert[]) => mounted && setData(d))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
};

export default useAlerts;
