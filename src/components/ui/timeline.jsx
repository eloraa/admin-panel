import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { StopCircle } from 'lucide-react';
import { CircleDotDashed } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';

export const Timeline = ({ timeline = [] }) => {
  return (
    <div className="flex items-center">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              clsx(
                'w-3 h-3 rounded-full bg-violet-50 dark:bg-violet-900 border-2 border-violet-100 transition-transform hover:scale-105',
                {
                  'border-primary': timeline.pending,
                }
              )
            )}
          ></div>
        </HoverCardTrigger>
        {timeline.pending && (
          <HoverCardContent side="top" className="flex items-start gap-4">
            <div className="p-1 rounded bg-violet-50 text-primary">
              <StopCircle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h1>Pending</h1>
              <h2 className="font-medium bg-violet-50/50">{timeline.pending}</h2>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>

      <div
        className={cn(
          clsx(
            'h-1 w-3 bg-violet-50 dark:bg-violet-900',
            { 'bg-primary': timeline['in-progress'] },
            { 'bg-violet-100 dark:bg-violet-800': timeline.paid }
          )
        )}
      ></div>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              clsx(
                'w-3 h-3 rounded-full bg-violet-50 dark:bg-violet-900 border-2 border-violet-100 dark:border-violet-800 transition-transform hover:scale-105',
                {
                  'border-primary': timeline['in-progress'],
                }
              )
            )}
          ></div>
        </HoverCardTrigger>
        {timeline['in-progress'] && (
          <HoverCardContent side="top" className="flex items-start gap-4">
            <div className="p-1 rounded bg-violet-50 text-primary">
              <CircleDotDashed className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h1>In Progress</h1>
              <h2 className="font-medium bg-violet-50/50">{timeline['in-progress']}</h2>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>

      <div
        className={cn(
          clsx('h-1 w-3 bg-violet-50 dark:bg-violet-900', { 'bg-primary': timeline.paid }, { 'bg-violet-100 dark:bg-violet-800': timeline.paid })
        )}
      ></div>

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              clsx(
                'w-3 h-3 rounded-full bg-violet-50 dark:bg-violet-900 border-2 border-violet-100 dark:border-violet-800 transition-transform hover:scale-105',
                {
                  'border-primary': timeline.paid,
                }
              )
            )}
          ></div>
        </HoverCardTrigger>
        {timeline.paid && (
          <HoverCardContent side="top" className="flex items-start gap-4">
            <div className="p-1 rounded bg-violet-50 text-primary">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h1>Paid</h1>
              <h2 className="font-medium bg-violet-50/50">{timeline.paid}</h2>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};
