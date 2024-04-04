import { Title } from '@/components/ui/title';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CustomCard } from '@/components/shared/customcard';
import { TicketIcon } from 'lucide-react';
import { TicketSlashIcon } from 'lucide-react';
import { TicketPlusIcon } from 'lucide-react';
import { TicketPercentIcon } from 'lucide-react';
import { TicketCheckIcon } from 'lucide-react';
import { FilterItem } from '@/components/shared/filterItem';
import NotFound from '../not-found';

export const statuses = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Open', value: 'Open' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Solved', value: 'Solved' },
  { label: 'Closed', value: 'Closed' },
];

export default function Layout({ children, params }) {
  const defaultStatus = statuses.find(item => item.value === params?.status)?.value;
  if (params && !defaultStatus) return <NotFound />;
  return (
    <div className="space-y-8 layer">
      <section>
        <div className="flex items-center gap-2 justify-between">
          <Title>Overview</Title>
          <FilterItem />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-4">
          <TooltipProvider>
            <CustomCard Icon={TicketIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Total Ticket</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Ticket</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={TicketSlashIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Pending Ticket</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Pending Ticket</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={TicketPlusIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Open Ticket</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Ticket</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={TicketPercentIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Processing Ticket</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Processing Ticket</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={TicketCheckIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Solved Ticket</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Solved Ticket</p>
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
