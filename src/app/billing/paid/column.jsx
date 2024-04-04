'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { format } from 'date-fns';
import { GlobeIcon } from 'lucide-react';
import { UnplugIcon } from 'lucide-react';
import { Timeline } from '@/components/shared/timeline';
import { Button } from '@/components/ui/button';
import { FileIcon } from 'lucide-react';
import { ChangeStatus } from '@/components/shared/change-status';
import { CheckIcon } from 'lucide-react';

export const columns = [
  {
    accessorKey: 'sl',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SL" />,
  },
  {
    accessorKey: 'invoiceNo',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice No." />,
  },
  {
    accessorKey: 'createDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Create Date" />,
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
  },
  {
    accessorKey: 'paidDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paid Date" />,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = row.getValue('amount');
      return <p className="text-primary font-semibold">{amount}</p>;
    },
  },
  {
    accessorKey: 'transactionNo',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction No." />,
    cell: ({ row }) => {
      return <p className="font-semibold">{row.getValue('transactionNo')}</p>;
    },
  },
  {
    accessorKey: 'gateway',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Gateway" />,
  },
  {
    accessorKey: 'invoiceDetails',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice" />,
    cell: ({ row }) => {
      return (
        <a href={row.getValue('invoiceDetails')} target="_blank" rel="noreferrer">
          <Button variant="link" size="sm">
            <FileIcon className="w-4 h-4 text-primary" />
            Download Invoice
          </Button>
        </a>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex items-center justify-end gap-1 font-semibold text-primary">
          <CheckIcon className="w-4 h-4" />
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
