'use client';

import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SidebarCloseIcon } from 'lucide-react';
import { SidebarOpenIcon } from 'lucide-react';
import { getPanelElement } from 'react-resizable-panels';

export function Nav({ links, isCollapsed }) {
  const pathname = usePathname();
  const isCurrentPage = link => (pathname === '/' && link.href === '/') || (pathname !== '/' && link.href !== '/' && pathname.includes(link.href));
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                    }),
                    'h-9 w-9',
                    isCurrentPage(link) && 'bg-muted text-primary hover:text-primary'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link key={index} href={link.href} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), isCurrentPage(link) && 'bg-muted text-primary hover:text-primary', 'justify-start')}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && <span className={cn('ml-auto', (pathname === '/' && link.href === '/') || (isCurrentPage(link) && 'text-background dark:text-white'))}>{link.label}</span>}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}

export function Collapse({ isCollapsed, panel }) {
  const collapseSidebar = () => {
    panel.collapse();
  };
  const expandSidebar = () => {
    const panelElement = getPanelElement('sidebar');
    panel.expand();
    if (panelElement.offsetWidth <= 54) {
      panel.resize(25);
    }
  };
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 mt-auto">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={expandSidebar}
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white')}
              >
                <SidebarOpenIcon className="h-4 w-4" />
                <span className="sr-only">Expand</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Expand
            </TooltipContent>
          </Tooltip>
        ) : (
          <button onClick={collapseSidebar} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
            <SidebarCloseIcon className="mr-2 h-4 w-4" />
            Collapse
          </button>
        )}
      </nav>
    </div>
  );
}
