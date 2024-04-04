'use client';

import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Pencil } from 'lucide-react';
import { PencilIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';

export const ChangeValue = ({ className, defaultValue, onChange, hideButton, ...props }) => {
  const [modal, setModal] = React.useState(false);
  const [prevValue, setprevValue] = React.useState(defaultValue);
  const [value, setValue] = React.useState(defaultValue);
  const [isEditing, setIsEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleBlur = () => {
    if (hideButton && inputRef.current?.value !== prevValue) {
      setModal(true);
    }
  };

  return (
    <>
      <div className={cn('flex items-center relative justify-between', className)}>
        <Input
          onBlur={handleBlur}
          ref={inputRef}
          readOnly={!hideButton && !isEditing}
          value={value}
          onChange={e => setValue(e.target.value)}
          className={cn('w-full', !hideButton && 'pr-12')}
          {...props}
        />
        {hideButton ? (
          ''
        ) : isEditing ? (
          <Button variant="outline" size="icon" className="absolute right-0" onClick={() => setModal(true)}>
            <CheckIcon className="w-4 h-4 text-primary" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0"
            onClick={() => {
              setIsEditing(true);
              inputRef.current?.focus();
            }}
          >
            <PencilIcon className="w-4 h-4 text-primary" />
          </Button>
        )}
      </div>
      <Dialog modal open={modal} onOpenChange={setModal}>
        <DialogContent
          onPointerDownOutside={e => e.preventDefault()}
          onClose={() => {
            setModal(false);
            setValue(prevValue);
          }}
          className="sm:max-w-md"
        >
          <DialogHeader className="flex flex-col items-center">
            <div className="bg-primary p-2 rounded-full w-16 h-16 flex items-center justify-center text-primary-foreground mb-2">
              <CheckIcon />
            </div>
            <DialogTitle className="bg-none text-center pb-0">Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <p className="text-center">
            You want to change the value to <span className="font-semibold bg-indigo-50 dark:bg-muted dark:text-indigo-100 text-primary">{value}</span>. This action cannot be undone
          </p>
          <DialogFooter className="bg-none pt-0">
            <Button
              onClick={() => {
                setModal(false);
                setIsEditing(false);
                setprevValue(value);
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
};
