'use client';

import { useState, type FormEvent } from 'react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import {
  Field,
  ImageInput,
  NumberInput,
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { Testimonial } from '@/types';

interface FormState {
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  image: string;
  published: boolean;
}

const emptyForm: FormState = {
  name: '',
  company: '',
  role: '',
  message: '',
  rating: 5,
  image: '',
  published: true,
};

function toForm(item: Testimonial): FormState {
  return {
    name: item.name,
    company: item.company || '',
    role: item.role || '',
    message: item.message,
    rating: item.rating || 5,
    image: item.image || '',
    published: item.published !== false,
  };
}

export default function AdminTestimonialsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<Testimonial>(
    'testimonials',
    '',
    'admin/content/testimonials'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
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
        toast('Testimonial updated.');
      } else {
        await create(form);
        toast('Testimonial created.');
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
      toast('Testimonial deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Manage customer testimonials shown on the website."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add testimonial
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
            No testimonials yet. Add real customer feedback as it comes in.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Company</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Rating</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    {item.role && <p className="text-xs text-slate-500">{item.role}</p>}
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.company || '—'}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span className="inline-flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      {item.rating}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.published !== false
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.published !== false ? 'Published' : 'Hidden'}
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
        title={editing ? 'Edit testimonial' : 'Add testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            </Field>
            <Field label="Company">
              <TextInput value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Role">
              <TextInput value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
            </Field>
            <Field label="Rating (1–5)">
              <NumberInput value={form.rating} onChange={(v) => setForm({ ...form, rating: Math.max(1, Math.min(5, v)) })} />
            </Field>
          </div>
          <Field label="Message">
            <TextArea value={form.message} onChange={(v) => setForm({ ...form, message: v })} rows={4} required />
          </Field>
          <Field label="Photo URL">
            <ImageInput value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          </Field>
          <Toggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} label="Published" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create testimonial'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}