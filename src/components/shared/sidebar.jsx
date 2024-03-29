'use client';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Collapse, Nav } from '@/components/shared/nav';
import { cn } from '@/lib/utils';
import { LayoutDashboardIcon } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { XIcon } from 'lucide-react';
import { getPanelElement, getResizeHandleElement } from 'react-resizable-panels';
import { Avatar } from '../ui/avatar';
import { ChevronDown } from 'lucide-react';
import { SidebarCloseIcon } from 'lucide-react';
import { UsersIcon } from 'lucide-react';
import { SettingsIcon } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import { Kbd } from '../ui/kbd';
import { ChevronUpIcon } from 'lucide-react';
import { ChevronDownIcon } from 'lucide-react';
import { Search } from './search';
import { ThemeToggler } from '../ui/theme-toggler';
import { ThemeProvider } from '../providers/theme-provider';
import { HeaderBreadcrumb } from './breadcrumb';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { SquareDashedMousePointerIcon } from 'lucide-react';
import { CreditCardIcon } from 'lucide-react';
import { SquareMousePointerIcon } from 'lucide-react';
import { TicketIcon } from 'lucide-react';
import { BriefcaseIcon } from 'lucide-react';
import { GlobeIcon } from 'lucide-react';
import { TruckIcon } from 'lucide-react';

export const Sidebar = ({ defaultLayout = [25, 75], defaultCollapsed = false, defaultShowOptions = true, children }) => {
  const navCollapsedSize = 5;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [panel, setPanel] = React.useState(null);
  const [navOpen, setNavOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(defaultShowOptions);
  const [increasing, setIncreasing] = React.useState(false);
  const panelRef = React.useRef(null);
  const sizeRef = React.useRef(defaultLayout[0]);
  const optionsRef = React.useRef(null);

  React.useEffect(() => {
    if (panelRef.current) {
      setPanel(panelRef.current);
    }
  }, [isCollapsed]);

  const links = [
    {
      title: 'Dashboard',
      href: '/',
      alias: '/dashboard',
      icon: LayoutDashboardIcon,
      submenu: [
        {
          title: 'KAM',
          href: '/dashboard/kam',
        },
        {
          title: 'Onboarding',
          href: '/dashboard/onboarding',
        },
      ],
    },
    {
      title: 'Clients',
      href: '/clients',
      icon: BriefcaseIcon,
    },
    {
      title: 'Leads',
      href: '/leads',
      icon: SquareMousePointerIcon,
    },
    {
      title: 'Billing',
      href: '/billing',
      icon: CreditCardIcon,
    },
    {
      title: 'Support Tickets',
      href: '/support',
      icon: TicketIcon,
    },
    {
      title: 'Team Members',
      href: '/team',
      icon: UsersIcon,
    },
    {
      title: 'Domain Requests',
      href: '/domains',
      icon: GlobeIcon,
    },
    {
      title: 'Courier Info',
      href: '/courier',
      icon: TruckIcon,
    },
  ];

  const [dragging, setDragging] = React.useState(false);
  React.useLayoutEffect(() => {
    const resizeHandleElement = getResizeHandleElement('sidebar-handle');
    const panelElement = getPanelElement('sidebar');
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-resize-handle-state') {
          const state = mutation.target.getAttribute('data-resize-handle-state');
          if (state === 'drag') {
            setDragging(true);
          }
          if (state !== 'drag' && dragging && panel && panelElement?.offsetWidth <= 150) {
            increasing ? panel.resize(15) : panel.collapse();
            setDragging(false);
          }
        }
      }
    });
    if (resizeHandleElement) {
      observer.observe(resizeHandleElement, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [panel, dragging, increasing]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={sizes => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;

          const currentSize = sizes[0];
          const prevSize = sizeRef.current;

          if (prevSize !== null) {
            if (currentSize > prevSize) {
              setIncreasing(true);
            } else if (currentSize < prevSize) {
              setIncreasing(false);
            }
          }

          sizeRef.current = currentSize;
        }}
        className="h-full items-stretch w-full"
      >
        <ResizablePanel
          id="sidebar"
          ref={panelRef}
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={5}
          maxSize={25}
          onCollapse={() => {
            setIsCollapsed(true);
            setShowOptions(true);
            document.cookie = `options:collapsed=${JSON.stringify(true)}`;
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(
            'flex flex-col max-w-[272px] max-md:absolute z-30 max-md:top-0 max-md:left-0 max-md:h-full max-md:border-r max-md:bg-background/90 transition-transform ease-in-out duration-300',
            isCollapsed && 'min-w-[50px] max-w-[50px] transition-all duration-300 ease-in-out',
            navOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
          )}
        >
          <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-1 data-[collapsed=true]:py-2 md:hidden">
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              {isCollapsed ? (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setNavOpen(false)}
                      className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white')}
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Hide</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-4">
                    Hide
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button onClick={() => setNavOpen(false)} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                  <XIcon className="mr-2 h-4 w-4" />
                  Hide
                </button>
              )}
            </nav>
          </div>

          <Separator className="md:hidden" />
          <div className={cn('flex items-center w-full gap-1.5 pt-4', isCollapsed ? 'h-[52px] justify-center pt-0' : 'px-3', !showOptions && 'pb-3')}>
            <Popover>
              <PopoverTrigger>
                <Avatar className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-indigo-500 text-white" src="/logo.png">
                  E
                </Avatar>
              </PopoverTrigger>
              {isCollapsed && (
                <PopoverContent className="mt-2 px-0 pb-2" side="right">
                  <div className="min-w-0 px-3">
                    <h1 className="text-sm font-medium">Elora</h1>
                    <p className="text-xs text-muted-foreground truncate">wandering-cloud</p>
                  </div>
                  <div className="group flex flex-col gap-4 py-2 border-t mt-3 pb-0">
                    <nav className="grid gap-1 overflow-hidden">
                      <button onClick={() => setSearchOpen(true)} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                        <SearchIcon className="mr-2 h-4 w-4" />
                        Search
                        <div className="flex items-center gap-1 ml-auto">
                          <Kbd>Ctrl</Kbd>
                          <Kbd>K</Kbd>
                        </div>
                      </button>
                      <div className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-between')}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                          <ThemeToggler />
                          <Search open={searchOpen} setOpen={setSearchOpen} links={links} />
                        </ThemeProvider>
                      </div>
                      <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                      </button>
                      <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        Setting
                      </button>
                    </nav>
                  </div>
                </PopoverContent>
              )}
            </Popover>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-sm font-medium">Elora</h1>
                <p className="text-xs text-muted-foreground truncate">wandering-cloud</p>
              </div>
            )}
            {!isCollapsed && (
              <Button
                onClick={() => {
                  setShowOptions(!showOptions);
                  document.cookie = `options:collapsed=${JSON.stringify(!showOptions)}`;
                }}
                className="ml-auto"
                variant="ghost"
                size="icon"
              >
                {showOptions ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronUpIcon className="h-4 w-4" />}
              </Button>
            )}
          </div>

          {!isCollapsed && (
            <div data-collapsed={showOptions} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
              <nav
                ref={optionsRef}
                className="grid gap-1 px-2 overflow-hidden group-[[data-collapsed=true]]:h-0 transition-[height] duration-300 ease-in-out"
                style={{ height: showOptions ? '0' : optionsRef.current?.scrollHeight ? optionsRef.current?.scrollHeight : 'auto' }}
              >
                <button onClick={() => setSearchOpen(true)} className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                  <div className="flex items-center gap-1 ml-auto">
                    <Kbd>Ctrl</Kbd>
                    <Kbd>K</Kbd>
                  </div>
                </button>
                <div className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-between')}>
                  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ThemeToggler />
                    <Search open={searchOpen} setOpen={setSearchOpen} links={links} />
                  </ThemeProvider>
                </div>
                <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </button>
                <button className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Setting
                </button>
              </nav>
            </div>
          )}

          <Separator />

          <Nav isCollapsed={isCollapsed} links={links} />
          {panel && <Collapse panel={panel} isCollapsed={isCollapsed} />}
        </ResizablePanel>
        <ResizableHandle id="sidebar-handle" withHandle className="max-md:hidden" />

        <ResizablePanel defaultSize={defaultLayout[1]}>
          <HeaderBreadcrumb setNavOpen={setNavOpen} />
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
