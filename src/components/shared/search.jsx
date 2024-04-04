'use client';

import * as React from 'react';
import { Settings, User } from 'lucide-react';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandSubItem } from '@/components/ui/command';
import { Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CircleDashed } from 'lucide-react';
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { Laptop2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '../providers/theme-provider';

export function Search({ open, setOpen, links }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  React.useEffect(() => {
    const down = e => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <CommandDialog className="bg-background/90 backdrop-blur" open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages"></CommandGroup>
        {links.map((item, index) => (
          <React.Fragment key={item.title + index}>
            {!!item.submenu?.length && <CommandSeparator />}
            <CommandItem
              value={item.title}
              onSelect={() => {
                setOpen(false);
                router.push(item.href);
              }}
              className="rounded-none"
            >
              <item.icon className="mr-2 !h-4 !w-4" />
              <span>{item.title}</span>
            </CommandItem>
            {item.submenu?.length && (
              <CommandGroup className="!pt-1 !px-0" heading={item.title}>
                {item.submenu.map((menu, index) => (
                  <CommandItem
                    key={menu.title + index}
                    value={menu.title + item.title}
                    onSelect={() => {
                      setOpen(false);
                      router.push(menu.href);
                    }}
                    className="rounded-none"
                  >
                    {menu.icon ? <menu.icon className="mr-2 !h-3.5 !w-3.5" /> : <CircleDashed className="mr-2 !h-3.5 !w-3.5" />}
                    <h1>{menu.title}</h1>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </React.Fragment>
        ))}
        <CommandSeparator />
        <CommandGroup className="!pt-1 !px-0" heading="Settings">
          <CommandItem>
            <User className="mr-2 !h-4 !w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 !h-4 !w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup className="!pt-1 !px-0" heading="Theme">
          <CommandItem
            onSelect={() => {
              setTheme('light');
              document.cookie = 'theme=light; path=/;';
              setOpen(false);
            }}
          >
            <Sun className="mr-2 !h-4 !w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('dark');
              document.cookie = 'theme=dark; path=/;';
              setOpen(false);
            }}
          >
            <Moon className="mr-2 !h-4 !w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme('system');
              document.cookie = `theme=${window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}; path=/;`;
              setOpen(false);
            }}
          >
            <Laptop2 className="mr-2 !h-4 !w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
