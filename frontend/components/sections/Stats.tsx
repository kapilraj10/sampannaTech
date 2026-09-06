import { Building2, Headphones, Rocket, Users } from 'lucide-react';
import Container from '@/components/ui/Container';
import type { ContactInfo } from '@/types';

interface StatsProps {
  siteInfo: ContactInfo;
}

const icons = [Rocket, Users, Building2, Headphones];

export default function Stats({ siteInfo }: StatsProps) {
  const stats = siteInfo.stats || {};

  const items = [
    { value: `${stats.projectsDelivered ?? 50}+`, label: 'Projects Delivered', icon: icons[0] },
    { value: `${stats.businessesServed ?? 20}+`, label: 'Businesses Served', icon: icons[1] },
    { value: `${stats.yearsExperience ?? 5}+`, label: 'Years of Experience', icon: icons[2] },
    { value: stats.support ?? '24/7', label: 'Support', icon: icons[3] },
  ];

  return (
    <section className="border-y border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center">
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-3xl font-bold tracking-tight text-slate-900">{item.value}</p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}