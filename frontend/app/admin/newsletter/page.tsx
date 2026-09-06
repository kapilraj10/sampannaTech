'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import { formatDate } from '@/lib/utils';
import type { Subscriber } from '@/types';

export default function AdminNewsletterPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Subscriber | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.list<Subscriber[]>('newsletter');
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data);
    } else {
      setError(res.error || 'Failed to load subscribers.');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await adminApi.remove('newsletter', deleting._id);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i._id !== deleting._id));
        toast('Subscriber removed.');
      } else {
        toast(res.error || 'Failed to delete.', 'error');
      }
    } catch {
      toast('Unable to delete.', 'error');
    }
    setDeleting(null);
  };

  return (
    <>
      <AdminPageHeader
        title="Newsletter"
        description="People subscribed to the newsletter via the footer."
      />

      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl border border-slate-200 bg-white" />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
          <button type="button" onClick={load} className="ml-3 font-semibold underline">
            Retry
          </button>
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">No subscribers yet.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Subscribed on</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{item.email}</td>
                  <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setDeleting(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${item.email}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Remove subscriber"
        message={`Remove "${deleting?.email}" from the newsletter list? This cannot be undone.`}
      />
    </>
  );
}