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
  SelectInput,
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { HomeSectionItem } from '@/types';

const sectionKeys = ['hero', 'cta', 'services', 'projects', 'about'];

interface FormState {
  sectionKey: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  buttonText2: string;
  buttonUrl2: string;
  image: string;
  active: boolean;
}

const emptyForm: FormState = {
  sectionKey: 'hero',
  title: '',
  subtitle: '',
  description: '',
  buttonText: '',
  buttonUrl: '',
  buttonText2: '',
  buttonUrl2: '',
  image: '',
  active: true,
};

function toForm(item: HomeSectionItem): FormState {
  return {
    sectionKey: item.sectionKey,
    title: item.title,
    subtitle: item.subtitle || '',
    description: item.description || '',
    buttonText: item.buttonText || '',
    buttonUrl: item.buttonUrl || '',
    buttonText2: item.buttonText2 || '',
    buttonUrl2: item.buttonUrl2 || '',
    image: item.image || '',
    active: item.active !== false,
  };
}

export default function AdminHomeSectionsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<HomeSectionItem>(
    'home-sections',
    '',
    'admin/content/home-sections'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HomeSectionItem | null>(null);
  const [deleting, setDeleting] = useState<HomeSectionItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: HomeSectionItem) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (editing) {
        await update(editing.sectionKey, payload);
        toast('Section updated.');
      } else {
        await create(payload);
        toast('Section created.');
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
      await remove(deleting.sectionKey);
      toast('Section deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Home Sections"
        description="Edit the hero, CTA and other key homepage section content."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add section
          </Button>
        }
      />

      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
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
            No home sections yet. Add the hero and CTA content.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Section</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Title</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">
                      {item.sectionKey.replace(/-/g, ' ').toUpperCase()}
                    </p>
                    <p className="text-xs text-slate-500">{item.sectionKey}</p>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.title}</td>
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
                        aria-label={`Edit ${item.sectionKey}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(item)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${item.sectionKey}`}
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
        title={editing ? 'Edit home section' : 'Add home section'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Section key">
            <SelectInput value={form.sectionKey} onChange={(v) => setForm({ ...form, sectionKey: v })} options={sectionKeys} />
          </Field>
          <Field label="Title">
            <TextInput value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          </Field>
          <Field label="Subtitle">
            <TextArea value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} rows={2} />
          </Field>
          <Field label="Description (optional)">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={2} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Button text">
              <TextInput value={form.buttonText} onChange={(v) => setForm({ ...form, buttonText: v })} />
            </Field>
            <Field label="Button URL">
              <TextInput value={form.buttonUrl} onChange={(v) => setForm({ ...form, buttonUrl: v })} placeholder="/contact" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Secondary button text">
              <TextInput value={form.buttonText2} onChange={(v) => setForm({ ...form, buttonText2: v })} />
            </Field>
            <Field label="Secondary button URL">
              <TextInput value={form.buttonUrl2} onChange={(v) => setForm({ ...form, buttonUrl2: v })} placeholder="/projects" />
            </Field>
          </div>
          <Field label="Image (optional)">
            <ImageInput value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          </Field>
          <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create section'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete home section"
        message={`Are you sure you want to delete the "${deleting?.sectionKey}" section? This cannot be undone.`}
      />
    </>
  );
}