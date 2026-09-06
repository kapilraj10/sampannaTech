'use client';

import { useCallback, useEffect, useState } from 'react';
import { adminApi } from '@/lib/admin';

export function useAdminCrud<T extends { _id: string }>(
  resource: string,
  params = '',
  listPath?: string
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.list<T[]>(listPath || resource, params);
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data as T[]);
    } else if (res.success && res.data && !Array.isArray(res.data)) {
      setError('Unexpected response shape.');
    } else {
      setError(res.error || 'Failed to load.');
    }
    setLoading(false);
  }, [resource, params, listPath]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (body: object): Promise<boolean> => {
    setSaving(true);
    const res = await adminApi.create(resource, body as Record<string, unknown>);
    setSaving(false);
    if (res.success) {
      await load();
      return true;
    }
    throw new Error(res.error || 'Failed to create.');
  };

  const update = async (id: string, body: object): Promise<boolean> => {
    setSaving(true);
    const res = await adminApi.update(resource, id, body as Record<string, unknown>);
    setSaving(false);
    if (res.success) {
      await load();
      return true;
    }
    throw new Error(res.error || 'Failed to update.');
  };

  const remove = async (id: string): Promise<boolean> => {
    setSaving(true);
    const res = await adminApi.remove(resource, id);
    setSaving(false);
    if (res.success) {
      setItems((prev) => prev.filter((i) => i._id !== id));
      return true;
    }
    throw new Error(res.error || 'Failed to delete.');
  };

  return { items, loading, saving, error, load, create, update, remove, setItems };
}

export default useAdminCrud;