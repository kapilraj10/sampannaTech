import { cn } from '@/lib/utils';

export default function LoadingCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-soft',
        className
      )}
    >
      <div className="h-10 w-10 rounded-lg bg-slate-200" />
      <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
      <div className="mt-3 h-3 w-full rounded bg-slate-100" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-100" />
      <div className="mt-4 h-3 w-1/3 rounded bg-slate-200" />
    </div>
  );
}