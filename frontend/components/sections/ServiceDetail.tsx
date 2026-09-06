import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import DynamicIcon from '@/components/ui/DynamicIcon';
import { cn } from '@/lib/utils';

interface ServiceDetailProps {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const deliverables: Record<string, string[]> = {
  'website-development': [
    'Business, corporate and e-commerce websites',
    'Responsive design for every device',
    'SEO and performance optimization',
    'Content management so you can update easily',
  ],
  'mobile-app-development': [
    'Android and iOS applications',
    'Clean, intuitive user interfaces',
    'Reliable APIs and backend integration',
    'App Store and Play Store preparation',
  ],
  'custom-software-development': [
    'Systems designed around your workflow',
    'Integration with existing tools',
    'Scalable and maintainable architecture',
    'Dashboards and reporting built in',
  ],
  'pos-and-business-management-systems': [
    'Billing and invoice generation',
    'Inventory and stock management',
    'Sales reports and business insights',
    'Multi-branch support',
  ],
  'ui-ux-design': [
    'User experience research and flows',
    'Modern interface design',
    'Design systems and reusable components',
    'Usability testing',
  ],
  'it-consulting': [
    'Technology roadmap and architecture advice',
    'Tool selection and vendor guidance',
    'Digital strategy and cost planning',
    'Independent, practical recommendations',
  ],
  'digital-solutions': [
    'Online ordering and booking systems',
    'Customer management tools',
    'Automation of repetitive tasks',
    'Digital presence strategies',
  ],
  'maintenance-and-support': [
    'Ongoing updates and improvements',
    'Bug fixes and performance tuning',
    'Backup and security maintenance',
    'Priority technical support',
  ],
};

export default function ServiceDetail({
  id,
  icon,
  title,
  description,
}: ServiceDetailProps) {
  const features = deliverables[id] || [];

  return (
    <article
      id={id}
      className="group flex scroll-mt-24 flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <DynamicIcon name={icon} className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          Service
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 flex-1 leading-relaxed text-slate-600">{description}</p>

      {features.length > 0 && (
        <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className={cn('mt-0.5 h-4 w-4 shrink-0 text-emerald-500')} />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/contact?service=${encodeURIComponent(title)}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        Discuss This Service
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}