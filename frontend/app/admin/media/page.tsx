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
  NumberInput,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { MediaItem } from '@/types';

interface FormState {
  name: string;
  url: string;
  alt: string;
  title: string;
  category: string;
  featured: boolean;
  sortOrder: number;
}

const emptyForm: FormState = {
  name: '',
  url: '',
  alt: '',
  title: '',
  category: '',
  featured: false,
  sortOrder: 0,
};

function toForm(item: MediaItem): FormState {
  return {
    name: item.name,
    url: item.url,
    alt: item.alt || '',
    title: item.title || '',
    category: item.category || '',
    featured: !!item.featured,
    sortOrder: item.sortOrder || 0,
  };
}

export default function AdminMediaPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<MediaItem>(
    'media',
    '',
    'admin/content/media'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState<MediaItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: MediaItem) => {
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
        toast('Media item updated.');
      } else {
        await create(form);
        toast('Media item created.');
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
      toast('Media item deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Manage image and asset URLs used across the site."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add media
          </Button>
        }
      />

      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
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
          <p className="text-sm text-slate-500">No media items yet.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
            >
              <div className="flex h-36 items-center justify-center bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt || item.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{item.name}</p>
                    {item.category && (
                      <p className="text-xs text-slate-500">{item.category}</p>
                    )}
                  </div>
                  {item.featured && (
                    <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700">
                      Featured
                    </span>
                  )}
                </div>
                <div className="mt-3 flex gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit media item' : 'Add media item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="File URL">
            <ImageInput value={form.url} onChange={(v) => setForm({ ...form, url: v })} />
          </Field>
          <Field label="Name" hint="Internal label for this asset.">
            <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Alt text">
              <TextInput value={form.alt} onChange={(v) => setForm({ ...form, alt: v })} />
            </Field>
            <Field label="Title">
              <TextInput value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <TextInput value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
            </Field>
            <Field label="Sort order">
              <NumberInput value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
            </Field>
          </div>
          <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Add media'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete media item"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}