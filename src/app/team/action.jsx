import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddUser } from './add-user';
import { MoreHorizontalIcon } from 'lucide-react';
import { ShieldMinusIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Action = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontalIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>{data?.activated === 'true' ? <span className="text-red-600">Deactivate</span> : <span className="text-green-600">Activate</span>}</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent onPointerDownOutside={e => e.preventDefault()} className="sm:max-w-md">
            <DialogHeader className="flex flex-col items-center">
              <div className={cn('bg-primary p-2 rounded-full w-16 h-16 flex items-center justify-center text-primary-foreground mb-2', data?.activated === 'true' && 'bg-red-600')}>
                {data?.activated !== 'true' ? <CheckIcon /> : <ShieldMinusIcon />}
              </div>
              <DialogTitle className="bg-none text-center pb-0">Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <p className="text-center">
              Are you sure you want to {data?.activated === 'true' ? 'deactivate' : 'activate'} this user{' '}
              <span className={cn('font-semibold bg-indigo-50 dark:bg-muted text-primary', data?.activated === 'true' && 'bg-red-50 dark:text-red-100 text-red-500')}>
                {data.name} ({data.emailAddress})
              </span>
              ?
            </p>
            <DialogFooter className="bg-none pt-0">
              <Button type="submit" className={cn('w-full', data?.activated === 'true' && 'bg-red-600')}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <AddUser defaultValue={data} open={open} setOpen={setOpen} />
    </>
  );
};
