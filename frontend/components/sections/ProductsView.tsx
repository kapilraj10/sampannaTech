'use client';

import { useApiData, api } from '@/hooks/useApiData';
import Container from '@/components/ui/Container';
import LoadingCard from '@/components/ui/LoadingCard';
import ErrorMessage from '@/components/ui/ErrorMessage';
import EmptyState from '@/components/ui/EmptyState';
import ProductDetail from '@/components/sections/ProductDetail';

export default function ProductsView() {
  const products = useApiData(() => api.getProducts());

  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <Container>
        {products.loading && <LoadingCard className="mx-auto max-w-3xl" />}

        {products.error && !products.loading && (
          <ErrorMessage message={products.error} onRetry={products.refetch} />
        )}

        {!products.loading && !products.error && products.data.length === 0 && (
          <EmptyState
            title="Products coming soon"
            description="We are shaping new products for businesses. Check back soon."
          />
        )}

        {!products.loading &&
          !products.error &&
          products.data.length > 0 && (
            <div className="space-y-8">
              {products.data.map((product) => (
                <ProductDetail key={product._id} product={product} />
              ))}
            </div>
          )}
      </Container>
    </section>
  );
}