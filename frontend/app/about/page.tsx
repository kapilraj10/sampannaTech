import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import SectionHeading from '@/components/ui/SectionHeading';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Sampanna Tech, a technology company building practical, scalable and user-friendly digital solutions for businesses in Nepal and beyond.',
  alternates: { canonical: `${siteConfig.url}/about` },
};

const values = [
  {
    title: 'Innovation',
    description: 'We explore modern tools and approaches and apply only what adds real value.',
  },
  {
    title: 'Transparency',
    description: 'Honest communication, clear timelines and realistic expectations, always.',
  },
  {
    title: 'Quality',
    description: 'We take pride in careful, reliable work that stands the test of daily use.',
  },
  {
    title: 'Customer Focus',
    description: 'Your business goals guide every decision we make on a project.',
  },
  {
    title: 'Continuous Improvement',
    description: 'We keep learning, refining and improving how we build and support software.',
  },
];

const commitments = [
  'Clear scope and timelines before development begins',
  'Regular updates through the life of a project',
  'Practical solutions that fit your budget',
  'Support after launch, not just delivery',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Building Technology With Purpose"
        description="A technology company focused on practical, scalable and user-friendly digital solutions for real businesses."
      />

      <section className="bg-slate-50 py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-slate-700">
              Sampanna Tech is a technology company focused on building practical,
              scalable and user-friendly digital solutions for businesses.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              From websites and mobile applications to custom business software,
              we help organizations turn ideas into reliable technology. Based in
              Kathmandu, Nepal, we work with businesses of every size — from local
              shops to growing companies — to put modern technology to work where
              it matters most.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              We believe technology should be useful first. That means software that
              fits how your team actually works, interfaces people can learn quickly,
              and systems that stay reliable long after launch.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                To make modern technology accessible and useful for businesses of every size.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-soft">
              <h2 className="text-xl font-bold text-slate-900">Our Vision</h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                To become a trusted technology partner for businesses in Nepal and beyond.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What We Stand For"
            description="The principles that guide how we work with every client."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
              >
                <h3 className="text-base font-semibold text-brand-700">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Our Approach"
              title="How We Work With You"
              align="left"
              className="mb-0"
            />
            <ul className="space-y-4">
              {commitments.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}