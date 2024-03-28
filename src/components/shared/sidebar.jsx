'use client';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Collapse, Nav } from '@/components/shared/nav';
import { cn } from '@/lib/utils';
import { LayoutDashboardIcon } from 'lucide-react';
import { UserIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { XIcon } from 'lucide-react';
import { getPanelElement, getResizeHandleElement } from 'react-resizable-panels';

export const Sidebar = ({ defaultLayout = [25, 75], defaultCollapsed = false, children }) => {
  const navCollapsedSize = 5;
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [panel, setPanel] = React.useState(null);
  const [navOpen, setNavOpen] = React.useState(true);
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    if (panelRef.current) {
      setPanel(panelRef.current);
    }
  }, [isCollapsed]);

  const links = [
    {
      title: 'Dashboard',
      href: '/',
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
      icon: UserIcon,
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
          if (state !== 'drag' && panel && panelElement?.offsetWidth <= 130) {
            panel.collapse();
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
  }, [panel]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={sizes => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
        className="h-full items-stretch"
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
            localStorage.setItem('sidebar-collapsed', 'true');
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(
            'flex flex-col max-w-[272px] max-md:absolute max-md:top-0 max-md:left-0 max-md:h-full max-md:border-r max-md:bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform ease-in-out duration-300',
            isCollapsed && 'min-w-[50px] max-w-[60px] transition-all duration-300 ease-in-out',
            navOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'
          )}
        >
          {/* <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div> */}

          <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 md:hidden">
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
                <button
                  onClick={() => setNavOpen(false)}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white', 'justify-start')}
                >
                  <XIcon className="mr-2 h-4 w-4" />
                  Hide
                </button>
              )}
            </nav>
          </div>

          <Separator className="md:hidden" />
          <Nav isCollapsed={isCollapsed} links={links} />
          {panel && <Collapse panel={panel} isCollapsed={isCollapsed} />}
        </ResizablePanel>
        <ResizableHandle id="sidebar-handle" withHandle className="max-md:hidden" />

        <ResizablePanel defaultSize={defaultLayout[1]}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};
