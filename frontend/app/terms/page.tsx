import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the Sampanna Tech website and services.',
  alternates: { canonical: `${siteConfig.url}/terms` },
};

const sections = [
  {
    title: '1. Agreement to Terms',
    content:
      'By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our website.',
  },
  {
    title: '2. Services',
    content:
      'Sampanna Tech provides website development, mobile application development, custom software development, POS and business management systems, UI/UX design, IT consulting, digital solutions, and maintenance and support services. Specific deliverables, timelines and fees are agreed in writing between us before work begins.',
  },
  {
    title: '3. Use of the Website',
    content:
      'You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, or restrict the use and enjoyment of this website by, any third party.',
  },
  {
    title: '4. Intellectual Property',
    content:
      'All content on this website, including text, graphics, logos and software, is the property of Sampanna Tech unless otherwise stated. You may not reproduce, distribute or use our content without our prior written permission.',
  },
  {
    title: '5. Client Content and Data',
    content:
      'For services that involve handling client content, we process that content only to perform the agreed services and protect it with reasonable security measures.',
  },
  {
    title: '6. Payment Terms',
    content:
      'Payment terms for services are defined in each written agreement. Invoices must be paid according to the agreed schedule unless other arrangements are made.',
  },
  {
    title: '7. Warranties and Liability',
    content:
      'We deliver our services with reasonable care and skill. Our liability is limited to the amount paid for the specific service concerned, to the extent permitted by law. We are not liable for indirect or consequential losses.',
  },
  {
    title: '8. Third-Party Links',
    content:
      'Our website may contain links to third-party websites. We are not responsible for the content or practices of those websites.',
  },
  {
    title: '9. Changes to These Terms',
    content:
      'We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.',
  },
  {
    title: '10. Governing Law',
    content:
      'These terms are governed by the laws of Nepal. Any disputes will be subject to the jurisdiction of the courts of Nepal.',
  },
  {
    title: '11. Contact',
    content: `Questions about these terms can be directed to us through our contact page. Sampanna Tech is based in ${siteConfig.location}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that apply when you use our website and engage our services."
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