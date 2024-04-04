'use client';

import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { ChevronsUpDownIcon } from 'lucide-react';

export const ChangeStatus = ({ className, status, statuses, label, onChange, inputs, applyInputs, onSubmit, buttonOnly, willChangeTo }) => {
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [prevStatus, setPrevStatus] = React.useState(status);
  const [selectedStatus, setSelectedStatus] = React.useState(statuses?.find(priority => priority.value === status) || null);

  if (buttonOnly && !willChangeTo) throw new Error('buttonOnly requires willChangeTo to be set');

  return (
    <div className="flex space-x-4">
      {buttonOnly && (
        <Button variant="outline" size="sm" onClick={() => setModal(true)} className={cn('w-[150px] justify-between', className)}>
          {label || 'Change status'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
      {!buttonOnly && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className={cn('w-[150px] justify-between', className)}>
              {selectedStatus ? selectedStatus.label : label || 'Change status'}
              <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map(
                    status =>
                      !status?.hide && (
                        <CommandItem
                          key={status.value}
                          defaultValue={status.value}
                          onSelect={value => {
                            setOpen(false);
                            if (value.toLowerCase() === selectedStatus?.value.toLowerCase()) return;
                            setModal(true);
                            setPrevStatus(selectedStatus);
                            setSelectedStatus(statuses.find(priority => priority.value.toLowerCase() === value.toLowerCase()) || null);
                          }}
                        >
                          <span>{status.label}</span>
                        </CommandItem>
                      )
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      <Dialog modal open={modal} onOpenChange={setModal}>
        <DialogContent
          onPointerDownOutside={e => e.preventDefault()}
          onClose={() => {
            setModal(false);
            setOpen(false);
            setSelectedStatus(prevStatus);
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <span className="text-foreground">
                Are you sure you want to set the status to <span className="font-medium text-primary">{buttonOnly ? willChangeTo : selectedStatus?.label}</span>?
              </span>
            </DialogDescription>
          </DialogHeader>
          {!!inputs && inputs.length && applyInputs?.some(input => input === selectedStatus?.value) ? (
            <form onSubmit={onSubmit}>
              {inputs.map((input, index) => (
                <input.comp key={index} {...input.props} />
              ))}
              <DialogFooter>
                <Button
                  onClick={() => {
                    setModal(false);
                    setOpen(false);
                    onChange && onChange(selectedStatus?.value);
                  }}
                  type="submit"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <DialogFooter>
              <Button
                onClick={() => {
                  setModal(false);
                  setOpen(false);
                  onChange && onChange(selectedStatus?.value);
                }}
                type="submit"
              >
                Confirm
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
