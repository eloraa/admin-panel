import { CustomCard } from '@/components/shared/customcard';
import { FilterItem } from '@/components/shared/filterItem';
import { Title } from '@/components/ui/title';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { MailsIcon } from 'lucide-react';
import { CircleStopIcon } from 'lucide-react';
import { MessageSquareOffIcon } from 'lucide-react';
import { FlagOffIcon } from 'lucide-react';
import { LandPlotIcon } from 'lucide-react';
import { BarChartBigIcon } from 'lucide-react';
import { HandshakeIcon } from 'lucide-react';
import { HammerIcon } from 'lucide-react';
import { ConstructionIcon } from 'lucide-react';
import NotFound from '../not-found';

export const statuses = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Not Response',
    label: 'Not Response',
  },
  {
    value: 'Not Qualified',
    label: 'Not Qualified',
  },
  {
    value: 'Follow Up',
    label: 'Follow Up',
  },
  {
    value: 'Sold',
    label: 'Sold',
  },
  {
    value: 'Lost',
    label: 'Lost',
  },
];

export default function Layout({ children, params }) {
  console.log(params);
  if (params && !statuses.some(status => status.value.toLowerCase().replace(' ', '-') === params.status)) return <NotFound />;
  return (
    <div className="space-y-8 layer">
      <section>
        <div className="flex items-center gap-2 justify-between">
          <Title>Overview</Title>
          <FilterItem />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mt-4">
          <TooltipProvider>
            <CustomCard Icon={MailsIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Total Leads</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Leads</p>
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

            <CustomCard Icon={MessageSquareOffIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Not Response</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Not Response</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>

            <CustomCard Icon={FlagOffIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Not Qualified</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Not Qualified</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>

            <CustomCard Icon={HandshakeIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Follow Up</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow Up</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>

            <CustomCard Icon={HammerIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Sold</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sold</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={ConstructionIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Lost</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lost</p>
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
