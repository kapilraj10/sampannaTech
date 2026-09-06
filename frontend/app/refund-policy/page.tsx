import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description:
    'Refund policy for services provided by Sampanna Tech',
  alternates: { canonical: `${siteConfig.url}/refund-policy` },
};

const sections = [
  {
    title: '1. Scope',
    content:
      'This refund policy applies to digital services — including website development, mobile application development, custom software development, design work and related services — provided by Sampanna Tech. Specific refund terms, where applicable, are agreed in the written agreement for each project.',
  },
  {
    title: '2. Advance Payments and Work in Progress',
    content:
      'Projects begin with a written agreement that defines the scope, timeline and payment schedule. Once work has started, advance or progress payments cover work that has already been completed and cannot be refunded unless the agreement states otherwise.',
  },
  {
    title: '3. Refund Eligibility',
    content:
      'A refund may be considered in exceptional circumstances, such as where we are unable to deliver a clearly agreed deliverable and no alternative is acceptable to you. Refund decisions are made on a case-by-case basis and communicated in writing.',
  },
  {
    title: '4. Subscription or Recurring Maintenance',
    content:
      'Maintenance and support subscriptions are billed for the covered period. Cancellation takes effect from the next billing cycle. Fees for the current period are not refunded.',
  },
  {
    title: '5. How to Request a Refund',
    content:
      'To request a refund, contact us through our contact page and include your name, project details, and the reason for the request. We will review the request and respond within a reasonable time.',
  },
  {
    title: '6. Changes to This Policy',
    content:
      'We may update this refund policy from time to time. Any changes will be posted on this page and take effect from the date of the update.',
  },
  {
    title: '7. Contact',
    content: `For questions about this refund policy, reach out to us through our contact page. Sampanna Tech is based in ${siteConfig.location}.`,
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Refund Policy"
        description="How refunds are handled for digital services provided by Sampanna Tech."
      />
      <section className="bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-soft sm:p-12">
            <p className="mb-8 text-sm leading-relaxed text-slate-500">
              Last updated: January 2026
            </p>
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                  <p className="mt-2 leading-relaxed text-slate-600">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}