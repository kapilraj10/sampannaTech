'use client';

import { useState, type FormEvent } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import {
  Field,
  ImageInput,
  TagInput,
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { ProductItem } from '@/types';

interface FormState {
  name: string;
  tagline: string;
  slug: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  gallery: string[];
  image: string;
  websiteUrl: string;
  demoUrl: string;
  featured: boolean;
  active: boolean;
}

const emptyForm: FormState = {
  name: '',
  tagline: '',
  slug: '',
  description: '',
  longDescription: '',
  features: [],
  benefits: [],
  technologies: [],
  gallery: [],
  image: '',
  websiteUrl: '',
  demoUrl: '',
  featured: false,
  active: true,
};

function toForm(item: ProductItem): FormState {
  return {
    name: item.name,
    tagline: item.tagline || '',
    slug: item.slug,
    description: item.description,
    longDescription: item.longDescription || '',
    features: item.features || [],
    benefits: item.benefits || [],
    technologies: item.technologies || [],
    gallery: item.gallery || [],
    image: item.image || '',
    websiteUrl: item.websiteUrl || '',
    demoUrl: item.demoUrl || '',
    featured: !!item.featured,
    active: item.active !== false,
  };
}

export default function AdminProductsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<ProductItem>(
    'products',
    '',
    'admin/content/products'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductItem | null>(null);
  const [deleting, setDeleting] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: ProductItem) => {
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
        toast('Product updated.');
      } else {
        await create(form);
        toast('Product created.');
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
      toast('Product deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Products"
        description="Manage the software products offered by the company."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add product
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
          <p className="text-sm text-slate-500">No products yet. Add your first product.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Tagline</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.name}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.tagline || '—'}</td>
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
        title={editing ? 'Edit product' : 'Add product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name">
            <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tagline">
              <TextInput value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
            </Field>
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <TextInput value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />
            </Field>
          </div>
          <Field label="Short description">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          </Field>
          <Field label="Long description">
            <TextArea value={form.longDescription} onChange={(v) => setForm({ ...form, longDescription: v })} rows={5} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website URL">
              <TextInput value={form.websiteUrl} onChange={(v) => setForm({ ...form, websiteUrl: v })} placeholder="https://..." />
            </Field>
            <Field label="Demo URL">
              <TextInput value={form.demoUrl} onChange={(v) => setForm({ ...form, demoUrl: v })} placeholder="https://..." />
            </Field>
          </div>
          <Field label="Features" hint="Press Enter to add.">
            <TagInput values={form.features} onChange={(v) => setForm({ ...form, features: v })} />
          </Field>
          <Field label="Benefits" hint="Press Enter to add.">
            <TagInput values={form.benefits} onChange={(v) => setForm({ ...form, benefits: v })} />
          </Field>
          <Field label="Technologies" hint="Press Enter to add.">
            <TagInput values={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          </Field>
          <Field label="Gallery URLs" hint="Press Enter to add.">
            <TagInput values={form.gallery} onChange={(v) => setForm({ ...form, gallery: v })} />
          </Field>
          <Field label="Image">
            <ImageInput value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          </Field>
          <div className="flex gap-6">
            <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
            <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create product'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete product"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}