import Link from 'next/link';
import { Hexagon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)} aria-label="Sampanna Tech Home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
        <Hexagon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className={cn('text-lg font-bold tracking-tight text-slate-900', textClassName)}>
        Sampanna<span className="text-brand-600"> Tech</span>
      </span>
    </Link>
  );
}