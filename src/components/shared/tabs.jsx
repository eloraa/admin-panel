'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const TabsBase = ({ statuses, status, params, baseURL, showAll, className, usePathname: handleWithPathname }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = React.useState(
    params?.status ? params.status : showAll ? 'all' : handleWithPathname ? pathname.replace(baseURL + '/', '') : status ? status : statuses[0].value.toLowerCase().replace(' ', '-')
  );
  const handleTabChange = newValue => {
    setValue(newValue);
    if (newValue === 'all') {
      router.push('/leads');
    } else {
      router.push(baseURL + '/' + newValue);
    }
  };
  React.useEffect(() => {
    if (handleWithPathname) setValue(pathname.replace(baseURL + '/', ''));
  }, [pathname, handleWithPathname, baseURL]);
  return (
    <Tabs value={value} onValueChange={handleTabChange} className={cn('mt-4 max-md:w-full overflow-x-auto', className)}>
      <TabsList>
        {showAll && <TabsTrigger value="all">All</TabsTrigger>}
        {statuses.map((status, index) => (
          <TabsTrigger key={index} value={status.value.toLowerCase().replace(' ', '-')}>
            {status.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export { TabsBase as Tabs };
