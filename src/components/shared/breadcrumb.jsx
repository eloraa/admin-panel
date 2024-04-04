'use client';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SlashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { SquareChevronLeft } from 'lucide-react';
import { EllipsisVerticalIcon } from 'lucide-react';
import { AccountSwitcher } from './account-swicher';
import { cn } from '@/lib/utils';

export const HeaderBreadcrumb = ({ setNavOpen, accounts }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const dropdownItems = segments.slice(0, -2);
  const visibleItems = segments.slice(-2);
  return (
    <div className={cn('flex items-center justify-between gap-2 py-4 border-b max-md:flex-col max-md:items-start layer', accounts && 'py-[6px]')}>
      <div className="flex items-center gap-2">
        <Button onClick={() => setNavOpen(true)} size="icon" variant="ghost" className="w-8 h-8 md:hidden">
          <EllipsisVerticalIcon className="w-[18px] h-[18px]" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {dropdownItems.length > 0 && (
              <>
                <BreadcrumbSeparator>
                  <SlashIcon className="rotate-[160deg]" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      {dropdownItems.map((segment, index) => (
                        <DropdownMenuItem key={index}>
                          <BreadcrumbLink href={`/${segments.slice(0, index + 1).join('/')}`} className="capitalize">
                            {segment}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator>
              <SlashIcon className="rotate-[160deg]" />
            </BreadcrumbSeparator>
            {visibleItems.slice(0, -1).map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${segments.slice(0, segments.length - 3 + index + 2).join('/')}`} className="capitalize">
                    {segment}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon className="rotate-[160deg]" />
                </BreadcrumbSeparator>
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{visibleItems.slice(-1)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {accounts && accounts.length && <AccountSwitcher accounts={accounts} className="w-full md:w-auto" />}
    </div>
  );
};
