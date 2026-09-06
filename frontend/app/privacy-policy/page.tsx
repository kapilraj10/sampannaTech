import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Sampanna Tech website.',
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

const sections = [
  {
    title: '1. Information We Collect',
    content:
      'We collect information you provide directly, such as your name, email address, phone number, company name and the details of your enquiry when you use our contact form or subscribe to our newsletter.',
  },
  {
    title: '2. How We Use Your Information',
    content:
      'We use the information you provide to respond to your enquiries, provide the services you request, send you information when you have subscribed, and improve our website and services.',
  },
  {
    title: '3. Data Sharing',
    content:
      'We do not sell your personal information. We do not share your personal information with third parties except where necessary to provide a service you have requested or where required by law.',
  },
  {
    title: '4. Data Retention',
    content:
      'We retain contact and enquiry data only as long as necessary for the purposes described in this policy, after which it is deleted or anonymized.',
  },
  {
    title: '5. Cookies and Analytics',
    content:
      'Our website may use cookies and similar technologies to understand how visitors use the site. You can control cookies through your browser settings.',
  },
  {
    title: '6. Your Rights',
    content:
      'You may request access to, correction of, or deletion of the personal information we hold about you. To make a request, contact us using the information on our contact page.',
  },
  {
    title: '7. Data Security',
    content:
      'We take reasonable measures to protect the information you provide against unauthorized access, alteration or disclosure.',
  },
  {
    title: '8. Changes to This Policy',
    content:
      'We may update this policy from time to time. We will post any changes on this page. We encourage you to review this page periodically.',
  },
  {
    title: '9. Contact Us',
    content: `If you have questions about this privacy policy, you can reach us through the contact details provided on our contact page. Sampanna Tech is based in ${siteConfig.location}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect information when you visit our website or contact us."
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