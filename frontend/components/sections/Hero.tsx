import { ArrowRight, ArrowUpRight, BarChart3, CheckCircle2, Layers, Smartphone, Zap } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { HomeSectionItem } from '@/types';

const trustIndicators = [
  { icon: Code, label: 'Custom Software' },
  { icon: Zap, label: 'Modern Technology' },
  { icon: TrendingUp, label: 'Scalable Solutions' },
  { icon: ShieldCheck, label: 'Long-term Support' },
];

interface HeroProps {
  hero?: HomeSectionItem | null;
}

function Code({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Hero({ hero }: HeroProps) {
  const title = hero?.title || 'Technology That Helps Your Business Grow.';
  const subtitle =
    hero?.subtitle ||
    'We build modern digital products, scalable software and technology solutions that help businesses grow faster.';
  const btnText = hero?.buttonText || 'Start a Project';
  const btnUrl = hero?.buttonUrl || '/contact';
  const btnText2 = hero?.buttonText2 || 'View Our Work';
  const btnUrl2 = hero?.buttonUrl2 || '/projects';

  return (
    <section className="relative overflow-hidden bg-slate-50 pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-[320px] w-[320px] rounded-full bg-sky-400/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-soft">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Software Development · IT Solutions · Digital Products
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={btnUrl} size="lg">
                {btnText}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={btnUrl2} variant="outline" size="lg">
                {btnText2}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {trustIndicators.map((item) => (
                <li key={item.label} className="group flex items-center gap-2 text-sm text-slate-600">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand-600 shadow-soft ring-1 ring-slate-100 transition-colors group-hover:bg-brand-50">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden lg:block" aria-hidden="true">
            <DashboardVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DashboardVisual() {
  const bars = [38, 55, 42, 68, 58, 78, 62, 88, 72, 95, 80, 92];
  return (
    <div className="relative mx-auto max-w-lg">
      <div className="absolute -inset-8 rounded-[2rem] bg-brand-500/10 blur-2xl" aria-hidden="true" />

      <div className="animate-float relative rounded-3xl border border-slate-200 bg-white p-2 shadow-card">
        <div className="rounded-2xl bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs font-medium text-slate-500">Business Dashboard</p>
          </div>

          <div className="space-y-4 p-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Today\u2019s Sales', value: 'Rs 84,250', trend: '+12%', icon: BarChart3 },
                { label: 'Orders', value: '128', trend: '+8%', icon: Layers },
                { label: 'Customers', value: '1,340', trend: '+5%', icon: Smartphone },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition-shadow hover:shadow-soft">
                  <stat.icon className="h-4 w-4 text-brand-500" />
                  <p className="mt-2 text-sm font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-[11px] text-slate-500">{stat.label}</p>
                  <p className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" /> {stat.trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-slate-700">Monthly Sales</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" /> 24.5%
                </span>
              </div>
              <div className="flex h-24 items-end gap-1.5">
                {bars.map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-sm ${i === 9 ? 'bg-brand-500' : 'bg-slate-200'}`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3">
              <div>
                <p className="text-xs font-medium text-brand-800">Invoice #2026-0412</p>
                <p className="text-[11px] text-brand-700/70">Krishna&apos;s Store — Paid</p>
              </div>
              <span className="inline-flex gap-1 rounded-lg bg-white px-2 py-1 text-[11px] font-medium text-brand-700 shadow-soft">
                <Smartphone className="h-3.5 w-3.5" /> POS Sync
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -left-10 bottom-10 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-card xl:block">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Smartphone className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-800">Mobile App</p>
            <p className="text-[11px] text-slate-500">Live & synced</p>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -right-8 -top-6 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card xl:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-800">Order #1024</p>
            <p className="text-[11px] text-slate-500">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}