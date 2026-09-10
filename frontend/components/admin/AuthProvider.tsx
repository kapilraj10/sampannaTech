'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, clearToken, getToken, setToken } from '@/lib/admin';
import type { AdminUser, UserRole } from '@/types';

interface AuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => null,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    adminApi
      .getMe()
      .then((res) => {
        if (res.success && res.user) {
          const u = res.user as { id: string; name: string; email: string; role: UserRole };
          setUser({ id: u.id, name: u.name, email: u.email, role: u.role });
        } else {
          clearToken();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<string | null> => {
    const res = await adminApi.login(email, password);
    if (res.success && res.token && res.user) {
      const user = res.user as { id: string; name: string; email: string; role: UserRole };
      setToken(res.token);
      setUser({ id: user.id, name: user.name, email: user.email, role: user.role });
      return null;
    }
    return res.error || 'Login failed.';
  };

  const logout = async (): Promise<void> => {
    await adminApi.logout();
    clearToken();
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
