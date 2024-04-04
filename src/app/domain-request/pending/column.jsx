'use client';

import { ChangeStatus } from '@/components/shared/change-status';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { statuses } from './page';
import { format } from 'date-fns';
import { ChangeValue } from '@/components/shared/change-value';
import { Input } from '@/components/ui/input';

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
      return <ChangeValue defaultValue={domain} className="w-48" />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex justify-end">
          <ChangeStatus
            status={status}
            statuses={statuses}
            inputs={[
              {
                comp: Input,
                props: {
                  name: 'Note',
                  placeholder: 'Enter Note',
                  className: 'w-full',
                },
              },
            ]}
            applyInputs={[statuses[2].value]}
          />
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
