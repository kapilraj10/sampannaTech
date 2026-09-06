import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="bg-slate-900 py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Tell us what you need and we will help you build the right solution.
            No obligation talks, just honest advice on technology that fits your business.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/contact" size="lg">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/careers"
              variant="outline"
              size="lg"
              className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-slate-800"
            >
              Join Our Team
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}