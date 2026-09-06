'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Pencil, Plus, Shield, Trash2, User as UserIcon } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Modal from '@/components/ui/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Button from '@/components/ui/Button';
import { Field, SelectInput, TextInput, Toggle } from '@/components/admin/inputs';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';
import { useAuth } from '@/components/admin/AuthProvider';
import type { UserRole } from '@/types';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
}

interface EditForm {
  name: string;
  role: UserRole;
  active: boolean;
  password: string;
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('editor');

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ name: '', role: 'editor', active: true, password: '' });

  const [deleting, setDeleting] = useState<UserRow | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const res = await adminApi.getUsers();
    if (res.success && Array.isArray(res.data)) {
      setUsers(res.data as unknown as UserRow[]);
    } else {
      setError(res.error || 'Failed to load users.');
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (u: UserRow) => {
    setEditing(u);
    setEditForm({ name: u.name, role: u.role, active: u.active, password: '' });
    setEditOpen(true);
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await adminApi.create('auth/users', {
      name: newName,
      email: newEmail,
      password: newPassword,
      role: newRole,
    });
    setSaving(false);
    if (res.success) {
      toast('User created.');
      setCreateOpen(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('editor');
      load();
    } else {
      toast(res.error || 'Failed to create user.', 'error');
    }
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const res = await adminApi.updateUser(editing.id, editForm);
    setSaving(false);
    if (res.success) {
      toast('User updated.');
      setEditOpen(false);
      load();
    } else {
      toast(res.error || 'Failed to update user.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    const res = await adminApi.deleteUser(deleting.id);
    setSaving(false);
    if (res.success) {
      toast('User deleted.');
      setDeleting(null);
      load();
    } else {
      toast(res.error || 'Failed to delete user.', 'error');
      setDeleting(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Users"
        description="Manage who can access the admin CMS. Only administrators can manage users."
        action={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" /> Add user
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

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Email</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Role</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                        {u.role === 'admin' ? <Shield className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
                      </span>
                      <p className="font-medium text-slate-900">
                        {u.name}
                        {currentUser?.id === u.id && <span className="ml-2 text-xs text-slate-400">(you)</span>}
                      </p>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 text-slate-500 sm:table-cell">{u.email}</td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                      {u.role}
                    </span>
                  </td>
                  <td className="hidden px-5 py-3.5 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(u)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Edit ${u.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleting(u)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${u.name}`}
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

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add user">
        <form onSubmit={handleCreate} className="space-y-4">
          <Field label="Name">
            <TextInput value={newName} onChange={setNewName} required />
          </Field>
          <Field label="Email">
            <TextInput value={newEmail} onChange={setNewEmail} required />
          </Field>
          <Field label="Password" hint="At least 8 characters.">
            <TextInput value={newPassword} onChange={setNewPassword} required />
          </Field>
          <Field label="Role">
            <SelectInput
              value={newRole}
              onChange={(v) => setNewRole(v as UserRole)}
              options={['editor', 'admin']}
            />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Create user'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit user">
        <form onSubmit={handleEdit} className="space-y-4">
          <Field label="Name">
            <TextInput value={editForm.name} onChange={(v) => setEditForm({ ...editForm, name: v })} required />
          </Field>
          <Field label="Role">
            <SelectInput
              value={editForm.role}
              onChange={(v) => setEditForm({ ...editForm, role: v as UserRole })}
              options={['editor', 'admin']}
            />
          </Field>
          <Field label="Password" hint="Leave blank to keep the current password.">
            <TextInput value={editForm.password} onChange={(v) => setEditForm({ ...editForm, password: v })} />
          </Field>
          <Toggle checked={editForm.active} onChange={(v) => setEditForm({ ...editForm, active: v })} label="Active" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setEditOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete user"
        message={`Delete the user "${deleting?.name}"? This cannot be undone.`}
      />
    </>
  );
}