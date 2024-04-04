import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { CircleDashedIcon } from 'lucide-react';

export const Timeline = ({ timeline = [] }) => {
  return (
    <div className="flex items-center gap-4 min-w-fit max-w-fit relative">
      {timeline.length && (
        <>
          <div className="absolute inset-x-0 border-b border-primary z-[1] border-dashed"></div>
          {timeline.map((t, index) => (
            <HoverCard openDelay={0} key={index}>
              <HoverCardTrigger asChild>
                <div
                  className={cn(
                    clsx(
                      'w-3.5 h-3.5 rounded-full bg-indigo-50 border-dotted hover:border-solid transition-all dark:bg-indigo-900 border-2 border-indigo-100 dark:border-indigo-800 hover:scale-105 relative z-[2]',
                      {
                        'border-primary': t.value,
                      },
                      { 'border-destructive bg-red-50': t.variant === 'error' }
                    )
                  )}
                ></div>
              </HoverCardTrigger>
              {t.value && (
                <HoverCardContent side="top" className="flex items-start gap-4">
                  <div className="p-1 rounded bg-indigo-50 text-primary"> {t.icon ? <t.icon className="w-4 h-4" /> : <CircleDashedIcon className="w-4 h-4" />}</div>
                  <div className="space-y-1">
                    <h1 className="font-medium">{t.label}</h1>
                    <h2 className="font-semibold bg-indigo-50/50 dark:bg-muted">{t.value}</h2>
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </>
      )}
    </div>
  );
};
