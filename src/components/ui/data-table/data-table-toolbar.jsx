'use client';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-filter';
import { FilterItem } from '@/components/shared/filterItem';
import { Button } from '../button';
import { XIcon } from 'lucide-react';

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

export function DataTableToolbar({ table, statuses = [], filterWith, defaultStatus, placeholder, id, disableFilter, dateFilter, customFilter } = {}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 max-md:flex-col">
      <div className="flex max-md:flex-col flex-wrap flex-1 items-center gap-2 max-md:space-y-2">
        <Input
          placeholder={placeholder}
          value={table.getColumn(id)?.getFilterValue() ?? ''}
          onChange={event => table.getColumn(id)?.setFilterValue(event.target.value)}
          className="h-8 max-md:w-full w-[150px] lg:w-[250px]"
        />
        {!false && table.getColumn('status') && <DataTableFacetedFilter defaultValue={defaultStatus} column={table.getColumn('status')} title="Status" options={statuses} />}

        {typeof filterWith === 'string' && table.getColumn(filterWith) && (
          <DataTableFacetedFilter defaultValue={defaultStatus} column={table.getColumn(filterWith)} title={filterWith} options={statuses} />
        )}

        {Array.isArray(filterWith) &&
          filterWith.map(
            (item, index) =>
              table.getColumn(item.value) && <DataTableFacetedFilter key={index} defaultValue={item.defaultValue} column={table.getColumn(item.value)} title={item.label} options={item.options} />
          )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {dateFilter && <FilterItem className="[&>*]:h-8" />}
        {customFilter && customFilter.length && customFilter.map((item, index) => <item.filter className="*:border-dashed border-dashed [&>*]:h-8" label={item.label} key={index} {...item.props} />)}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
