'use client';
import { DateTimePicker } from '@/components/shared/date-time-picker';
import FileUploader from '@/components/shared/file-uploader/FileUploader';
import { Button, ButtonGroup } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { stringEndWith } from '@/lib';
import { cn } from '@/lib/utils';
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

const Password = ({ defaultValue, label, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-center relative">
      <Input type={showPassword ? 'text' : 'password'} defaultValue={defaultValue} placeholder={label} className={cn('w-full', className)} {...props} />
      <Button size="icon" variant="ghost" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 text-muted-foreground">
        {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export const AddUser = ({ defaultValue, open, setOpen, ...props }) => {
  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG', 'WEBP', 'AVIF'];
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(defaultValue?.role);
  const [selectOpen, setSelectOpen] = useState(false);

  let handler = {};

  if (open && setOpen) {
    handler = {
      onOpenChange: setOpen,
      open: open,
    };
  }
  return (
    <Dialog {...handler} {...props}>
      {!open && !setOpen && (
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex items-center gap-1 px-6">
            <PlusIcon className="w-4 h-4" />
            <span>Add User</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="items-start max-h-screen-compatibility overflow-y-auto" onPointerDownOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{defaultValue ? 'Update' : 'Create'} User</DialogTitle>
          <DialogDescription>
            <span>Are you sure you want to {defaultValue ? 'update' : 'create'} a user?</span>
          </DialogDescription>
          <div className="pt-4 space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue={defaultValue?.name} id="amount" placeholder="Enter Name" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input defaultValue={defaultValue?.phoneNumber} id="phone" placeholder="Enter Phone Number" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input defaultValue={defaultValue?.emailAddress} id="email" placeholder="Enter Email Address" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">{defaultValue ? 'New Password' : 'Password'}</Label>
              <Password defaultValue={defaultValue?.password} placeholder={defaultValue ? 'New Password' : 'Enter Password'} className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Confirm Password</Label>
              <Password placeholder="Confirm Password" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="id">Employee ID</Label>
              <Input defaultValue={defaultValue?.employeeId} id="id" placeholder="Enter Employee ID" className="w-full" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date">Select a Joining Date</Label>
              <div>
                <DateTimePicker defaultValue={defaultValue?.joiningDate} classname="w-full" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <Select open={selectOpen} onOpenChange={setSelectOpen}>
                <SelectTrigger>
                  <SelectValue placeholder={selected || 'Select a Role'} />
                </SelectTrigger>
                <SelectContent className="p-0 w-full">
                  <Command>
                    <CommandInput placeholder="Search roles" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="KAM"
                          onSelect={() => {
                            setSelected('KAM');
                            setSelectOpen(false);
                          }}
                        >
                          <div className="flex">KAM</div>
                        </CommandItem>
                        <CommandItem
                          value="Onboarding"
                          onSelect={() => {
                            setSelected('Onboarding');
                            setSelectOpen(false);
                          }}
                        >
                          <div className="flex">Onboarding</div>
                        </CommandItem>
                        <CommandItem
                          value="Sales Executive"
                          onSelect={() => {
                            setSelected('Sales Executive');
                            setSelectOpen(false);
                          }}
                        >
                          <div className="flex">Sales Executive</div>
                        </CommandItem>
                        <CommandItem
                          value="Client Support"
                          onSelect={() => {
                            setSelected('Client Support');
                            setSelectOpen(false);
                          }}
                        >
                          <div className="flex">Client Support</div>
                        </CommandItem>
                        <CommandItem
                          value="Admin "
                          onSelect={() => {
                            setSelected('Admin ');
                            setSelectOpen(false);
                          }}
                        >
                          <div className="flex">Admin</div>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </SelectContent>
              </Select>
            </div>
            <div className="input-file">
              <Label htmlFor="attachment" className="sr-only">
                Attachment
              </Label>
              <div className="space-y-1 h-52 flex flex-col overflow-hidden">
                {file && (
                  <figure className="w-full relative h-full min-h-0 rounded overflow-hidden group focus-within:[&>*]:opacity-100">
                    <Image fill src={URL.createObjectURL(file instanceof File ? file : Array.from(file)[0])} alt={file instanceof File ? file.name : Array.from(file)[0]?.name} />
                    <ButtonGroup className="absolute top-2 right-2 border border-white/20 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 group-focus:opacity-100 focus-within:opacity-100 focus-visible:opacity-100">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon" className="border-r border-white/20 bg-white/10 backdrop-blur">
                            <Maximize2Icon className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="p-0 border-none group overflow-hidden no-scrollbar max-h-svh"
                          kbdClass="bg-white/20 backdrop-blur border-none text-[#ddd]"
                          closeClass="text-[#ddd] mix-blend-color-dodge opacity-0 group-hover:opacity-100"
                        >
                          <div className="max-h-svh overflow-x-hidden overflow-y-auto">
                            <Image
                              width={400}
                              height={400}
                              className="w-full h-full"
                              src={URL.createObjectURL(file instanceof File ? file : Array.from(file)[0])}
                              alt={file instanceof File ? file.name : Array.from(file)[0]?.name}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="icon" onClick={() => setFile(null)} className="bg-white/10 backdrop-blur">
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </ButtonGroup>
                  </figure>
                )}
                <FileUploader
                  currFiles={file}
                  setFile={setFile}
                  className={cn('text-black dark:text-white h-full', file && 'flex items-center flex-row gap-2 py-2 px-2 border-foreground justify-start h-auto')}
                  name="file"
                  types={fileTypes}
                  label="Upload a Avatar"
                >
                  {file && (
                    <>
                      <ImageIcon className="text-primary" />
                      <p className="text-sm font-medium">Upload or drop another file here to replace</p>
                    </>
                  )}
                </FileUploader>
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
