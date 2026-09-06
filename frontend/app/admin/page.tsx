'use client';

import Link from 'next/link';
import {
  FileText,
  FolderOpen,
  Inbox,
  MessageSquareQuote,
  Package,
  UserPlus,
  Users,
  Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { adminApi } from '@/lib/admin';
import { useAuth } from '@/components/admin/AuthProvider';
import { formatDate } from '@/lib/utils';
import type { Enquiry } from '@/types';

interface StatsState {
  counts: Record<string, number>;
  recentContacts: Enquiry[];
}

const countCards = [
  { key: 'contacts', label: 'Contact enquiries', icon: Inbox, href: '/admin/contacts' },
  { key: 'services', label: 'Services', icon: Wrench, href: '/admin/services' },
  { key: 'products', label: 'Products', icon: Package, href: '/admin/products' },
  { key: 'projects', label: 'Projects', icon: FolderOpen, href: '/admin/projects' },
  { key: 'blogs', label: 'Blog posts', icon: FileText, href: '/admin/blog' },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, href: '/admin/testimonials' },
  { key: 'teamMembers', label: 'Team members', icon: Users, href: '/admin/team' },
  { key: 'subscribers', label: 'Newsletter subscribers', icon: UserPlus, href: '/admin/newsletter' },
];

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

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .getStats()
      .then((res) => {
        if (res.success && res.data && 'counts' in res.data) {
          const data = res.data as {
            counts: Record<string, number>;
            recentContacts: Enquiry[];
          };
          setStats({ counts: data.counts, recentContacts: data.recentContacts || [] });
        } else {
          setError(res.error || 'Failed to load dashboard.');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        ))}
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.name || 'there'}. Here is an overview of your content.`}
      />

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {countCards.map((card) => (
              <Link
                key={card.key}
                href={card.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-colors hover:border-brand-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900">
                    {stats?.counts[card.key] ?? 0}
                  </p>
                  <p className="text-sm text-slate-600">{card.label}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-soft">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h2 className="font-semibold text-slate-900">Recent enquiries</h2>
              <Link href="/admin/contacts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View all
              </Link>
            </div>
            {stats?.recentContacts.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-500">
                No contact enquiries yet.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {stats?.recentContacts.map((c) => (
                  <li key={c._id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {c.name}
                        {c.company ? ` — ${c.company}` : ''}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {c.email} · {formatDate(c.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[c.status] || statusStyle.new}`}
                    >
                      {statusLabel[c.status] || c.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
}