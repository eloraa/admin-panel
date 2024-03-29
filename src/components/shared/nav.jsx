'use client';

import Link from 'next/link';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { SidebarCloseIcon } from 'lucide-react';
import { SidebarOpenIcon } from 'lucide-react';
import { getPanelElement } from 'react-resizable-panels';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CircleDashedIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const SidebarLink = ({ link, index, pathname, isCurrentPage, isCollapsed }) => {
  const [show, setShow] = React.useState(false);
  const optionsRef = React.useRef(null);

  return (
    <>
      <Link key={index} href={link.href} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), isCurrentPage(link) && 'bg-muted text-primary hover:text-primary', 'justify-start')}>
        <link.icon className="mr-2 h-4 w-4" />
        {link.title}
        {link.label && <span className={cn('ml-auto', (pathname === '/' && link.href === '/') || (isCurrentPage(link) && 'text-background dark:text-white'))}>{link.label}</span>}
        {link.submenu && link.submenu.length && (
          <Button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setShow(!show);
            }}
            variant="ghost"
            size="icon"
            className="ml-auto h-6 w-6 hover:bg-[#ddd]"
          >
            <ChevronRight className={cn('h-4 w-4 transition-transform', show && 'rotate-90')} />
          </Button>
        )}
      </Link>
      {!isCollapsed && (
        <div data-collapsed={show} className="group flex flex-col gap-4 py-0 data-[collapsed=true]:py-2 transition-all duration-300 ease-in-out ml-5 border-l">
          <nav
            ref={optionsRef}
            className="grid gap-1 px-0.5 overflow-hidden group-[[data-collapsed=true]]:h-0 transition-all duration-300 ease-in-out"
            style={{ height: !show ? '0' : optionsRef.current?.scrollHeight ? optionsRef.current?.scrollHeight : 'auto' }}
          >
            {link.submenu?.map((submenu, index) => (
              <Link key={index} href={submenu.href} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                {submenu.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export function Nav({ links, isCollapsed }) {
  const pathname = usePathname();
  const isCurrentPage = link =>
    (pathname === '/' && link.href === '/') || (((pathname !== '/' && link.href !== '/') || (link.alias && link.alias !== '/')) && (pathname.includes(link.href) || pathname.includes(link.alias)));
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Popover key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    {link.submenu && link.submenu.length ? (
                      <button
                        href={link.href}
                        aria-label={link.title}
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
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        aria-label={link.title}
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
                    )}
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
              {link.submenu && link.submenu.length && (
                <PopoverContent className="p-1 bg-background/80 backdrop-blur" side="right">
                  <div className="group flex flex-col gap-4">
                    <nav className="grid gap-1 overflow-hidden">
                      <Link
                        href={link.href}
                        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start', isCurrentPage({ ...link, alias: null }) && 'bg-muted text-primary hover:text-primary')}
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.title}
                      </Link>
                      {link.submenu.map((submenu, index) => (
                        <Link
                          key={index}
                          href={submenu.href}
                          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start', isCurrentPage(submenu) && 'bg-muted text-primary hover:text-primary')}
                        >
                          <CircleDashedIcon className="mr-2 h-4 w-4" />
                          {submenu.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </PopoverContent>
              )}
            </Popover>
          ) : (
            <SidebarLink key={index} link={link} pathname={pathname} isCurrentPage={isCurrentPage} isCollapsed={isCollapsed} />
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
