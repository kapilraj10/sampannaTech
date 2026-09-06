import Link from 'next/link';
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import Logo from '@/components/layout/Logo';
import Container from '@/components/ui/Container';
import NewsletterForm from '@/components/layout/NewsletterForm';
import { siteConfig } from '@/config/site';

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Careers', href: '/careers' },
];

const solutionLinks = [
  { name: 'Website Development', href: '/services#web-development' },
  { name: 'Mobile Apps', href: '/services#mobile-development' },
  { name: 'Custom Software', href: '/services#custom-software' },
  { name: 'POS Solutions', href: '/services#pos-solutions' },
];

const resourceLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { name: 'Facebook', href: siteConfig.social.facebook, icon: Facebook },
  { name: 'Instagram', href: siteConfig.social.instagram, icon: Instagram },
  { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: Linkedin },
  { name: 'GitHub', href: siteConfig.social.github, icon: Github },
];

const footerColumns = [
  { title: 'Company', links: companyLinks },
  { title: 'Solutions', links: solutionLinks },
  { title: 'Resources', links: resourceLinks },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {siteConfig.tagline}
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
              <a
                href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
                className={`flex items-center gap-2 text-sm text-slate-600 ${siteConfig.email ? 'hover:text-brand-600' : ''}`}
              >
                <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="break-all">
                  {siteConfig.email || 'hello@sampannatech.com (set via env)'}
                </span>
              </a>
              <p className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-200 hover:text-brand-600"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
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
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.{' '}
            {siteConfig.location}.
          </p>
        </div>
      </Container>
    </footer>
  );
}