import Container from '@/components/ui/Container';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-slate-200 bg-white pb-14 pt-28 lg:pt-36">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-brand-600">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}