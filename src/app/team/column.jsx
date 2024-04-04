'use client';

import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { ShieldCheckIcon } from 'lucide-react';
import { ShieldOffIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';
import { Action } from './action';

export const columns = [
  {
    accessorKey: 'sl',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SL" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone Number" />,
  },
  {
    accessorKey: 'emailAddress',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email Address" />,
  },
  {
    accessorKey: 'employeeId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'joiningDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joining Date" />,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
  },
  {
    accessorKey: 'activated',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const activated = row.getValue('activated');
      return (
        <div className="flex items-center gap-1 font-semibold text-primary">
          {activated === 'true' ? (
            <>
              <ShieldCheckIcon className="w-4 h-4" />
              Active
            </>
          ) : (
            <>
              <ShieldOffIcon className="w-4 h-4 text-destructive" />
              <span className="text-destructive">Inactive</span>
            </>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.some(v => {
        if (v === 'active') {
          return row.getValue(id) === 'true';
        } else {
          return row.getValue(id) !== 'true';
        }
      });
    },
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Action" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1 font-semibold text-primary">
          <Action data={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
];
