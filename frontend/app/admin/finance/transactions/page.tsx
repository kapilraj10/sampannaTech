'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import { AmountInput, DateInput, Field, SelectInput, TextInput } from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import {
  expenseCategories,
  formatDay,
  formatMoney,
  incomeCategories,
  paymentMethods,
  toDateInput,
} from '@/lib/finance';
import type { FinanceProject, FinanceTransaction } from '@/types';

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100';

interface FormState {
  type: 'income' | 'expense';
  project: string;
  amount: string;
  date: string;
  category: string;
  paymentMethod: string;
  description: string;
}

const today = () => new Date().toISOString().slice(0, 10);

function TransactionsInner() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectFilter = searchParams.get('project') || '';
  const typeFilter = searchParams.get('type') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const [projects, setProjects] = useState<FinanceProject[]>([]);
  const [items, setItems] = useState<FinanceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FinanceTransaction | null>(null);
  const [deleting, setDeleting] = useState<FinanceTransaction | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({
    type: 'income',
    project: '',
    amount: '',
    date: today(),
    category: '',
    paymentMethod: '',
    description: '',
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.replace(`/admin/finance/transactions${params.toString() ? `?${params}` : ''}`);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (projectFilter) params.set('project', projectFilter);
    if (typeFilter) params.set('type', typeFilter);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const [txRes, projRes] = await Promise.all([
      adminApi.list<FinanceTransaction[]>('finance/transactions', params.toString()),
      adminApi.list<FinanceProject[]>('finance/projects'),
    ]);
    if (txRes.success && Array.isArray(txRes.data)) setItems(txRes.data);
    else setError(txRes.error || 'Failed to load entries.');
    if (projRes.success && Array.isArray(projRes.data)) setProjects(projRes.data);
    setLoading(false);
  }, [projectFilter, typeFilter, from, to]);

  useEffect(() => {
    load();
  }, [load]);

  const totals = useMemo(() => {
    const income = items.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = items.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, profit: income - expense };
  }, [items]);

  const currentProject = projects.find((p) => p._id === projectFilter);

  const openCreate = (type: 'income' | 'expense') => {
    setEditing(null);
    setForm({
      type,
      project: projectFilter && projectFilter !== 'none' ? projectFilter : '',
      amount: '',
      date: today(),
      category: '',
      paymentMethod: '',
      description: '',
    });
    setModalOpen(true);
  };

  const openEdit = (t: FinanceTransaction) => {
    setEditing(t);
    setForm({
      type: t.type,
      project: t.project?._id || '',
      amount: String(t.amount),
      date: toDateInput(t.date),
      category: t.category || '',
      paymentMethod: t.paymentMethod || '',
      description: t.description || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast('Enter an amount greater than 0.', 'error');
      return;
    }
    setSaving(true);
    const payload = { ...form, amount, project: form.project || null };
    const res = editing
      ? await adminApi.update('finance/transactions', editing._id, payload)
      : await adminApi.create('finance/transactions', payload);
    setSaving(false);
    if (res.success) {
      toast(editing ? 'Entry updated.' : `${form.type === 'income' ? 'Income' : 'Expense'} added.`);
      setModalOpen(false);
      load();
    } else {
      toast(res.error || 'Unable to save.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    const res = await adminApi.remove('finance/transactions', deleting._id);
    if (res.success) {
      toast('Entry deleted.');
      setItems((prev) => prev.filter((t) => t._id !== deleting._id));
    } else {
      toast(res.error || 'Unable to delete.', 'error');
    }
    setDeleting(null);
  };

  const categories = form.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <>
      <Link
        href="/admin/finance"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Finance overview
      </Link>
      <AdminPageHeader
        title={currentProject ? `${currentProject.name}: income & expenses` : 'Income & expenses'}
        description={
          currentProject
            ? `${currentProject.client || 'No client'} · budget ${formatMoney(currentProject.budget)} · deadline ${formatDay(currentProject.deadline)}`
            : 'Every payment received and every cost, project-wise.'
        }
        action={
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => openCreate('income')}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add income
            </Button>
            <Button variant="outline" onClick={() => openCreate('expense')}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add expense
            </Button>
          </div>
        }
      />

      <div className="mb-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-xs font-medium text-slate-600">
          Project
          <select className={`${selectClass} mt-1`} value={projectFilter} onChange={(e) => setFilter('project', e.target.value)}>
            <option value="">All projects</option>
            <option value="none">Not linked to a project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-medium text-slate-600">
          Type
          <select className={`${selectClass} mt-1`} value={typeFilter} onChange={(e) => setFilter('type', e.target.value)}>
            <option value="">Income and expenses</option>
            <option value="income">Income only</option>
            <option value="expense">Expenses only</option>
          </select>
        </label>
        <label className="block text-xs font-medium text-slate-600">
          From
          <input type="date" className={`${selectClass} mt-1`} value={from} onChange={(e) => setFilter('from', e.target.value)} />
        </label>
        <label className="block text-xs font-medium text-slate-600">
          To
          <input type="date" className={`${selectClass} mt-1`} value={to} onChange={(e) => setFilter('to', e.target.value)} />
        </label>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Income</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">{formatMoney(totals.income)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expenses</p>
          <p className="mt-1 text-xl font-bold text-red-700">{formatMoney(totals.expense)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Profit</p>
          <p className={`mt-1 text-xl font-bold ${totals.profit >= 0 ? 'text-slate-900' : 'text-red-700'}`}>
            {formatMoney(totals.profit)}
          </p>
        </div>
      </div>

      {loading && <div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />}

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
          <p className="text-sm text-slate-500">No entries match these filters.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="px-5 py-3 font-semibold">Details</th>
                <th className="px-5 py-3 text-right font-semibold">Amount</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((t) => (
                <tr key={t._id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-3 text-slate-700">{formatDay(t.date)}</td>
                  <td className="px-5 py-3 text-slate-700">{t.project?.name || <span className="text-slate-400">—</span>}</td>
                  <td className="px-5 py-3">
                    <p className="text-slate-900">{t.category || (t.type === 'income' ? 'Income' : 'Expense')}</p>
                    <p className="text-xs text-slate-500">
                      {[t.description, t.paymentMethod].filter(Boolean).join(' · ')}
                    </p>
                  </td>
                  <td
                    className={`whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums ${
                      t.type === 'income' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {t.type === 'income' ? '+' : '−'} {formatMoney(t.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Edit entry"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(t)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete entry"
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editing ? 'Edit' : 'Add'} ${form.type === 'income' ? 'income' : 'expense'}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <select
                className={selectClass}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as FormState['type'], category: '' })}
              >
                <option value="income">Income (money received)</option>
                <option value="expense">Expense (money spent)</option>
              </select>
            </Field>
            <Field label="Project">
              <select className={selectClass} value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}>
                <option value="">No project (general)</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Amount (Rs.)">
              <AmountInput value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} required />
            </Field>
            <Field label="Date">
              <DateInput value={form.date} onChange={(v) => setForm({ ...form, date: v })} required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <SelectInput
                value={form.category}
                onChange={(v) => setForm({ ...form, category: v })}
                options={form.category && !categories.includes(form.category) ? [form.category, ...categories] : categories}
                placeholder="Choose…"
              />
            </Field>
            <Field label="Payment method">
              <SelectInput
                value={form.paymentMethod}
                onChange={(v) => setForm({ ...form, paymentMethod: v })}
                options={paymentMethods}
                placeholder="Choose…"
              />
            </Field>
          </div>
          <Field label="Description">
            <TextInput
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              placeholder={form.type === 'income' ? 'e.g. 2nd milestone from client' : 'e.g. VPS hosting for 1 year'}
            />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Add entry'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete entry"
        message={`Delete this ${deleting?.type} of ${formatMoney(deleting?.amount || 0)}? This cannot be undone.`}
      />
    </>
  );
}

export default function AdminTransactionsPage() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />}>
      <TransactionsInner />
    </Suspense>
  );
}
