'use client';

import { LaptopIcon } from 'lucide-react';
import { MoonIcon } from 'lucide-react';
import { SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = theme => {
    setTheme(theme);
    document.cookie = `theme=${theme === 'system' ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme}; path=/;`;
  };

  return (
    <>
      <div className="flex items-center">
        {theme === 'light' ? <SunIcon className="mr-2 h-4 w-4" /> : theme === 'system' ? <LaptopIcon className="mr-2 h-4 w-4" /> : <MoonIcon className="mr-2 h-4 w-4" />}
        Theme
      </div>
      <label htmlFor="theme-toggle" data-version="v1">
        <div className="relative flex items-center">
          <select
            onChange={e => toggleTheme(e.target.value)}
            aria-invalid="false"
            value={theme}
            className="px-6 pl-2 border h-6 text-xs appearance-none bg-muted rounded"
            aria-label="Change color theme"
          >
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <span className="inline-flex absolute right-1 transition-colors text-muted-foreground  hover:text-black dark:hover:text-white">
            <svg
              className="w-3 h-3"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517"></path>
            </svg>
          </span>
        </div>
      </label>
    </>
  );
};
