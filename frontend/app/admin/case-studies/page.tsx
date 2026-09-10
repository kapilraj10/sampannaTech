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
import type { CaseStudyItem } from '@/types';

interface FormState {
  title: string;
  slug: string;
  clientName: string;
  clientLogo: string;
  coverImage: string;
  industry: string;
  problem: string;
  solution: string;
  results: string;
  technologies: string[];
  projectUrl: string;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  gallery: string[];
  featured: boolean;
  sortOrder: number;
  active: boolean;
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  clientName: '',
  clientLogo: '',
  coverImage: '',
  industry: '',
  problem: '',
  solution: '',
  results: '',
  technologies: [],
  projectUrl: '',
  testimonial: '',
  testimonialAuthor: '',
  testimonialRole: '',
  gallery: [],
  featured: false,
  sortOrder: 0,
  active: true,
};

function toForm(item: CaseStudyItem): FormState {
  return {
    title: item.title,
    slug: item.slug,
    clientName: item.clientName,
    clientLogo: item.clientLogo || '',
    coverImage: item.coverImage || '',
    industry: item.industry || '',
    problem: item.problem,
    solution: item.solution,
    results: item.results,
    technologies: item.technologies || [],
    projectUrl: item.projectUrl || '',
    testimonial: item.testimonial || '',
    testimonialAuthor: item.testimonialAuthor || '',
    testimonialRole: item.testimonialRole || '',
    gallery: item.gallery || [],
    featured: !!item.featured,
    sortOrder: item.sortOrder || 0,
    active: item.active !== false,
  };
}

const makeSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminCaseStudiesPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<CaseStudyItem>(
    'case-studies',
    '',
    'admin/content/case-studies'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CaseStudyItem | null>(null);
  const [deleting, setDeleting] = useState<CaseStudyItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: CaseStudyItem) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.slug && payload.title) {
        payload.slug = makeSlug(payload.title);
      }
      if (editing) {
        await update(editing._id, payload);
        toast('Case study updated.');
      } else {
        await create(payload);
        toast('Case study created.');
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
      toast('Case study deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Case Studies"
        description="Manage client case studies shown on the website."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add case study
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
            No case studies yet. Add the first one to showcase real business results.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Case Study</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Client</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Featured</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    {item.industry && <p className="text-xs text-slate-500">{item.industry}</p>}
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.clientName}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    {item.featured ? (
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
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
        title={editing ? 'Edit case study' : 'Add case study'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <TextInput value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client name">
              <TextInput value={form.clientName} onChange={(v) => setForm({ ...form, clientName: v })} required />
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
          <Field label="Problem">
            <TextArea value={form.problem} onChange={(v) => setForm({ ...form, problem: v })} rows={3} required />
          </Field>
          <Field label="Solution">
            <TextArea value={form.solution} onChange={(v) => setForm({ ...form, solution: v })} rows={3} required />
          </Field>
          <Field label="Results">
            <TextArea value={form.results} onChange={(v) => setForm({ ...form, results: v })} rows={3} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Cover image">
              <ImageInput value={form.coverImage} onChange={(v) => setForm({ ...form, coverImage: v })} />
            </Field>
            <Field label="Client logo">
              <ImageInput value={form.clientLogo} onChange={(v) => setForm({ ...form, clientLogo: v })} />
            </Field>
          </div>
          <Field label="Gallery URLs" hint="Press Enter to add.">
            <TagInput values={form.gallery} onChange={(v) => setForm({ ...form, gallery: v })} />
          </Field>
          <Field label="Technologies" hint="Press Enter to add.">
            <TagInput values={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} />
          </Field>
          <Field label="Project URL">
            <TextInput value={form.projectUrl} onChange={(v) => setForm({ ...form, projectUrl: v })} placeholder="https://..." />
          </Field>
          <Field label="Testimonial">
            <TextArea value={form.testimonial} onChange={(v) => setForm({ ...form, testimonial: v })} rows={2} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Testimonial author">
              <TextInput value={form.testimonialAuthor} onChange={(v) => setForm({ ...form, testimonialAuthor: v })} />
            </Field>
            <Field label="Testimonial role">
              <TextInput value={form.testimonialRole} onChange={(v) => setForm({ ...form, testimonialRole: v })} />
            </Field>
          </div>
          <div className="flex flex-wrap gap-6">
            <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
            <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Active" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create case study'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete case study"
        message={`Are you sure you want to delete "${deleting?.title}"? This cannot be undone.`}
      />
    </>
  );
}