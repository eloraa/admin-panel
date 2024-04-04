import { DataTable } from '@/components/ui/data-table/data-table';
import { sanitizeObject } from '@/components/ui/data-table/utils';
import { Title } from '@/components/ui/title';
import { columns } from './column';
import { FilterItem } from '@/components/shared/filterItem';
import { ShieldCheckIcon } from 'lucide-react';
import { Tabs } from '@/components/shared/tabs';

const data = [
  {
    sl: 1,
    shopId: 'SH001',
    clientName: 'John Doe',
    companyName: 'TechCorp',
    requestDateAndTime: '2024-03-26T09:00:00',
    domain: 'techcorp.com',
    status: 'Pending',
  },
  {
    sl: 2,
    shopId: 'SH002',
    clientName: 'Jane Smith',
    companyName: 'InnovateTech',
    requestDateAndTime: '2024-03-27T10:15:00',
    domain: 'innovatetech.net',
    status: 'Pending',
  },
  {
    sl: 3,
    shopId: 'SH003',
    clientName: 'Emily Johnson',
    companyName: 'Nexa Solutions',
    requestDateAndTime: '2024-03-28T11:30:00',
    domain: 'nexasolutions.com',
    status: 'Pending',
  },
  {
    sl: 4,
    shopId: 'SH004',
    clientName: 'William Brown',
    companyName: 'AlphaSoft',
    requestDateAndTime: '2024-03-29T12:45:00',
    domain: 'alphasoft.org',
    status: 'Pending',
  },
  {
    sl: 5,
    shopId: 'SH005',
    clientName: 'Sophia Miller',
    companyName: 'DigitalScape',
    requestDateAndTime: '2024-03-30T14:00:00',
    domain: 'digitalscape.io',
    status: 'Pending',
  },
  {
    sl: 6,
    shopId: 'SH006',
    clientName: 'Michael Wilson',
    companyName: 'WebWizards',
    requestDateAndTime: '2024-03-31T15:15:00',
    domain: 'webwizards.com',
    status: 'Pending',
  },
  {
    sl: 7,
    shopId: 'SH007',
    clientName: 'Olivia Davis',
    companyName: 'CodeCrafters',
    requestDateAndTime: '2024-04-01T16:30:00',
    domain: 'codecrafters.net',
    status: 'Pending',
  },
  {
    sl: 8,
    shopId: 'SH008',
    clientName: 'Daniel Wilson',
    companyName: 'TechNest',
    requestDateAndTime: '2024-04-02T17:45:00',
    domain: 'technest.com',
    status: 'Pending',
  },
  {
    sl: 9,
    shopId: 'SH009',
    clientName: 'Isabella Smith',
    companyName: 'InnoTech',
    requestDateAndTime: '2024-04-03T18:00:00',
    domain: 'innotech.io',
    status: 'Pending',
  },
  {
    sl: 10,
    shopId: 'SH010',
    clientName: 'Liam Johnson',
    companyName: 'WebSolutions',
    requestDateAndTime: '2024-04-04T09:00:00',
    domain: 'websolutions.com',
    status: 'Pending',
  },
  {
    sl: 11,
    shopId: 'SH011',
    clientName: 'Ava Williams',
    companyName: 'DigitalDreams',
    requestDateAndTime: '2024-04-05T10:15:00',
    domain: 'digitaldreams.net',
    status: 'Pending',
  },
  {
    sl: 12,
    shopId: 'SH012',
    clientName: 'Mason Brown',
    companyName: 'CodeNest',
    requestDateAndTime: '2024-04-06T11:30:00',
    domain: 'codenest.org',
    status: 'Pending',
  },
  {
    sl: 13,
    shopId: 'SH013',
    clientName: 'Luna Smith',
    companyName: 'TechSolutions',
    requestDateAndTime: '2024-04-07T12:45:00',
    domain: 'techsolutions.com',
    status: 'Pending',
  },
  {
    sl: 14,
    shopId: 'SH014',
    clientName: 'Ethan Davis',
    companyName: 'InnovaSoft',
    requestDateAndTime: '2024-04-08T14:00:00',
    domain: 'innovasoft.net',
    status: 'Pending',
  },
  {
    sl: 15,
    shopId: 'SH015',
    clientName: 'Emma Wilson',
    companyName: 'WebCrafters',
    requestDateAndTime: '2024-04-09T15:15:00',
    domain: 'webcrafters.io',
    status: 'Pending',
  },
  {
    sl: 16,
    shopId: 'SH016',
    clientName: 'Oliver Johnson',
    companyName: 'CodeMasters',
    requestDateAndTime: '2024-04-10T16:30:00',
    domain: 'codemasters.com',
    status: 'Pending',
  },
  {
    sl: 17,
    shopId: 'SH017',
    clientName: 'Aria Smith',
    companyName: 'TechNest',
    requestDateAndTime: '2024-04-11T17:45:00',
    domain: 'technest.net',
    status: 'Pending',
  },
  {
    sl: 18,
    shopId: 'SH018',
    clientName: 'Carter Davis',
    companyName: 'DigitalSolutions',
    requestDateAndTime: '2024-04-12T18:00:00',
    domain: 'digitalsolutions.com',
    status: 'Pending',
  },
  {
    sl: 19,
    shopId: 'SH019',
    clientName: 'Charlotte Wilson',
    companyName: 'InnoWeb',
    requestDateAndTime: '2024-04-13T09:00:00',
    domain: 'innoweb.io',
    status: 'Pending',
  },
  {
    sl: 20,
    shopId: 'SH020',
    clientName: 'Liam Williams',
    companyName: 'WebInnovators',
    requestDateAndTime: '2024-04-14T10:15:00',
    domain: 'webinnovators.com',
    status: 'Pending',
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
      <Tabs statuses={statuses} status="pending" baseURL="/domain-request" className="flex items-center max-md:justify-center" />
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
