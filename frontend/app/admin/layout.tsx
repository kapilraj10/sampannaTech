import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/components/admin/AuthProvider';
import { ToastProvider } from '@/components/admin/Toast';
import AuthGuard from '@/components/admin/AuthGuard';

export const metadata: Metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-route">
      <AuthProvider>
        <ToastProvider>
          <AuthGuard>{children}</AuthGuard>
        </ToastProvider>
      </AuthProvider>
    </div>
  );
}
