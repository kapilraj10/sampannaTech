import { siteConfig } from '@/config/site';

const TOKEN_KEY = 'st_admin_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

interface AdminApiResponse<T> {
  success: boolean;
  data?: T;
  token?: string;
  error?: string;
  message?: string;
  count?: number;
  user?: T;
  counts?: T;
  recentContacts?: T;
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function adminRequest<T = Record<string, unknown>>(
  path: string,
  options: RequestInit = {}
): Promise<AdminApiResponse<T>> {
  try {
    const res = await fetch(`${siteConfig.apiUrl}${path}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
      cache: 'no-store',
    });

    if (res.status === 401) {
      clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
      return { success: false, error: 'Session expired. Please log in again.' };
    }

    let data: AdminApiResponse<T>;
    try {
      data = (await res.json()) as AdminApiResponse<T>;
    } catch {
      data = { success: false, error: 'Invalid server response.' };
    }

    if (!res.ok) {
      return { success: false, error: data.error || 'Request failed.' };
    }

    return data;
  } catch {
    return { success: false, error: 'Unable to reach the server.' };
  }
}

export const adminApi = {
  login: (email: string, password: string) =>
    adminRequest<unknown>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    adminRequest('/auth/logout', { method: 'POST' }),
  getMe: () => adminRequest<{ id: string; name: string; email: string; role: string }>('/auth/me'),
  getStats: () => adminRequest<{ counts: Record<string, number>; recentContacts: unknown[] }>('/admin/stats'),
  getUsers: () => adminRequest<Array<Record<string, unknown>>>('/admin/users'),
  updateUser: (id: string, body: object) =>
    adminRequest(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  deleteUser: (id: string) =>
    adminRequest<Record<string, unknown>>(`/admin/users/${id}`, { method: 'DELETE' }),

  list: <T = Record<string, unknown>>(resource: string, params = '') =>
    adminRequest<T>(`/${resource}${params ? `?${params}` : ''}`, { method: 'GET' }),
  get: (resource: string, id: string) =>
    adminRequest<Record<string, unknown>>(`/${resource}/${id}`, { method: 'GET' }),
  create: (resource: string, body: Record<string, unknown>) =>
    adminRequest<Record<string, unknown>>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  update: (resource: string, id: string, body: Record<string, unknown>) =>
    adminRequest<Record<string, unknown>>(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  remove: (resource: string, id: string) =>
    adminRequest<Record<string, unknown>>(`/${resource}/${id}`, { method: 'DELETE' }),
  upload: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${siteConfig.apiUrl}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken() || ''}` },
      body: formData,
    });
    const data = (await res.json()) as { success: boolean; data?: { url: string }; error?: string };
    if (!res.ok || !data.success || !data.data) {
      throw new Error(data.error || 'Upload failed.');
    }
    return { url: data.data.url };
  },
  uploadMultiple: async (files: File[]): Promise<{ url: string }[]> => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    const res = await fetch(`${siteConfig.apiUrl}/upload/multiple`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken() || ''}` },
      body: formData,
    });
    const data = (await res.json()) as { success: boolean; data?: { url: string }[]; error?: string };
    if (!res.ok || !data.success || !data.data) {
      throw new Error(data.error || 'Upload failed.');
    }
    return data.data;
  },
};
