import { ArrowRight, CheckCircle2, MonitorDot } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import type { ProductItem } from '@/types';

interface ProductsSectionProps {
  products: ProductItem[];
  loading?: boolean;
  error?: string;
}

export default function ProductsSection({ products, loading, error }: ProductsSectionProps) {
  const featured =
    products.find((p) => p.featured) || products[0];

  return (
    <section className="bg-slate-50 py-20 lg:py-28" id="products">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Software We Have Built"
          description="Our own products, designed to solve real business problems."
        />

        {loading && <LoadingCard className="mx-auto max-w-3xl" />}

        {error && !loading && <ErrorMessage message={error} />}

        {!loading && !error && !featured && (
          <EmptyState
            title="Products coming soon"
            description="We are shaping new products for businesses. Check back soon."
          />
        )}

        {!loading && !error && featured && (
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
            <div className="grid md:grid-cols-2">
              <div className="relative flex items-center justify-center bg-slate-900 p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.4) 1px, transparent 0)',
                    backgroundSize: '22px 22px',
                  }}
                />
                <div className="relative text-center">
                  <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
                    <MonitorDot className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-bold text-white">{featured.name}</h3>
                  {featured.tagline && (
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-300">
                      {featured.tagline}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-8 lg:p-10">
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                  Featured Product
                </span>
                <p className="mt-4 leading-relaxed text-slate-600">{featured.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {featured.features?.map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/products" variant="secondary">
                    Explore {featured.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}