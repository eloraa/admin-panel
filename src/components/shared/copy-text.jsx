'use client';
import { useState } from 'react';
import { copyToClipboard } from '@/lib';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { CopyIcon } from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { CheckCheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CopyText = ({ text, children, className }) => {
  const [isCopying, setIsCopying] = useState(false);
  const [timeout, setTimoutFunc] = useState(null);
  const handleCopy = text => {
    if (timeout) {
      clearTimeout(timeout);
    }
    copyToClipboard(text);
    setIsCopying(true);
    setTimoutFunc(
      setTimeout(() => {
        setIsCopying(false);
      }, 2000)
    );
  };
  return (
    <Tooltip delayDuration="100">
      <TooltipTrigger onClick={() => handleCopy(text)} asChild>
        {children ? (
          children
        ) : (
          <Button size="icon" className={('relative flex items-center justify-center', className)}>
            <CopyIcon className={cn('w-4 h-4 transition-opacity', isCopying && 'opacity-0')} />
            <CheckCheckIcon className={cn('w-4 h-4 absolute transition-opacity', !isCopying && 'opacity-0')} />
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white rounded font-medium text-xs py-1 px-2">{isCopying ? 'Copied!' : 'Click to copy'}</TooltipContent>
    </Tooltip>
  );
};
