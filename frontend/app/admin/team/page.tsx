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
import type { TeamMember } from '@/types';

interface FormState {
  name: string;
  slug: string;
  position: string;
  bio: string;
  photo: string;
  skills: string[];
  linkedin: string;
  github: string;
  facebook: string;
  instagram: string;
  website: string;
  email: string;
  featured: boolean;
  order: number;
  published: boolean;
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  position: '',
  bio: '',
  photo: '',
  skills: [],
  linkedin: '',
  github: '',
  facebook: '',
  instagram: '',
  website: '',
  email: '',
  featured: false,
  order: 0,
  published: true,
};

function toForm(item: TeamMember): FormState {
  return {
    name: item.name,
    slug: item.slug,
    position: item.position,
    bio: item.bio || '',
    photo: item.photo || '',
    skills: item.skills || [],
    linkedin: item.social?.linkedin || '',
    github: item.social?.github || '',
    facebook: item.social?.facebook || '',
    instagram: item.social?.instagram || '',
    website: item.social?.website || '',
    email: item.social?.email || '',
    featured: !!item.featured,
    order: item.order || 0,
    published: item.published !== false,
  };
}

export default function AdminTeamPage() {
  const { items, loading, error, load, create, update, remove } = useAdminCrud<TeamMember>(
    'team',
    '',
    'admin/content/team'
  );
  const { toast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setForm(toForm(item));
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        position: form.position,
        bio: form.bio,
        photo: form.photo,
        skills: form.skills,
        social: {
          linkedin: form.linkedin,
          github: form.github,
          facebook: form.facebook,
          instagram: form.instagram,
          website: form.website,
          email: form.email,
        },
        featured: form.featured,
        order: form.order,
        published: form.published,
      };
      if (editing) {
        await update(editing._id, payload);
        toast('Team member updated.');
      } else {
        await create(payload);
        toast('Team member created.');
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
      toast('Team member deleted.');
      setDeleting(null);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Unable to delete.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Team"
        description="Manage team members shown on the public Team page."
        action={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add member
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
            No team members yet. Add real team members as the company grows.
          </p>
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Member</th>
                <th className="hidden px-5 py-3 font-semibold md:table-cell">Position</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {item.photo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                          {item.name[0]?.toUpperCase()}
                        </div>
                      )}
                      <p className="font-medium text-slate-900">{item.name}</p>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 md:table-cell">{item.position}</td>
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
        title={editing ? 'Edit team member' : 'Add team member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            </Field>
            <Field label="Position">
              <TextInput value={form.position} onChange={(v) => setForm({ ...form, position: v })} required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug" hint="Leave blank to auto-generate.">
              <TextInput value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="auto-generated" />
            </Field>
            <Field label="Order">
              <NumberInput value={form.order} onChange={(v) => setForm({ ...form, order: v })} />
            </Field>
          </div>
          <Field label="Bio">
            <TextArea value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} rows={3} />
          </Field>
          <Field label="Photo">
            <ImageInput value={form.photo} onChange={(v) => setForm({ ...form, photo: v })} />
          </Field>
          <Field label="Skills" hint="Press Enter to add.">
            <TagInput values={form.skills} onChange={(v) => setForm({ ...form, skills: v })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="LinkedIn">
              <TextInput value={form.linkedin} onChange={(v) => setForm({ ...form, linkedin: v })} placeholder="https://..." />
            </Field>
            <Field label="GitHub">
              <TextInput value={form.github} onChange={(v) => setForm({ ...form, github: v })} placeholder="https://..." />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Facebook">
              <TextInput value={form.facebook} onChange={(v) => setForm({ ...form, facebook: v })} placeholder="https://..." />
            </Field>
            <Field label="Instagram">
              <TextInput value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} placeholder="https://..." />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website">
              <TextInput value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="https://..." />
            </Field>
            <Field label="Email">
              <TextInput value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="name@..." />
            </Field>
          </div>
          <div className="flex flex-wrap gap-6">
            <Toggle checked={form.featured} onChange={(v) => setForm({ ...form, featured: v })} label="Featured" />
            <Toggle checked={form.published} onChange={(v) => setForm({ ...form, published: v })} label="Published" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save changes' : 'Create member'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete team member"
        message={`Are you sure you want to delete "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}