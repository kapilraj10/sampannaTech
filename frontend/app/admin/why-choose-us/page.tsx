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
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { WhyChooseUsItem } from '@/types';

interface FormState {
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
  active: boolean;
}

const emptyForm: FormState = {
  title: '',
  description: '',
  icon: 'BadgeCheck',
  sortOrder: 0,
  active: true,
};

function toForm(item: WhyChooseUsItem): FormState {
  return {
    title: item.title,
    description: item.description,
    icon: item.icon || 'BadgeCheck',
    sortOrder: item.sortOrder || 0,
    active: item.active !== false,
  };
}

export default function AdminWhyChooseUsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<WhyChooseUsItem>(
    'why-choose-us',
    '',
    'admin/content/why-choose-us'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WhyChooseUsItem | null>(null);
  const [deleting, setDeleting] = useState<WhyChooseUsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: WhyChooseUsItem) => {
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
        toast('Item updated.');
      } else {
        await create(form);
        toast('Item created.');
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
      toast('Item deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Why Choose Us"
        description="Manage the reasons customers choose Sampanna Tech."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add reason
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
            No reasons yet. Add why customers choose you.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Reason</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Order</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.sortOrder}</td>
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
        title={editing ? 'Edit reason' : 'Add reason'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <TextInput value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          </Field>
          <Field label="Description">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Icon name">
              <TextInput value={form.icon} onChange={(v) => setForm({ ...form, icon: v })} placeholder="e.g. Zap, Users, Eye" />
            </Field>
            <Field label="Sort order">
              <NumberInput value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
            </Field>
          </div>
          <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create reason'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete reason"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
      />
    </>
  );
}