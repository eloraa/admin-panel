import { cn } from '@/lib/utils';

function Skeleton({ className, delay, ...props }) {
  return <div style={{ animationDelay: `${delay}ms` }} className={cn('animate-pulse rounded-md bg-[#e7e7e9]', className)} {...props} />;
}

export { Skeleton };
