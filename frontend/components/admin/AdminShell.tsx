'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Briefcase,
  ChartNoAxesColumn,
  Cpu,
  FileText,
  FolderOpen,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Mail,
  Megaphone,
  MessageSquareQuote,
  Package,
  Settings,
  Shield,
  Star,
  Users,
  Wrench,
} from 'lucide-react';
import { useAuth } from '@/components/admin/AuthProvider';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Case Studies', href: '/admin/case-studies', icon: ChartNoAxesColumn },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Technologies', href: '/admin/technologies', icon: Cpu },
  { name: 'Process Steps', href: '/admin/process-steps', icon: ListChecks },
  { name: 'Why Choose Us', href: '/admin/why-choose-us', icon: Star },
  { name: 'Home Sections', href: '/admin/home-sections', icon: Home },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Team', href: '/admin/team', icon: Users },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Contacts', href: '/admin/contacts', icon: Mail },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Megaphone },
  { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  { name: 'Users', href: '/admin/users', icon: Shield, adminOnly: true },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="flex w-full flex-col border-b border-slate-200 bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/admin" className="text-lg font-bold tracking-tight text-slate-900">
            Sampanna <span className="text-brand-600">Admin</span>
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-brand-600"
          >
            View site →
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          {navItems
            .filter((item) => !item.adminOnly || user?.role === 'admin')
            .map((item) => {
              const active =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
        </nav>

        <div className="border-t border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-800">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.role}</p>
            </div>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">{children}</div>
      </main>
    </div>
  );
}