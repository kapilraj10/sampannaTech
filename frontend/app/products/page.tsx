import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ProductsView from '@/components/sections/ProductsView';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore Sampanna POS and other products built by Sampanna Tech to simplify billing, inventory, sales tracking and business operations.',
  alternates: { canonical: `${siteConfig.url}/products` },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Software We Have Built"
        description="Our own products, designed to solve real business problems — starting with Sampanna POS."
      />
      <ProductsView />
      <CTASection />
    </>
  );
}