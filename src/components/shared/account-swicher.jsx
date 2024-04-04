'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserIcon } from 'lucide-react';
import { Button } from '../ui/button';

export function AccountSwitcher({ isCollapsed, accounts, defaultValue, showConfirmation, className, onChange }) {
  const [selectedAccount, setSelectedAccount] = React.useState(defaultValue || accounts[0].email);
  const [prevSelectedAccount, setPrevSelectedAccount] = React.useState(selectedAccount);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Select
        value={selectedAccount}
        onValueChange={val => {
          setSelectedAccount(val);
          onChange && !showConfirmation && onChange(val);
          showConfirmation && setOpen(true);
          !showConfirmation && setPrevSelectedAccount(val);
        }}
      >
        <SelectTrigger
          className={cn(
            'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
            isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden',
            className
          )}
          aria-label="Select account"
        >
          <SelectValue placeholder="Select an account">
            <Avatar className="w-6 h-6">
              <AvatarImage src={accounts.find(account => account.email === selectedAccount)?.image} />
              <AvatarFallback>{accounts.find(account => account.email === selectedAccount)?.label[0]}</AvatarFallback>
            </Avatar>

            <span className={cn('ml-2', isCollapsed && 'hidden')}>{accounts.find(account => account.email === selectedAccount)?.label}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {accounts.map(account => (
            <SelectItem key={account.email} value={account.email}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={account.image} />
                  <AvatarFallback>{account.label[0]}</AvatarFallback>
                </Avatar>
                {account.email}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogContent
          onPointerDownOutside={e => e.preventDefault()}
          onClose={() => {
            setOpen(false);
            setSelectedAccount(prevSelectedAccount);
          }}
          className="sm:max-w-md"
        >
          <DialogHeader className="flex flex-col items-center">
            <div className="bg-primary p-2 rounded-full w-16 h-16 flex items-center justify-center text-primary-foreground mb-2">
              <UserIcon />
            </div>
            <DialogTitle className="bg-none text-center pb-0">Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <p className="text-center">
            You want to change the user to{' '}
            <span className="font-semibold bg-indigo-50 dark:bg-muted dark:text-indigo-100 text-primary">
              {accounts.find(account => account.email === selectedAccount)?.label} ({accounts.find(account => account.email === selectedAccount)?.email})
            </span>
            . This action cannot be undone
          </p>
          <DialogFooter className="bg-none pt-0">
            <Button
              onClick={() => {
                setOpen(false);
                setPrevSelectedAccount(value);
                onChange && onChange(value);
              }}
              type="submit"
              className="w-full"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
