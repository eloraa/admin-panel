'use client';
import { ChangeStatus } from '@/components/shared/change-status';
import { Notes } from '@/components/shared/note';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { statuses } from './_layout';

export const columns2 = [
  {
    accessorKey: 'sl',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SL" />,
  },
  {
    accessorKey: 'dateTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date & Time" />,
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
    accessorKey: 'notes',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    cell: ({ row }) => {
      const notes = row.getValue('notes');
      return <Notes notes={notes} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex items-center justify-end">
          <ChangeStatus status={status} statuses={statuses} />
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
