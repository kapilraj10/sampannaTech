import { ArrowRight, CheckCircle2, MonitorDot } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { ProductItem } from '@/types';

interface ProductDetailProps {
  product: ProductItem;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
      <div className="grid items-center lg:grid-cols-2">
        <div className="relative flex min-h-[320px] flex-col items-center justify-center bg-slate-900 p-10 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.4) 1px, transparent 0)',
              backgroundSize: '22px 22px',
            }}
          />
          <span className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
            <MonitorDot className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="relative text-2xl font-bold text-white">{product.name}</h2>
          {product.tagline && (
            <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
              {product.tagline}
            </p>
          )}
          {product.featured && (
            <span className="relative mt-5 inline-flex rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-300 ring-1 ring-brand-400/30">
              Featured Product
            </span>
          )}
        </div>

        <div className="p-8 lg:p-12">
          <p className="leading-relaxed text-slate-600">{product.description}</p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-500">
            Key Features
          </h3>
          <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {product.features?.map((feature) => (
              <span key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Explore {product.name}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}