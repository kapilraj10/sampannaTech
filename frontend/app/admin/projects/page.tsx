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
  TagInput,
  TextArea,
  TextInput,
  Toggle,
} from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import useAdminCrud from '@/hooks/useAdminCrud';
import type { ProjectItem } from '@/types';

interface FormState {
  name: string;
  slug: string;
  client: string;
  industry: string;
  category: string;
  description: string;
  image: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  websiteUrl: string;
  githubUrl: string;
  challenges: string;
  solution: string;
  results: string;
  isDemo: boolean;
  isFeatured: boolean;
  sortOrder: number;
  active: boolean;
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  client: '',
  industry: '',
  category: 'Business Software',
  description: '',
  image: '',
  coverImage: '',
  gallery: [],
  technologies: [],
  websiteUrl: '',
  githubUrl: '',
  challenges: '',
  solution: '',
  results: '',
  isDemo: false,
  isFeatured: false,
  sortOrder: 0,
  active: true,
};

function toForm(item: ProjectItem): FormState {
  return {
    name: item.name,
    slug: item.slug,
    client: item.client || '',
    industry: item.industry || '',
    category: item.category,
    description: item.description,
    image: item.image || '',
    coverImage: item.coverImage || '',
    gallery: item.gallery || [],
    technologies: item.technologies || [],
    websiteUrl: item.websiteUrl || '',
    githubUrl: item.githubUrl || '',
    challenges: item.challenges || '',
    solution: item.solution || '',
    results: item.results || '',
    isDemo: !!item.isDemo,
    isFeatured: !!item.isFeatured,
    sortOrder: item.sortOrder || 0,
    active: item.active !== false,
  };
}

export default function AdminProjectsPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<ProjectItem>(
    'projects',
    '',
    'admin/content/projects'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectItem | null>(null);
  const [deleting, setDeleting] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: ProjectItem) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.slug && payload.name) {
        payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (editing) {
        await update(editing._id, payload);
        toast('Project updated.');
      } else {
        await create(payload);
        toast('Project created.');
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
      toast('Project deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio of projects and case studies."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add project
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
          <p className="text-sm text-slate-500">No projects yet. Add your first project.</p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Category</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    {item.client && <p className="text-xs text-slate-500">{item.client}</p>}
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.category}</td>
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
        title={editing ? 'Edit project' : 'Add project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            </Field>
            <Field label="Category">
              <TextInput value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client">
              <TextInput value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
            </Field>
            <Field label="Industry">
              <TextInput value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <TextInput value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />
            </Field>
            <Field label="Sort order">
              <NumberInput value={form.sortOrder} onChange={(v) => setForm({ ...form, sortOrder: v })} />
            </Field>
          </div>
          <Field label="Short description">
            <TextArea value={form.description} onChange={(v) => setForm({ ...form, description: v })} required />
          </Field>
          <Field label="Cover image">
            <ImageInput value={form.coverImage} onChange={(v) => setForm({ ...form, coverImage: v })} />
          </Field>
          <Field label="Thumbnail image (optional)">
            <TextInput value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
          </Field>
          <Field label="Gallery URLs" hint="Press Enter to add.">
            <TagInput values={form.gallery} onChange={(v) => setForm({ ...form, gallery: v })} />
          </Field>
          <Field label="Technologies" hint="Press Enter to add.">
            <TagInput values={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website URL">
              <TextInput value={form.websiteUrl} onChange={(v) => setForm({ ...form, websiteUrl: v })} placeholder="https://..." />
            </Field>
            <Field label="GitHub URL">
              <TextInput value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} placeholder="https://..." />
            </Field>
          </div>
          <Field label="Challenge">
            <TextArea value={form.challenges} onChange={(v) => setForm({ ...form, challenges: v })} rows={3} />
          </Field>
          <Field label="Solution">
            <TextArea value={form.solution} onChange={(v) => setForm({ ...form, solution: v })} rows={3} />
          </Field>
          <Field label="Results">
            <TextArea value={form.results} onChange={(v) => setForm({ ...form, results: v })} rows={3} />
          </Field>
          <div className="flex flex-wrap gap-6">
            <Toggle checked={form.isDemo} onChange={(v) => setForm({ ...form, isDemo: v })} label="Demo project" />
            <Toggle checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} label="Featured" />
            <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          </div>
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
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}