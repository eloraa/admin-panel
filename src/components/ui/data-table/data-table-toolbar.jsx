'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { X } from 'lucide-react';
import { DataTableFacetedFilter } from './data-filter';
import { DateRange } from '@/components/component/filter-date-range';

const filter = [
  {
    label: 'Today',
    value: 'today',
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
  },
  {
    label: 'Last 7 Days',
    value: 'last7Days',
  },
  {
    label: 'This Month',
    value: 'thisMonth',
  },
  {
    label: 'Lifetime',
    value: 'lifetime',
  },
  {
    label: 'Custom Range',
    value: 'custom',
  },
];

export const courierProvider = [
  {
    label: 'Pathao',
    value: 'Pathao',
  },
  {
    label: 'Steadfast',
    value: 'Steadfast',
  },
  {
    label: 'RedX',
    value: 'RedX',
  },
];

export function DataTableToolbar({ table, statuses = [], placeholder, id, disableFilter, disableCourierProvider, dateFilter } = {}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 max-md:flex-col">
      <div className="flex max-md:flex-col flex-1 items-center space-x-2 max-md:space-y-2">
        <Input
          placeholder={placeholder}
          value={table.getColumn(id)?.getFilterValue() ?? ''}
          onChange={event => table.getColumn(id)?.setFilterValue(event.target.value)}
          className="h-8 max-md:w-full w-[150px] lg:w-[250px]"
        />
        {!disableFilter && table.getColumn('status') && <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={statuses} />}

        {!disableCourierProvider && table.getColumn('courier_provider') && (
          <DataTableFacetedFilter column={table.getColumn('courier_provider')} title="Courier Provider" options={courierProvider} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 max-md:w-full px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        {dateFilter && <DateRange className="m-0 w-36 [&>*]:h-8" filter={filter}></DateRange>}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
