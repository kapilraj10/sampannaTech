'use client';

import { useState, type FormEvent } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import {
  Field,
  NumberInput,
  SelectInput,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { TechnologyItem } from '@/types';

const categories = ['Frontend', 'Backend', 'Database', 'Cloud & DevOps', 'AI', 'Other'];

interface FormState {
  name: string;
  category: string;
  icon: string;
  color: string;
  sortOrder: number;
  active: boolean;
}

const emptyForm: FormState = {
  name: '',
  category: 'Frontend',
  icon: '',
  color: '',
  sortOrder: 0,
  active: true,
};

function toForm(item: TechnologyItem): FormState {
  return {
    name: item.name,
    category: item.category,
    icon: item.icon || '',
    color: item.color || '',
    sortOrder: item.sortOrder || 0,
    active: item.active !== false,
  };
}

export default function AdminTechnologiesPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<TechnologyItem>(
    'technologies',
    '',
    'admin/content/technologies'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TechnologyItem | null>(null);
  const [deleting, setDeleting] = useState<TechnologyItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: TechnologyItem) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await update(editing._id, form);
        toast('Technology updated.');
      } else {
        await create(form);
        toast('Technology created.');
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
      toast('Technology deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Technologies"
        description="Manage the technology stack shown in the Technologies section."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add technology
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
          <p className="text-sm text-slate-500">
            No technologies yet. Add the tech stack your team works with.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Technology</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Order</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    {item.color && <p className="text-xs text-slate-500">{item.color}</p>}
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.category}</td>
                  <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">{item.sortOrder}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.active !== false
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${item.name}`}
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
        title={editing ? 'Edit technology' : 'Add technology'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name">
            <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <SelectInput value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={categories} />
            </Field>
            <Field label="Sort order">
              <NumberInput value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Icon name (optional)">
              <TextInput value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} placeholder="e.g. Zap" />
            </Field>
            <Field label="Color (optional)">
              <TextInput value={form.color} onChange={(v) => setForm({ ...form, color: v })} placeholder="e.g. hover:#6366f1" />
            </Field>
          </div>
          <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create technology'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete technology"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}