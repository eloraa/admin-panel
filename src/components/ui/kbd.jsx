import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const Kbd = forwardRef(({ className, ...props }, ref) => {
  return (
    <kbd
      ref={ref}
      {...props}
      {...props}
      className={cn(
        'inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-semibold text-black dark:text-white opacity-100',
        className
      )}
    />
  );
});
Kbd.displayName = 'Kbd';

export { Kbd };
