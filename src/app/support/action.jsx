import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { MoreHorizontalIcon } from 'lucide-react';
import { labels } from './_layout';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/shared/spinner';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2Icon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Item = ({ option, isSelected }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <CommandItem onSelect={() => setIsUpdating(true)} className="group">
      {isUpdating ? (
        <Spinner className="mr-2 h-4 w-4" style={{ color: option.color }} />
      ) : (
        <div
          className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border-2 border-primary', isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible')}
          style={{ backgroundColor: isSelected ? option.color : undefined, borderColor: option.color }}
        >
          <CheckIcon className={cn('h-4 w-4')} />
        </div>
      )}
      {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
      <span className="truncate min-w-0">{option.label}</span>
      <Button
        variant="ghost"
        className="ml-auto h-8 w-8 p-0 text-destructive opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100 group-[[data-selected=true]]:opacity-100"
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </CommandItem>
  );
};

export const Action = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Open Ticket</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <Popover>
                <PopoverTrigger asChild>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                </PopoverTrigger>
                <PopoverContent className="md:hidden" align="end" side="top">
                  <Command>
                    <CommandInput placeholder="Filter labels" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {labels.map(option => {
                          const isSelected = data.labels.some(label => label.title === option.value);
                          return <Item key={option.value} option={option} isSelected={isSelected} />;
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-md:hidden">
                  <Command>
                    <CommandInput placeholder="Filter labels" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {labels.map(option => {
                          const isSelected = data.labels.some(label => label.title === option.value);
                          return <Item key={option.value} option={option} isSelected={isSelected} />;
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Label
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="items-start max-h-screen overflow-y-auto" onPointerDownOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create a new label</DialogTitle>
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name" className="sr-only">
                Label
              </Label>
              <Input id="name" placeholder="Enter a label" className="w-full" />
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
