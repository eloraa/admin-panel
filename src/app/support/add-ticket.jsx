'use client';
import { DateTimePicker } from '@/components/shared/date-time-picker';
import FileUploader from '@/components/shared/file-uploader/FileUploader';
import { Button, ButtonGroup } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { stringEndWith } from '@/lib';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';
import { TrashIcon } from 'lucide-react';
import { Maximize2Icon } from 'lucide-react';
import { EyeIcon } from 'lucide-react';
import { EyeOffIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { Trash } from 'lucide-react';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { labels } from './_layout';
import { CheckIcon } from 'lucide-react';
import { Labels } from '@/components/shared/labels';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/shared/color-picker';
import { colord } from 'colord';
import { Textarea } from '@/components/ui/textarea';

export const AddTicket = ({ open, setOpen, ...props }) => {
  const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF', 'JPG', 'WEBP', 'AVIF'];
  const [file, setFile] = useState(null);
  const handleChange = file => {
    setFile(file);
  };
  const removeFile = index => {
    const newFiles = [...file];
    newFiles.splice(index, 1);
    setFile(newFiles);
  };

  const [selected, setSelected] = useState([]);
  const [selectedShop, setSelectedShop] = useState();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectOpen2, setSelectOpen2] = useState(false);
  const [modal, setModal] = useState(false);
  let handler = {};

  if (open && setOpen) {
    handler = {
      onOpenChange: setOpen,
      open: open,
    };
  }

  const [color, setColor] = useState({
    name: 'Indigo',
    hex: '#4d4dff',
    rgba: 'rgb(77, 77, 255)',
  });

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
    <Dialog {...handler} {...props}>
      {!open && !setOpen && (
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center gap-1 px-6">
            <PlusIcon className="w-4 h-4" />
            <span>Create New Ticket</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="items-start max-h-screen-compatibility overflow-y-auto" onPointerDownOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            Ticket No. <span className="font-semibold">#40215</span>
          </DialogTitle>
          <DialogDescription>
            <span>
              Creation date: <span className="text-foreground">{format(new Date(), 'PPPp')}</span>
            </span>
          </DialogDescription>
          <div className="pt-4 space-y-2">
            <div className="space-y-1">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter Subject" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="shopID">Shop ID</Label>
              <Select open={selectOpen2} onOpenChange={setSelectOpen2}>
                <SelectTrigger>
                  <SelectValue placeholder={selectedShop || 'Select a Shop ID'} />
                </SelectTrigger>
                <SelectContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search Shop ID" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setSelectedShop('SHOP 11');
                            setSelectOpen2(false);
                          }}
                        >
                          SHOP 11
                        </CommandItem>
                        <CommandItem
                          onSelect={() => {
                            setSelectedShop('SHOP 12');
                            setSelectOpen2(false);
                          }}
                        >
                          SHOP 12
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="role">Label</Label>
              <Select open={selectOpen} onOpenChange={setSelectOpen}>
                <SelectTrigger>{selected.length ? <Labels labels={labels.filter(label => selected.includes(label.value))} asChild length={4} /> : 'Select a label'}</SelectTrigger>
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

              <Dialog open={modal} onOpenChange={setModal}>
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
            </div>
            <div className="space-y-1">
              <Label htmlFor="details">Details</Label>
              <Textarea id="phone" placeholder="Details" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="attachment" className="sr-only">
                Attachment
              </Label>
              <FileUploader currFiles={file} setFile={setFile} className="text-black dark:text-white" multiple={true} handleChange={handleChange} name="file" types={fileTypes} />

              <div className="space-y-2 mt-6 max-h-24 md:max-h-52 overflow-hidden overflow-y-auto no-scrollbar">
                {file &&
                  !!file.length &&
                  Array.from(file).map((file, index) => (
                    <div key={index} className="rounded border p-4 text-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-primary">
                          {file.type.includes('image') && <ImageIcon className="w-6 h-6" />}
                          {file.type.includes('pdf') && <FileText className="w-6 h-6" />}
                        </div>
                        {file.name}
                      </div>
                      <div>
                        <Button onClick={() => removeFile(index)} size="icon" variant="outline" className="text-red-600 hover:text-red-600">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start mt-0">
          <Button className="w-full" type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
