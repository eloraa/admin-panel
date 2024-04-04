'use client';
import * as React from 'react';
import { Button, ButtonGroup } from '../ui/button';
import { TimerIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';

const filter = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
  },
  {
    label: 'Last 7 Days',
    value: 'last7Days',
  },
  {
    label: 'This Month',
    value: 'thisMonth',
  },
  {
    label: 'Lifetime',
    value: 'lifetime',
  },
  {
    label: 'Custom',
    value: 'custom',
  },
];

export const FilterItem = ({ iconOnly, onChange, className, defaultRange, label = 'Filter', overrideLabel, checkbox }) => {
  const [value, setValue] = React.useState(checkbox ? undefined : filter[0].value);
  const [date, setDate] = React.useState(defaultRange);

  return iconOnly ? (
    <ButtonGroup className={cn(className)}>
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <Button variant="outline" size="xs" className={cn('min-w-6', filter[5].value === value && 'bg-indigo-50 dark:bg-muted text-primary')}>
            <TimerIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={e => {
              setValue(filter[5].value);
              setDate(e);
              onChange && onChange(e);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <DropdownMenu value={value} onValueChange={setValue}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="xs" className={cn('min-w-6', filter.slice(0, 5).some(item => item.value === value) && 'bg-indigo-50 dark:bg-muted text-primary')}>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filter.slice(0, checkbox ? 6 : 5).map(item => (
            <DropdownMenuCheckboxItem
              checked={item.value === value}
              key={item.value}
              onSelect={() => {
                setValue(checkbox ? (item.value === value ? undefined : item.value) : item.value);
                onChange && onChange(item.value);
              }}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ) : (
    <ButtonGroup className={cn(className)}>
      <DropdownMenu value={value} onValueChange={setValue}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={cn(filter.slice(0, 5).some(item => item.value === value) && 'bg-indigo-50 dark:bg-muted text-primary')}>
            {overrideLabel ? label : filter.find(item => item.value === value)?.label}
            <ChevronDownIcon className="h-5 w-5 min-w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filter.slice(0, checkbox ? 6 : 5).map(item => (
            <DropdownMenuCheckboxItem
              checked={item.value === value}
              key={item.value}
              onSelect={() => {
                setValue(checkbox ? (item.value === value ? undefined : item.value) : item.value);
                onChange && onChange(item.value);
              }}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Popover>
        <PopoverTrigger className="w-full" asChild>
          <Button variant="outline" size="sm" className={cn('min-w-6', filter[5].value === value && 'bg-indigo-50 dark:bg-muted text-primary')}>
            <TimerIcon className="h-[18px] w-[18px]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={e => {
              setValue(filter[5].value);
              setDate(e);
              onChange && onChange(e);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
};
