import { ArrowRight, Eye, Target, Trees } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const values = [
  'Innovation',
  'Transparency',
  'Quality',
  'Customer Focus',
  'Continuous Improvement',
];

const pillars = [
  {
    icon: Target,
    title: 'Mission',
    text: 'To make modern technology accessible and useful for businesses of every size.',
  },
  {
    icon: Eye,
    title: 'Vision',
    text: 'To become a trusted technology partner for businesses in Nepal and beyond.',
  },
];

export default function AboutSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="About Us"
              title="Building Technology With Purpose"
              align="left"
              className="mb-6"
            />
            <p className="leading-relaxed text-slate-600">
              Sampanna Tech is a technology company focused on building practical,
              scalable and user-friendly digital solutions for businesses. From
              websites and mobile applications to custom business software, we help
              organizations turn ideas into reliable technology.
            </p>

            <div className="mt-10 space-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{pillar.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Our Values
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700"
                  >
                    <Trees className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Button href="/about" variant="outline">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-brand-500/5 blur-2xl" aria-hidden="true" />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
              <div className="space-y-6">
                {[
                  { title: '01', text: 'Practical, scalable digital solutions' },
                  { title: '02', text: 'Websites, mobile apps and custom software' },
                  { title: '03', text: 'Clear communication from planning to delivery' },
                  { title: '04', text: 'Reliable support after launch' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                      {item.title}
                    </span>
                    <p className="text-sm font-medium text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl bg-slate-900 p-6 text-white">
                <p className="text-sm font-semibold text-brand-300">Technology. Purpose. Growth.</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  We build technology that works for the people who use it every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}