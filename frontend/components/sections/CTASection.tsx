import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import type { HomeSectionItem } from '@/types';

interface CTASectionProps {
  cta?: HomeSectionItem | null;
}

export default function CTASection({ cta }: CTASectionProps) {
  const title = cta?.title || 'Have a Project in Mind?';
  const subtitle =
    cta?.subtitle ||
    "Let's turn your idea into a reliable, scalable and beautiful digital product.";
  const btnText = cta?.buttonText || 'Start a Project';
  const btnUrl = cta?.buttonUrl || '/contact';
  const btnText2 = cta?.buttonText2 || 'Contact Us';
  const btnUrl2 = cta?.buttonUrl2 || '/contact';

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-sky-500/10 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-300">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-400" />
            Let&apos;s Build Together
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href={btnUrl} size="lg">
              {btnText}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={btnUrl2}
              variant="outline"
              size="lg"
              className="border-white/15 bg-white/5 text-white hover:border-brand-400/40 hover:bg-white/10 hover:text-white"
            >
              {btnText2}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}