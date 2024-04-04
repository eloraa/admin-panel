'use client';

import { ChangeStatus } from '@/components/shared/change-status';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { statuses } from './page';
import { format } from 'date-fns';
import { ChangeValue } from '@/components/shared/change-value';
import { GlobeIcon } from 'lucide-react';
import { UnplugIcon } from 'lucide-react';
import { Timeline } from '@/components/shared/timeline';
import { Ban } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export const columns = [
  {
    accessorKey: 'sl',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SL" />,
  },
  {
    accessorKey: 'shopId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Shop ID" />,
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company Name" />,
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Client Name" />,
  },
  {
    accessorKey: 'requestDateAndTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Request Date & Time" />,
    cell: ({ row }) => {
      const date = row.getValue('requestDateAndTime');
      return format(date, 'PPPp');
    },
  },
  {
    accessorKey: 'domain',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Domain" />,
    cell: ({ row }) => {
      const domain = row.getValue('domain');
      return (
        <div className="flex items-center gap-1">
          <GlobeIcon className="w-4 h-4 text-primary" />
          {domain}
        </div>
      );
    },
  },
  {
    accessorKey: 'timeline',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Timeline" />,
    cell: ({ row }) => {
      return <Timeline timeline={row.getValue('timeline')} />;
    },
  },
  {
    accessorKey: 'reason',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Reason" />,
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="truncate max-w-40">{row.getValue('reason')}</p>
          </HoverCardTrigger>
          <HoverCardContent>
            <p>{row.getValue('reason')}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex items-center justify-end gap-1">
          <Ban className="w-4 h-4 text-destructive" />
          {status}
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
