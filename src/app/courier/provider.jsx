'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LightbulbIcon } from 'lucide-react';
import { CircleDotDashedIcon } from 'lucide-react';
import { CircleCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { ChangeValue } from '@/components/shared/change-value';
import { CustomCard } from '@/components/shared/customcard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MailIcon } from 'lucide-react';
import { Asterisk } from 'lucide-react';
import { CopyText } from '@/components/shared/copy-text';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckIcon } from 'lucide-react';
export const Provider = ({ email, password, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prevValue, setPrevValue] = useState({ email, password });
  const [value, setValue] = useState({ email, password });
  const [modal, setModal] = useState(false);
  return (
    <>
      <Card className="max-h-fit h-fit">
        <CardHeader className="flex items-center justify-between text-sm">
          <h1 className="font-medium">{label}</h1>
          {isEditing ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded px-3 text-xs h-8 gap-1"
              onClick={() => {
                setValue(prevValue);
                setIsEditing(false);
              }}
            >
              Discard
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="rounded px-3 text-xs h-8 gap-1" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center relative gap-1 w-full overflow-hidden">
              <MailIcon className="w-[18px] h-[18px] absolute left-2" />
              {isEditing ? (
                <Input
                  className="w-full pl-8 rounded min-w-0"
                  id="email"
                  type="email"
                  value={value.email}
                  onChange={e => setValue({ ...value, email: e.target.value })}
                  placeholder="m@example.com"
                  required
                />
              ) : (
                <p className="flex h-10 pl-8 w-full rounded border items-center font-semibold px-3 py-2 text-sm min-w-0 overflow-x-auto overflow-y-hidden truncate">{email}</p>
              )}
              {!isEditing && <CopyText text={email} className="dark:bg-muted rounded min-w-10" />}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center relative gap-1">
              <Asterisk className="w-[18px] h-[18px] absolute left-2" />
              {isEditing ? (
                <Input
                  className="w-full pl-8 rounded"
                  id="password"
                  type="text"
                  value={value.password}
                  onChange={e => setValue({ ...value, password: e.target.value })}
                  placeholder="********"
                  required
                />
              ) : (
                <p className="flex h-10 pl-8 w-full rounded border items-center font-semibold px-3 py-2 text-sm">{password}</p>
              )}
              {!isEditing && <CopyText text={password} className="dark:bg-muted rounded min-w-10" />}
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter>
            <Button className="w-full dark:bg-muted" onClick={() => setModal(true)}>
              Save
            </Button>
          </CardFooter>
        )}
      </Card>
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
            You want to change the credentials to (Email: <span className="font-semibold bg-indigo-50 dark:bg-muted dark:text-indigo-100 text-primary">{value.email}</span> Password:{' '}
            <span className="font-semibold bg-indigo-50 dark:bg-muted dark:text-indigo-100 text-primary">{value.password})</span>. This action cannot be undone
          </p>
          <DialogFooter className="bg-none pt-0">
            <Button
              onClick={() => {
                setModal(false);
                setIsEditing(false);
                setPrevValue(value);
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
