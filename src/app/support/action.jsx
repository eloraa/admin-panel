import { Button, buttonVariants } from '@/components/ui/button';
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
import { colord, getFormat } from 'colord';
import { toRGB } from '@/lib';
import { ColorPicker } from '@/components/shared/color-picker';
import { ChevronRightIcon } from 'lucide-react';
import { ArrowUpRightIcon } from 'lucide-react';
import { ChatDialog } from './chat-dialog';
import Link from 'next/link';

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

  const [color, setColor] = useState({
    name: 'Indigo',
    hex: '#4d4dff',
    rgba: 'rgb(77, 77, 255)',
  });

  // Update color state based on the current input field
  const updateColor = (field, value) => {
    let updatedColor = { ...color };

    switch (field) {
      case 'name':
        updatedColor.name = value;
        break;
      case 'hex':
        updatedColor.hex = value;
        break;
      case 'rgba':
        updatedColor.rgba = value;
        break;
      default:
        break;
    }

    if (field === 'name') {
      updatedColor.hex = colord(toRGB(value))?.toHex() || color.hex;
      updatedColor.rgba = colord(toRGB(value))?.toRgbString() || color.rgba;
    } else if (field === 'hex') {
      updatedColor.name = (colord(value)?.toName && colord(value)?.toName({ closest: true })) || color.name;
      updatedColor.rgba = colord(value)?.toRgbString() || color.rgba;
    } else if (field === 'rgba') {
      updatedColor.name = (colord(value)?.toName && colord(value)?.toName({ closest: true })) || color.name;
      updatedColor.hex = colord(value)?.toHex() || color.hex;
    }

    setColor(updatedColor);
  };
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
          <DropdownMenuGroup>
            <Popover open={open} onOpenChange={setOpen}>
              <div className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'w-full px-2 font-normal cursor-pointer')}>
                <ChatDialog data={data} />
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={e => {
                      e.preventDefault();
                      setOpen(!open);
                    }}
                    className="ml-auto h-6 w-6 hover:bg-[#ddd] dark:hover:bg-[#333]"
                  >
                    <ChevronRightIcon className={cn('h-4 w-4 transition-transform', open ? '-rotate-90' : '')} />
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent className="p-0 bg-transparent w-[165px]" align="end" side="top">
                <DropdownMenuGroup>
                  <Link
                    href={'/chat/' + data.sl}
                    target="_blank"
                    className="relative flex select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    Open in new tab <ArrowUpRightIcon className="ml-auto w-3.5 h-3.5" />
                  </Link>
                </DropdownMenuGroup>
              </PopoverContent>
            </Popover>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <Popover>
                <PopoverTrigger asChild>
                  <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                </PopoverTrigger>
                <PopoverContent className="md:hidden p-0 bg-transparent" align="end" side="top">
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
      <DialogContent className="items-start max-h-screen-compatibility overflow-y-auto" onPointerDownOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create a new label</DialogTitle>
          <div className="space-y-2">
            <div>
              <Label htmlFor="name" className="sr-only">
                Label
              </Label>
              <Input id="name" placeholder="Enter a label" className="w-full" />
            </div>
            <div className="flex items-center gap-2">
              {/* Color Name Input */}
              <div>
                <Label htmlFor="colorName" className="sr-only">
                  Color Name
                </Label>
                <Input id="colorName" placeholder="Indigo" className="w-full" value={color.name} onChange={e => updateColor('name', e.target.value)} />
              </div>

              {/* Color Hex Input */}
              <div>
                <Label htmlFor="colorHex" className="sr-only">
                  Color Hex
                </Label>
                <Input id="colorHex" placeholder="#4d4dff" className="w-full" value={color.hex} onChange={e => updateColor('hex', e.target.value)} />
              </div>

              {/* Color RGBA Input */}
              <div>
                <Label htmlFor="colorRgba" className="sr-only">
                  Color RGBA
                </Label>
                <Input id="colorRgba" placeholder="rgba(255, 255, 255, 1)" className="w-full" value={color.rgba} onChange={e => updateColor('rgba', e.target.value)} />
              </div>

              <div className="w-10 h-10 min-w-10">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0" style={{ background: color.rgba }}>
                      <span className="sr-only">{color.hex}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-auto p-0">
                    <ColorPicker color={color.rgba} onChange={color => updateColor('rgba', color)} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-0 pt-0">
          <Button className="w-full">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
