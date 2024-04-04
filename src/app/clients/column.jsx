'use client';
import { AssignUser } from '@/components/shared/assign-user';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { LockIcon } from 'lucide-react';
import { TimerOffIcon } from 'lucide-react';
import { ShieldOffIcon } from 'lucide-react';
import { ShieldCheckIcon } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

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
    accessorKey: 'contactNo',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Contact No" />,
  },
  {
    accessorKey: 'orders',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Orders" />,
  },
  {
    accessorKey: 'joiningDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Joining Date" />,
  },
  {
    accessorKey: 'nextDueDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Next Due Date" />,
  },
  {
    accessorKey: 'paymentStatus',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Status" />,
  },
  {
    accessorKey: 'lastMonthPackage',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Month Package" />,
  },
  {
    accessorKey: 'currentPackage',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Current Package" />,
  },
  {
    accessorKey: 'kamName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="KAM" />,
    cell: ({ row }) => {
      const accounts = [
        {
          image: '/images/avatars/01.png',
          name: 'KAM 1',
          email: 'kam1@kam1.com',
        },
        {
          image: '/images/avatars/02.png',
          name: 'KAM 2',
          email: 'kam2@kam2.com',
        },
        {
          image: '/images/avatars/03.png',
          name: 'KAM 3',
          email: 'kam3@kam3.com',
        },
        {
          image: '/images/avatars/04.png',
          name: 'KAM 4',
          email: 'kam4@kam4.com',
        },
        {
          image: '/images/avatars/05.png',
          name: 'KAM 5',
          email: 'kam5@kam5.com',
        },
      ];
      return <AssignUser defaultValue={row.getValue('kamName')} accounts={accounts} />;
    },
  },
  {
    accessorKey: 'onboardingName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Onboarding" />,
    cell: ({ row }) => {
      const accounts = [
        {
          image: '/images/avatars/07.png',
          name: 'Onboarding 1',
          email: 'onboarding1@onboarding1.com',
        },
        {
          image: '/images/avatars/08.png',
          name: 'Onboarding 2',
          email: 'onboarding2@onboarding2.com',
        },
        {
          image: '/images/avatars/10.png',
          name: 'Onboarding 3',
          email: 'onboarding3@onboarding3.com',
        },
        {
          image: '/images/avatars/10.png',
          name: 'Onboarding 4',
          email: 'onboarding3@onboarding4.com',
        },
        {
          image: '/images/avatars/11.png',
          name: 'Onboarding 5',
          email: 'onboarding3@onboarding5.com',
        },
      ];
      return <AssignUser defaultValue={row.getValue('onboardingName')} accounts={accounts} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex justify-end">
          <h1 className="flex items-center gap-2 text-sm">
            {status.toLowerCase() === 'active' && <ShieldCheckIcon className="w-5 h-5 text-primary" />}
            {status.toLowerCase() === 'inactive' && <ShieldOffIcon className="w-5 h-5 text-destructive" />}
            {status.toLowerCase() === 'expired' && <TimerOffIcon className="w-5 h-5 text-orange-600" />}
            {status.toLowerCase() === 'locked' && <LockIcon className="w-5 h-5 text-rose-600" />}
            {row.getValue('status')}
          </h1>
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
