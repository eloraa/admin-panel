'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { format } from 'date-fns';
import { GlobeIcon } from 'lucide-react';
import { UnplugIcon } from 'lucide-react';
import { Timeline } from '@/components/shared/timeline';

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
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex items-center justify-end gap-1">
          <UnplugIcon className="w-5 h-5 text-primary" />
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
