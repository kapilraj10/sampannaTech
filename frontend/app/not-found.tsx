import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-slate-50 pt-24">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-6xl font-bold text-brand-600">404</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}