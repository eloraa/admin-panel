'use client';

import { AccountSwitcher } from '@/components/shared/account-swicher';
import { ChangeStatus } from '@/components/shared/change-status';
import { Labels } from '@/components/shared/labels';
import { Timeline } from '@/components/shared/timeline';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { format } from 'date-fns';
import { ShieldCheckIcon } from 'lucide-react';
import { ShieldOffIcon } from 'lucide-react';
import { statuses } from './_layout';
import { ArrowUp } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircleCheckIcon } from 'lucide-react';
import { XIcon } from 'lucide-react';
import { Action } from './action';

export const columns = [
  {
    accessorKey: 'sl',
    header: ({ column }) => <DataTableColumnHeader column={column} title="SL" />,
  },
  {
    accessorKey: 'clientName',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Client Name" />,
  },
  {
    accessorKey: 'ticketNo',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ticket No" />,
  },
  {
    accessorKey: 'subjectForTicket',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Subject" />,
    cell: ({ row }) => {
      const subject = row.getValue('subjectForTicket');
      return (
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <p className="truncate max-w-40">{subject}</p>
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p>{subject}</p>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: 'labels',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Labels" />,
    cell: ({ row }) => {
      const labels = row.getValue('labels');
      return <Labels labels={labels} />;
    },
    filterFn: (row, id, value) => {
      return value.some(val => {
        return row.getValue(id).some(obj => obj.title === val);
      });
    },
  },
  {
    accessorKey: 'submissionTime',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date & Time" />,
    cell: ({ row }) => {
      const time = row.getValue('submissionTime');
      if (!time) return null;
      return <div className="truncate">{format(time, 'PPPp')}</div>;
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Assignee" />,
    cell: ({ row }) => {
      const assignee = row.getValue('assignee');
      const status = row.getValue('status');

      if (!assignee) return null;
      return status !== 'Solved' && status !== 'Closed' ? (
        <AccountSwitcher
          accounts={[
            {
              image: '/images/avatars/01.png',
              label: 'CS 1',
              email: 'cs1@cs1.com',
            },
            {
              image: '/images/avatars/02.png',
              label: 'CS 2',
              email: 'cs2@cs2.com',
            },
            {
              image: '/images/avatars/03.png',
              label: 'CS 3',
              email: 'cs3@cs3.com',
            },
            {
              image: '/images/avatars/04.png',
              label: assignee,
              email: `${assignee}@${assignee}mail.com`,
            },
            {
              image: '/images/avatars/04.png',
              label: 'CS 4',
              email: 'cs4@cs4.com',
            },
          ]}
          className="bg-transparent border-none px-0 rounded-none w-auto py-1 h-auto"
          showConfirmation
          defaultValue={assignee + '@' + assignee + 'mail.com'}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/images/avatars/04.png" />
            <AvatarFallback>{assignee[0]}</AvatarFallback>
          </Avatar>
          <h1>{assignee}</h1>
        </div>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = row.getValue('priority');
      if (!priority) return null;

      return (
        <div className="flex items-center">
          {priority.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          {!priority.icon && priority === 'High' && <ArrowUp className="mr-2 h-4 w-4 text-destructive" />}
          {!priority.icon && priority === 'Medium' && <ArrowRight className="mr-2 h-4 w-4 text-orange-600" />}
          {!priority.icon && priority === 'Low' && <ArrowDown className="mr-2 h-4 w-4 text-primary" />}
          <span>{priority.label ? priority.label : priority}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'timeline',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Timeline" />,
    cell: ({ row }) => {
      const timeline = row.getValue('timeline');
      return <Timeline timeline={timeline} />;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue('status');
      if (status === 'Closed' || status === 'Solved')
        return status === 'Solved' ? (
          <div className="flex items-center gap-1 px-3 border py-2 rounded-md bg-primary/10 dark:bg-primary/5 text-primary">
            <CircleCheckIcon className="w-4 h-4" />
            {status}
          </div>
        ) : (
          <div className="flex items-center gap-1 px-4 border py-2 rounded-md bg-red-500/10 dark:bg-red-500/5 text-destructive dark:text-red-500">
            <XIcon className="w-4 h-4" />
            {status}
          </div>
        );
      const filteredStatuses = statuses.slice(statuses.findIndex(s => s.value === status));
      return <ChangeStatus statuses={filteredStatuses} status={status} />;
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <DataTableColumnHeader className="text-right justify-end" column={column} title="Action" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end">
          <Action data={row.original} />
        </div>
      );
    },
    enableSorting: false,
  },
];
