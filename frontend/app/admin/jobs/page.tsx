'use client';

import { useState, type FormEvent } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import {
  Field,
  SelectInput,
  TagInput,
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { Job } from '@/types';

interface FormState {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  deadline: string;
  active: boolean;
}

const emptyForm: FormState = {
  title: '',
  department: '',
  location: 'Kathmandu, Nepal',
  employmentType: 'Full-time',
  description: '',
  requirements: [],
  responsibilities: [],
  salaryRange: '',
  deadline: '',
  active: true,
};

function toForm(item: Job): FormState {
  return {
    title: item.title,
    department: item.department,
    location: item.location,
    employmentType: item.employmentType,
    description: item.description,
    requirements: item.requirements || [],
    responsibilities: item.responsibilities || [],
    salaryRange: item.salaryRange || '',
    deadline: item.deadline ? item.deadline.slice(0, 10) : '',
    active: item.active !== false,
  };
}

const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

export default function AdminJobsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<Job>(
    'jobs',
    '',
    'admin/content/jobs'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState<Job | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Job) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        ...form,
        deadline: form.deadline ? new Date(form.deadline).toISOString() : undefined,
      };
      if (editing) {
        await update(editing._id, payload);
        toast('Job updated.');
      } else {
        await create(payload);
        toast('Job created.');
      }
      setModalOpen(false);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await remove(deleting._id);
      toast('Job deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Jobs"
        description="Manage open positions shown on the careers page."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add job
          </Button>
        }
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
          <p className="text-sm text-slate-500">No open positions yet.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Position</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Department</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Type</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.location}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.department}</td>
                  <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">{item.employmentType}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.active !== false
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.active !== false ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Edit ${item.title}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${item.title}`}
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
        title={editing ? 'Edit job' : 'Add job'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <TextInput value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Department">
              <TextInput value={form.department} onChange={(v) => setForm({ ...form, department: v })} required />
            </Field>
            <Field label="Employment type">
              <SelectInput
                value={form.employmentType}
                onChange={(v) => setForm({ ...form, employmentType: v })}
                options={employmentTypes}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location">
              <TextInput value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
            </Field>
            <Field label="Salary range">
              <TextInput value={form.salaryRange} onChange={(v) => setForm({ ...form, salaryRange: v })} placeholder="e.g. NPR 60,000 – 90,000" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Application deadline">
              <TextInput value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} placeholder="YYYY-MM-DD" />
            </Field>
          </div>
          <Field label="Description">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={4} />
          </Field>
          <Field label="Responsibilities" hint="Press Enter to add.">
            <TagInput values={form.responsibilities} onChange={(v) => setForm({ ...form, responsibilities: v })} />
          </Field>
          <Field label="Requirements" hint="Press Enter to add.">
            <TagInput values={form.requirements} onChange={(v) => setForm({ ...form, requirements: v })} />
          </Field>
          <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Open position" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create job'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete job"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
      />
    </>
  );
}