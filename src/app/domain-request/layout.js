import { CustomCard } from '@/components/shared/customcard';
import { FilterItem } from '@/components/shared/filterItem';
import { Title } from '@/components/ui/title';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ShieldOffIcon } from 'lucide-react';
import { UnplugIcon } from 'lucide-react';
import { ShieldCheckIcon } from 'lucide-react';
import { BanIcon } from 'lucide-react';
import { CircleStopIcon } from 'lucide-react';
import { GlobeLockIcon } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="space-y-8 layer">
      <section>
        <div className="flex items-center gap-2">
          <Title>Overview</Title>
          <FilterItem />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-4">
          <TooltipProvider>
            <CustomCard Icon={GlobeLockIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Total Request</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Request</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={CircleStopIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Pending</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pending</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={UnplugIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Connected</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connected</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={BanIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Rejected</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rejected</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
          </TooltipProvider>
        </div>
      </section>

      <section>
        <Title>Domain Request</Title>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-4">
          <TooltipProvider>
            <CustomCard Icon={ShieldCheckIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Active</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Active</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={ShieldOffIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Inactive</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inactive</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
          </TooltipProvider>
        </div>
      </section>

      {children}
    </div>
  );
}
