'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { AlertTriangle, CalendarClock, ListPlus, Pencil, Plus, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import { AmountInput, DateInput, Field, SelectInput, TextArea, TextInput } from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import { deadlineLabel, formatDay, formatMoney, projectStatuses, toDateInput } from '@/lib/finance';
import type { FinanceProject, FinanceSummary } from '@/types';

interface FormState {
  name: string;
  client: string;
  status: string;
  startDate: string;
  deadline: string;
  budget: string;
  description: string;
  notes: string;
}

const emptyForm: FormState = {
  name: '',
  client: '',
  status: 'In Progress',
  startDate: new Date().toISOString().slice(0, 10),
  deadline: '',
  budget: '',
  description: '',
  notes: '',
};

function toForm(p: FinanceProject): FormState {
  return {
    name: p.name,
    client: p.client || '',
    status: p.status,
    startDate: toDateInput(p.startDate),
    deadline: toDateInput(p.deadline),
    budget: p.budget ? String(p.budget) : '',
    description: p.description || '',
    notes: p.notes || '',
  };
}

function StatTile({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold tracking-tight ${tone || 'text-slate-900'}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function AdminFinancePage() {
  const { toast } = useToast();
  const [summary, setSummary] = useState<FinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FinanceProject | null>(null);
  const [deleting, setDeleting] = useState<FinanceProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [statusFilter, setStatusFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.list<FinanceSummary>('finance/summary');
    if (res.success && res.data) setSummary(res.data as FinanceSummary);
    else setError(res.error || 'Failed to load finance data.');
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (p: FinanceProject) => {
    setEditing(p);
    setForm(toForm(p));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      budget: form.budget === '' ? 0 : Number(form.budget),
      startDate: form.startDate || null,
      deadline: form.deadline || null,
    };
    const res = editing
      ? await adminApi.update('finance/projects', editing._id, payload)
      : await adminApi.create('finance/projects', payload);
    setSaving(false);
    if (res.success) {
      toast(editing ? 'Project updated.' : 'Project created.');
      setModalOpen(false);
      load();
    } else {
      toast(res.error || 'Unable to save.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    const res = await adminApi.remove('finance/projects', deleting._id);
    if (res.success) {
      toast('Project and its entries deleted.');
      load();
    } else {
      toast(res.error || 'Unable to delete.', 'error');
    }
    setDeleting(null);
  };

  const projects = (summary?.projects || []).filter((p) => !statusFilter || p.status === statusFilter);
  const maxMonthly = Math.max(1, ...(summary?.monthly || []).flatMap((m) => [m.income, m.expense]));

  return (
    <>
      <AdminPageHeader
        title="Finance"
        description="Project-wise income, expenses, profit and deadlines."
        action={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/finance/transactions"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ListPlus className="h-4 w-4" aria-hidden="true" /> Income & expenses
            </Link>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" aria-hidden="true" /> Add project
            </Button>
          </div>
        }
      />

      {loading && !summary && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white" />
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

      {summary && (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total income" value={formatMoney(summary.totals.income)} tone="text-emerald-700" />
            <StatTile label="Total expenses" value={formatMoney(summary.totals.expense)} tone="text-red-700" />
            <StatTile
              label="Net profit"
              value={formatMoney(summary.totals.profit)}
              tone={summary.totals.profit >= 0 ? 'text-slate-900' : 'text-red-700'}
            />
            <StatTile
              label="Still to collect"
              value={formatMoney(summary.totals.outstanding)}
              hint={`Open projects, budget minus received · ${summary.counts.active} active`}
            />
          </div>

          {(summary.overdue.length > 0 || summary.upcoming.length > 0) && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-soft">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-red-700">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" /> Overdue ({summary.overdue.length})
                </h2>
                <ul className="mt-3 divide-y divide-slate-100 text-sm">
                  {summary.overdue.length === 0 && <li className="py-2 text-slate-500">Nothing overdue.</li>}
                  {summary.overdue.map((p) => (
                    <li key={p._id} className="flex items-center justify-between gap-3 py-2">
                      <span className="truncate font-medium text-slate-900">{p.name}</span>
                      <span className="shrink-0 text-xs text-red-700">
                        {formatDay(p.deadline)} · {Math.abs(p.daysLeft || 0)}d late
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-soft">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                  <CalendarClock className="h-4 w-4" aria-hidden="true" /> Due in 30 days ({summary.upcoming.length})
                </h2>
                <ul className="mt-3 divide-y divide-slate-100 text-sm">
                  {summary.upcoming.length === 0 && <li className="py-2 text-slate-500">No deadlines in the next 30 days.</li>}
                  {summary.upcoming.map((p) => (
                    <li key={p._id} className="flex items-center justify-between gap-3 py-2">
                      <span className="truncate font-medium text-slate-900">{p.name}</span>
                      <span className="shrink-0 text-xs text-amber-700">
                        {formatDay(p.deadline)} · {p.daysLeft === 0 ? 'today' : `${p.daysLeft}d left`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-slate-900">Projects ({projects.length})</h2>
              <div className="w-48">
                <SelectInput
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={projectStatuses}
                  placeholder="All statuses"
                />
              </div>
            </div>
            {projects.length === 0 ? (
              <p className="p-10 text-center text-sm text-slate-500">
                No projects yet. Add a project, then record its income and expenses.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] text-sm">
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Project</th>
                      <th className="px-5 py-3 font-semibold">Deadline</th>
                      <th className="px-5 py-3 text-right font-semibold">Budget</th>
                      <th className="px-5 py-3 text-right font-semibold">Received</th>
                      <th className="px-5 py-3 text-right font-semibold">Expenses</th>
                      <th className="px-5 py-3 text-right font-semibold">Profit</th>
                      <th className="px-5 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((p) => {
                      const dl = deadlineLabel(p.daysLeft, p.status);
                      const pct = p.budget > 0 ? Math.min(100, Math.round((p.income / p.budget) * 100)) : null;
                      return (
                        <tr key={p._id} className="align-top hover:bg-slate-50">
                          <td className="px-5 py-3.5">
                            <Link
                              href={`/admin/finance/transactions?project=${p._id}`}
                              className="font-medium text-slate-900 hover:text-brand-700"
                            >
                              {p.name}
                            </Link>
                            <p className="text-xs text-slate-500">
                              {p.client || 'No client'} · {p.status}
                            </p>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-slate-700">{formatDay(p.deadline)}</p>
                            <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${dl.tone}`}>
                              {dl.text}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right tabular-nums text-slate-700">{formatMoney(p.budget)}</td>
                          <td className="px-5 py-3.5 text-right tabular-nums text-emerald-700">
                            {formatMoney(p.income)}
                            {pct !== null && <p className="text-xs text-slate-500">{pct}% of budget</p>}
                          </td>
                          <td className="px-5 py-3.5 text-right tabular-nums text-red-700">{formatMoney(p.expense)}</td>
                          <td
                            className={`px-5 py-3.5 text-right font-semibold tabular-nums ${
                              p.profit >= 0 ? 'text-slate-900' : 'text-red-700'
                            }`}
                          >
                            {formatMoney(p.profit)}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => openEdit(p)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                aria-label={`Edit ${p.name}`}
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleting(p)}
                                className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                                aria-label={`Delete ${p.name}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-soft">
            <h2 className="border-b border-slate-100 px-5 py-4 text-sm font-semibold text-slate-900">
              Last 12 months
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Month</th>
                    <th className="px-5 py-3 font-semibold">Income / expense</th>
                    <th className="px-5 py-3 text-right font-semibold">Income</th>
                    <th className="px-5 py-3 text-right font-semibold">Expenses</th>
                    <th className="px-5 py-3 text-right font-semibold">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...summary.monthly].reverse().map((m) => (
                    <tr key={m.month}>
                      <td className="px-5 py-2.5 text-slate-700">
                        {new Date(`${m.month}-01T00:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </td>
                      <td className="w-1/3 px-5 py-2.5">
                        <div className="space-y-1">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${(m.income / maxMonthly) * 100}%` }} />
                          <div className="h-2 rounded-full bg-red-400" style={{ width: `${(m.expense / maxMonthly) * 100}%` }} />
                        </div>
                      </td>
                      <td className="px-5 py-2.5 text-right tabular-nums text-emerald-700">{formatMoney(m.income)}</td>
                      <td className="px-5 py-2.5 text-right tabular-nums text-red-700">{formatMoney(m.expense)}</td>
                      <td
                        className={`px-5 py-2.5 text-right font-medium tabular-nums ${
                          m.profit >= 0 ? 'text-slate-900' : 'text-red-700'
                        }`}
                      >
                        {formatMoney(m.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(summary.totals.generalIncome > 0 || summary.totals.generalExpense > 0) && (
              <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
                Includes entries not linked to any project: {formatMoney(summary.totals.generalIncome)} income,{' '}
                {formatMoney(summary.totals.generalExpense)} expenses.
              </p>
            )}
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit project' : 'Add project'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Project name">
            <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client">
              <TextInput value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
            </Field>
            <Field label="Status">
              <SelectInput value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={projectStatuses} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Start date">
              <DateInput value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} />
            </Field>
            <Field label="Deadline">
              <DateInput value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} />
            </Field>
            <Field label="Budget / contract (Rs.)">
              <AmountInput value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
            </Field>
          </div>
          <Field label="Description">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
          </Field>
          <Field label="Notes">
            <TextArea value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} rows={2} />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete project"
        message={`Delete "${deleting?.name}" and all ${deleting?.transactionCount ?? 0} of its income/expense entries? This cannot be undone.`}
      />
    </>
  );
}
