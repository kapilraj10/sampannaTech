import Link from 'next/link';
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import Logo from '@/components/layout/Logo';
import Container from '@/components/ui/Container';
import NewsletterForm from '@/components/layout/NewsletterForm';
import { siteConfig } from '@/config/site';
import type { SiteSettings } from '@/types';

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
];

const resourceLinks = [
  { name: 'Contact', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { name: 'Facebook', key: 'facebook' as const, icon: Facebook },
  { name: 'Instagram', key: 'instagram' as const, icon: Instagram },
  { name: 'LinkedIn', key: 'linkedin' as const, icon: Linkedin },
  { name: 'GitHub', key: 'github' as const, icon: Github },
  { name: 'YouTube', key: 'youtube' as const, icon: Youtube },
];

const footerColumns = [
  { title: 'Company', links: companyLinks },
  { title: 'Resources', links: resourceLinks },
];

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const s = settings || {};
  const companyName = s.companyName || siteConfig.name;
  const email = s.email || siteConfig.email;
  const phone = s.phone || siteConfig.phone;
  const address = s.address || '';
  const location = s.location || siteConfig.location;
  const tagline = s.tagline || siteConfig.tagline;
  const footerText = s.footerText || '';
  const copyrightText = s.copyrightText || '';
  const social =
    s.social && Object.values(s.social).some(Boolean) ? s.social : siteConfig.social;

  const shownSocialLinks = socialLinks.filter((item) => social[item.key]);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {footerText || tagline}
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">Stay updated</p>
              <p className="mt-1 text-sm text-slate-600">
                Subscribe for insights on technology and business.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-600"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="break-all">{email}</span>
                </a>
              ) : null}
              {phone ? (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-600"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="break-all">{phone}</span>
                </a>
              ) : null}
              {(address || location) ? (
                <p className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {[address, location].filter(Boolean).join(', ')}
                </p>
              ) : null}
            </div>
            {shownSocialLinks.length > 0 ? (
              <div className="mt-6 flex gap-3">
                {shownSocialLinks.map((socialLink) => (
                  <a
                    key={socialLink.name}
                    href={social[socialLink.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:text-brand-600"
                    aria-label={socialLink.name}
                  >
                    <socialLink.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="lg:col-span-1">
                <h3 className="text-sm font-semibold text-slate-900">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-brand-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-500">
            {copyrightText ||
              `© ${new Date().getFullYear()} ${companyName}. All rights reserved. ${location}`}
          </p>
        </div>
      </Container>
    </footer>
  );
}