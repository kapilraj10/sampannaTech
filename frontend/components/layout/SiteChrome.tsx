'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import type { ContactInfo } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SiteChromeProps {
  children: ReactNode;
  footerSettings: ContactInfo;
}

export default function SiteChrome({ children, footerSettings }: SiteChromeProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer settings={footerSettings} />
    </>
  );
}
