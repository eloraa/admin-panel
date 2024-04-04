'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const AssignUser = ({ className, defaultValue, accounts = [], onChange, onConfirm, placeholder = 'Search Account' }) => {
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [prevUser, setPrevUser] = React.useState(accounts.find(account => account.name?.toLowerCase() === defaultValue.toLowerCase()) || null);
  const [selectedAccount, setSelectedAccount] = React.useState(accounts.find(account => account.name?.toLowerCase() === defaultValue.toLowerCase()) || null);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-[150px] justify-start gap-2">
            {selectedAccount ? (
              <>
                <Avatar className="w-6 h-6">
                  <AvatarImage src={selectedAccount.image} />
                  <AvatarFallback>{selectedAccount.name[0]}</AvatarFallback>
                </Avatar>
                {selectedAccount.name}
              </>
            ) : (
              <>{defaultValue || 'Change'}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('p-0', className)} side="right" align="start">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {accounts.map(account => (
                  <CommandItem
                    value={account.email}
                    key={account.email}
                    onSelect={value => {
                      setOpen(false);
                      if (value.toLowerCase() === selectedAccount?.email.toLowerCase()) return;
                      setModal(true);
                      setPrevUser(selectedAccount);
                      setSelectedAccount(accounts.find(priority => priority.email.toLowerCase() === value.toLowerCase()) || null);
                      !!onChange && onChange(value);
                    }}
                    className="gap-1"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={account.image} />
                      <AvatarFallback>{account.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{account.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog modal open={modal} onOpenChange={setModal}>
        <DialogContent
          onPointerDownOutside={e => e.preventDefault()}
          onClose={() => {
            setModal(false);
            setOpen(false);
            setSelectedAccount(prevUser);
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <span>
                Are you sure you want to set the user to <span className="font-medium text-primary">{selectedAccount?.name}</span>?
              </span>
            </DialogDescription>
            {selectedAccount?.email.toLowerCase() === 'paid' && (
              <div className="pt-4">
                <div className="gap-4">
                  <Label htmlFor="reference" className="sr-only">
                    Reference
                  </Label>
                  <Input id="reference" placeholder="Enter Reference" className="w-full" />
                </div>
              </div>
            )}
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setModal(false);
                setOpen(false);
                onConfirm && onConfirm(selectedAccount?.email);
              }}
              type="submit"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
