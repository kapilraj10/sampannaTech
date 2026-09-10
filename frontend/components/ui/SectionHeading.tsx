import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mb-12',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider',
            dark
              ? 'border-white/15 bg-white/5 text-brand-300'
              : 'border-brand-100 bg-brand-50 text-brand-600'
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight',
          dark ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            align === 'center' && 'mx-auto max-w-2xl',
            dark ? 'text-slate-400' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}