import { BadgeCheck, Handshake, Heart, LineChart, ShieldCheck, Wallet } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';

const reasons = [
  {
    icon: LineChart,
    title: 'Modern Technology',
    description: 'Built with modern frameworks and scalable architecture.',
  },
  {
    icon: Handshake,
    title: 'Business Focused',
    description: 'We build solutions around real business needs.',
  },
  {
    icon: BadgeCheck,
    title: 'Transparent Process',
    description: 'Clear communication from planning to delivery.',
  },
  {
    icon: Wallet,
    title: 'Affordable Solutions',
    description: 'Practical technology without unnecessary complexity.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Support',
    description: 'We stay available after launch for updates and support.',
  },
  {
    icon: Heart,
    title: 'Scalable Architecture',
    description: 'Solutions designed to grow with your business.',
  },
];

export default function WhySection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Us"
          title="Why Businesses Choose Sampanna Tech"
          description="We combine technical reliability with a clear understanding of how real companies operate."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <reason.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-slate-900">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}