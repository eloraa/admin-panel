'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '../ui/input';
import { CalendarIcon } from 'lucide-react';

export function DateTimePicker({ defaultValue, onChange, classname }) {
  const [date, setDate] = React.useState(defaultValue ? new Date(defaultValue) : new Date());
  const [time, setTime] = React.useState('00:00');
  const handleTimeChange = e => {
    const time = e.target.value;
    if (!date) {
      setTime(time);
      return;
    }
    const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
    const newSelectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    setDate(newSelectedDate);
    setTime(time);
    onChange && onchange(newSelectedDate);
  };

  const handleDaySelect = date => {
    if (!time || !date) {
      setDate(date);
      return;
    }
    const [hours, minutes] = time.split(':').map(str => parseInt(str, 10));
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    setDate(newDate);
    onChange && onchange(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className={cn('w-[250px] justify-start text-left font-normal', !date && 'text-muted-foreground', classname)}>
          <CalendarIcon className="mr-2 h-4 w-4 min-w-4" />
          {date ? format(date, 'PPPp') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleDaySelect} />
        </div>
        <div>
          <Input placeholder="Pick a time" type="time" name="date-time" value={time} onChange={handleTimeChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
