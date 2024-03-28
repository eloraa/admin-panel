'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker({ defaultValue, onSelect }) {
  const [date, setDate] = React.useState(defaultValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('pr-6 justify-start text-left font-normal', !date && 'text-muted-foreground')}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-40">
        <Calendar
          mode="single"
          selected={date}
          onSelect={date => {
            onSelect && onSelect(date);
            setDate(date);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
