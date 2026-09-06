import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import CareersView from '@/components/careers/CareersView';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Sampanna Tech. We are always interested in meeting talented people who enjoy solving problems, building products and learning new technologies.',
  alternates: { canonical: `${siteConfig.url}/careers` },
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the Future With Us"
        description="We are always interested in meeting talented people who enjoy solving problems, building products and learning new technologies."
      />

      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900">Why work with us</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: 'Real problems, real products',
                  text: 'Work on practical tools that businesses use every day.',
                },
                {
                  title: 'Modern technology',
                  text: 'Build with current, maintainable frameworks and practices.',
                },
                {
                  title: 'Room to grow',
                  text: 'Take responsibility, learn continuously and level up your skills.',
                },
                {
                  title: 'Honest culture',
                  text: 'Clear communication, reasonable expectations and a supportive team.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-soft"
                >
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-slate-500">
              Applications are handled directly through our{' '}
              <a href="/contact" className="font-medium text-brand-600 hover:text-brand-700">
                contact page
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <CareersView />
    </>
  );
}