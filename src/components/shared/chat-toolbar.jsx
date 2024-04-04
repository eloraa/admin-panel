'use client';
import { PlusIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { Select, SelectContent, SelectTrigger } from '../ui/select';
import { Labels } from './labels';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChangeStatus } from './change-status';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { InfoIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User2Icon } from 'lucide-react';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { CircleCheckIcon } from 'lucide-react';
import { CircleXIcon } from 'lucide-react';

export const ChatToolbar = ({ data, statuses, labels, className }) => {
  const [selected, setSelected] = useState(data?.labels?.map(item => (typeof item === 'object' ? item.title : item)) || []);
  return (
    <div className={cn('w-full flex items-center justify-between border-b pb-4 text-sm', className)}>
      <div className="flex items-center gap-4 max-md:flex-col max-md:items-start">
        <div>
          <h1 className="font-medium">{data.subjectForTicket}</h1>
          <h2 className="text-muted-foreground text-xs">#{data.ticketNo}</h2>
        </div>

        {data.labels && !!data.labels.length && (
          <Select>
            <SelectTrigger className="bg-transparent p-0 rounded-none w-auto h-auto min-h-0 border-none gap-3">
              {selected.length ? <Labels labels={labels.filter(label => selected.includes(label.value))} asChild /> : 'Select a label'}
            </SelectTrigger>
            <SelectContent className="p-0 w-full">
              <Command>
                <CommandInput placeholder="Search labels" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem onSelect={() => setModal(true)}>
                      <PlusIcon className="w-4 h-4" />
                      Add Label
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    {labels.map((label, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          setSelected(prev => {
                            if (prev.includes(label.value)) {
                              return prev.filter(item => item !== label.value);
                            } else {
                              return [...prev, label.value];
                            }
                          });
                        }}
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border-2 border-primary',
                            selected.includes(label.value) ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                          )}
                          style={{ backgroundColor: selected.includes(label.value) ? label.color : undefined, borderColor: label.color }}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                        {label.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex items-center gap-4">
        {data.status.toLowerCase() !== 'solved' && data.status.toLowerCase() !== 'closed' ? (
          <ChangeStatus statuses={statuses} status={data.status} className="bg-transparent p-0 rounded-none w-auto h-auto min-h-0 border-none gap-3" />
        ) : data.status.toLowerCase() === 'solved' ? (
          <div className="flex items-center gap-1 text-primary font-medium">
            <CircleCheckIcon className="w-4 h-4" />
            <span>Solved</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-destructive font-medium">
            <CircleXIcon className="w-4 h-4" />
            <span>Closed</span>
          </div>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="border">
              <InfoIcon className="w-4 h-4" />
              <span className="sr-only">User Info</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-popover">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={data?.avatar} />
                <AvatarFallback className="bg-background text-muted-foreground">
                  <User2Icon />
                  <span className="sr-only">{data.clientName}</span>
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h1 className="text-sm font-medium">{data.clientName}</h1>
                <p className="text-xs text-muted-foreground truncate">#SHOP 16261</p>
              </div>
            </div>
            <div className="border-t mt-4 pt-4">
              <TooltipProvider>
                <ul className="space-y-5 font-medium truncate">
                  <li className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground font-normal">Email:</span>{' '}
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p className="truncate min-w-0">Abc@ef.com</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>abc@ef.com</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                  <li className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground font-normal">Ticket No:</span>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p className="truncate min-w-0 text-xs">#{data.ticketNo}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>#{data.ticketNo}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                  <li className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground font-normal">Creation Time:</span>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p className="truncate min-w-0 text-sm">{format(data.submissionTime, 'PPPp')}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format(data.submissionTime, 'PPPp')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                  <li className="flex items-center justify-between text-sm gap-4">
                    <span className="text-muted-foreground font-normal">Status:</span>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p className={cn('truncate min-w-0 capitalize text-sm', data.status === 'solved' && 'font-bold text-primary', data.status === 'closed' && 'font-bold text-destructive')}>
                          {data.status}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="capitalize">{data.status}</p>
                      </TooltipContent>
                    </Tooltip>
                  </li>
                </ul>
              </TooltipProvider>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
