import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'btn-shine bg-brand-600 text-white hover:bg-brand-700 hover:shadow-brand-sm active:scale-[0.98]',
  secondary:
    'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]',
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50/40 active:scale-[0.98]',
  ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}