'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface UseApiDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApiData<T>(
  fetcher: () => Promise<{ success: boolean; data?: T[]; error?: string }>,
  deps: unknown[] = []
): UseApiDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await fetcher();
    if (result.success && result.data) {
      setData(result.data);
    } else {
      setError(result.error || 'Something went wrong.');
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, refetch: load };
}

export { api };