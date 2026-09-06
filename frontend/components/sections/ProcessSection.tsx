import { Compass, FlaskConical, Hammer, Pencil, Rocket } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const steps = [
  {
    number: '01',
    title: 'Discuss',
    description: 'Understand the business, problem and requirements.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Define features, technology and project roadmap.',
    icon: Pencil,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Create the user experience and visual design.',
    icon: Pencil,
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build the product using modern technologies.',
    icon: Hammer,
  },
  {
    number: '05',
    title: 'Test',
    description: 'Test performance, security, usability and reliability.',
    icon: FlaskConical,
  },
  {
    number: '06',
    title: 'Launch & Support',
    description: 'Deploy the product and provide ongoing support.',
    icon: Rocket,
  },
];

export default function ProcessSection() {
  const gridItems = [
    [0, 3],
    [1, 4],
    [2, 5],
  ] as const;

  return (
    <section className="bg-white py-20 lg:py-28" id="process">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="A Clear Path From Idea to Launch"
          description="A transparent, step-by-step process that keeps you informed at every stage."
        />

        <ol className="space-y-6">
          {gridItems.map(([a, b], rowIndex) => (
            <li key={rowIndex} className="grid gap-6 md:grid-cols-2">
              {[a, b].map((index) => {
                const step = steps[index];
                return (
                  <div
                    key={step.number}
                    className={cn(
                      'group flex gap-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition-colors hover:border-brand-200 hover:bg-white',
                      rowIndex % 2 === 1 && 'md:flex-row-reverse'
                    )}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft ring-1 ring-slate-100">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold tracking-wider text-brand-600">
                          {step.number}
                        </span>
                        <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}