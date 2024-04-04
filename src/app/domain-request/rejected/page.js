import { DataTable } from '@/components/ui/data-table/data-table';
import { sanitizeObject } from '@/components/ui/data-table/utils';
import { Title } from '@/components/ui/title';
import { columns } from './column';
import { Tabs } from '@/components/shared/tabs';
import { FilterItem } from '@/components/shared/filterItem';

const data = [
  {
    sl: 1,
    shopId: 'SH001',
    clientName: 'John Doe',
    companyName: 'TechCorp',
    requestDateAndTime: '2024-03-26T09:00:00',
    domain: 'techcorp.com',
    status: 'Rejected',
    reason: 'Insufficient Information',
    timeline: [
      { label: 'Pending', value: '2024-03-26T09:00:00', reason: null },
      { label: 'Rejected', variant: 'error', value: '2024-03-27T10:00:00', reason: 'Insufficient Information' },
    ],
  },
  {
    sl: 2,
    shopId: 'SH002',
    clientName: 'Jane Smith',
    companyName: 'InnovateTech',
    requestDateAndTime: '2024-03-27T10:15:00',
    domain: 'innovatetech.net',
    status: 'Rejected',
    reason: 'Price Concerns',
    timeline: [
      { label: 'Pending', value: '2024-03-27T10:15:00', reason: null },
      { label: 'Rejected', variant: 'error', value: '2024-03-28T11:00:00', reason: 'Price Concerns' },
    ],
  },
  {
    sl: 3,
    shopId: 'SH003',
    clientName: 'Emily Johnson',
    companyName: 'Nexa Solutions',
    requestDateAndTime: '2024-03-28T11:30:00',
    domain: 'nexasolutions.com',
    status: 'Rejected',
    reason: 'Not Suitable',
    timeline: [
      { label: 'Pending', value: '2024-03-28T11:30:00', reason: null },
      { label: 'Rejected', variant: 'error', value: '2024-03-29T12:00:00', reason: 'Not Suitable' },
    ],
  },
  {
    sl: 4,
    shopId: 'SH004',
    clientName: 'William Brown',
    companyName: 'AlphaSoft',
    requestDateAndTime: '2024-03-29T12:45:00',
    domain: 'alphasoft.org',
    status: 'Rejected',
    reason: 'Service Limitations',
    timeline: [
      { label: 'Pending', value: '2024-03-29T12:45:00', reason: null },
      { label: 'Rejected', variant: 'error', value: '2024-03-30T13:00:00', reason: 'Service Limitations' },
    ],
  },
  {
    sl: 5,
    shopId: 'SH005',
    clientName: 'Sophia Miller',
    companyName: 'DigitalScape',
    requestDateAndTime: '2024-03-30T14:00:00',
    domain: 'digitalscape.io',
    status: 'Rejected',
    reason: 'Technical Issues',
    timeline: [
      { label: 'Pending', value: '2024-03-30T14:00:00', reason: null },
      { label: 'Rejected', variant: 'error', value: '2024-03-31T14:30:00', reason: 'Technical Issues' },
    ],
  },
];

export const statuses = [
  {
    label: 'Pending',
    value: 'Pending',
    hide: true,
  },
  {
    label: 'Connected',
    value: 'Connected',
  },
  {
    label: 'Rejected',
    value: 'Rejected',
  },
];

export default function Kam() {
  return (
    <section>
      <Title className="max-md:text-center">Domain Request List</Title>
      <Tabs statuses={statuses} status="rejected" baseURL="/domain-request" className="flex items-center max-md:justify-center" />
      <div className="mt-4">
        <DataTable
          search="shopId"
          disableFilter
          statuses={statuses}
          placeholder="Filter by Shop ID"
          data={sanitizeObject(data)}
          columns={columns}
          customFilter={[{ label: 'Request Date', filter: FilterItem, props: { overrideLabel: true, checkbox: true } }]}
        ></DataTable>
      </div>
    </section>
  );
}
