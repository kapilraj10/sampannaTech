'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Search, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import { formatDate } from '@/lib/utils';
import type { Enquiry } from '@/types';

const statusOptions = ['new', 'contacted', 'closed'];

const statusLabel: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
};

const statusStyle: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-amber-50 text-amber-700',
  closed: 'bg-slate-100 text-slate-600',
};

export default function AdminContactsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<Enquiry | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (search.trim()) params.set('search', search.trim());
    const res = await adminApi.list<Enquiry[]>('contact', params.toString());
    if (res.success && Array.isArray(res.data)) {
      setItems(res.data);
    } else {
      setError(res.error || 'Failed to load enquiries.');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = async (id: string, next: string) => {
    const res = await adminApi.update('contact', id, { status: next });
    if (res.success) {
      setItems((prev) => prev.map((i) => (i._id === id ? { ...i, status: next as Enquiry['status'] } : i)));
      toast('Enquiry status updated.');
    } else {
      toast(res.error || 'Failed to update status.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      const res = await adminApi.remove('contact', deleting._id);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i._id !== deleting._id));
        toast('Enquiry deleted.');
      } else {
        toast(res.error || 'Failed to delete.', 'error');
      }
    } catch {
      toast('Unable to delete.', 'error');
    }
    setDeleting(null);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <>
      <AdminPageHeader
        title="Contacts"
        description="Enquiries submitted through the website contact form."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-full border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setStatus('')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              status === '' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All
          </button>
          {statusOptions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                status === s ? 'bg-brand-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {statusLabel[s]}
            </button>
          ))}
        </div>
        <form onSubmit={handleSearch} className="flex min-w-0 flex-1">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or company…"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl border border-slate-200 bg-white" />
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
          <p className="text-sm text-slate-500">No enquiries match your filters.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">
                    {item.name}
                    {item.company ? ` · ${item.company}` : ''}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}
                    {item.service ? ` · Interested in: ${item.service}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-100 ${statusStyle[item.status] || statusStyle.new}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete enquiry from ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.message}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                {item.email && (
                  <a href={`mailto:${item.email}`} className="hover:text-brand-600">
                    {item.email}
                  </a>
                )}
                {item.phone && <span>{item.phone}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete enquiry"
        message={`Delete the enquiry from "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}