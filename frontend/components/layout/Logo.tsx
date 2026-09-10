import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/app/logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ className, textClassName }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)} aria-label="Sampanna Tech Home">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-slate-200">
        <Image
          src={logoImage}
          alt="Sampanna Tech"
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className={cn('text-lg font-bold tracking-tight text-slate-900', textClassName)}>
        Sampanna<span className="text-brand-600"> Tech</span>
      </span>
    </Link>
  );
}
