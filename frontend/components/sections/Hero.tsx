import { ArrowRight, BarChart3, CheckCircle2, Layers, Smartphone, TrendingUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(100,116,139,0.15) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Technology • Software • Digital Solutions
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Technology That Helps Your{' '}
              <span className="text-brand-600">Business Grow.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              We build modern websites, mobile applications, business software
              and digital solutions designed for real-world businesses.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                'Websites & Digital Labs',
                'Mobile Applications',
                'Business Software',
                'POS & Management Systems',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                  {item}
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
      <div className="absolute -inset-6 rounded-3xl bg-brand-500/5 blur-2xl" />

      <div className="relative rounded-2xl border border-slate-200 bg-white shadow-card">
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
              <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <stat.icon className="h-4 w-4 text-brand-500" />
                <p className="mt-2 text-sm font-semibold text-slate-900">{stat.value}</p>
                <p className="text-[11px] text-slate-500">{stat.label}</p>
                <p className="mt-1 inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                  <TrendingUp className="h-3 w-3" /> {stat.trend}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-100 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-700">Monthly Sales</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                <TrendingUp className="h-3 w-3" /> 24.5%
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

          <div className="flex items-center justify-between rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
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

      <div className="absolute -left-8 bottom-8 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-card xl:block">
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

      <div className="absolute -right-6 -top-5 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card xl:block">
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