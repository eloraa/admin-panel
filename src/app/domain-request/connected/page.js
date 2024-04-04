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
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-26T09:00:00' },
      { label: 'Connected', value: '2024-03-26T09:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 2,
    shopId: 'SH002',
    clientName: 'Jane Smith',
    companyName: 'InnovateTech',
    requestDateAndTime: '2024-03-27T10:15:00',
    domain: 'innovatetech.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-27T10:15:00' },
      { label: 'Connected', value: '2024-03-27T10:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 3,
    shopId: 'SH003',
    clientName: 'Emily Johnson',
    companyName: 'Nexa Solutions',
    requestDateAndTime: '2024-03-28T11:30:00',
    domain: 'nexasolutions.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-28T11:30:00' },
      { label: 'Connected', value: '2024-03-28T12:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 4,
    shopId: 'SH004',
    clientName: 'William Brown',
    companyName: 'AlphaSoft',
    requestDateAndTime: '2024-03-29T12:45:00',
    domain: 'alphasoft.org',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-29T12:45:00' },
      { label: 'Connected', value: '2024-03-29T13:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 5,
    shopId: 'SH005',
    clientName: 'Sophia Miller',
    companyName: 'DigitalScape',
    requestDateAndTime: '2024-03-30T14:00:00',
    domain: 'digitalscape.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-30T14:00:00' },
      { label: 'Connected', value: '2024-03-30T14:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 6,
    shopId: 'SH006',
    clientName: 'Michael Wilson',
    companyName: 'WebWizards',
    requestDateAndTime: '2024-03-31T15:15:00',
    domain: 'webwizards.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-03-31T15:15:00' },
      { label: 'Connected', value: '2024-03-31T15:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 7,
    shopId: 'SH007',
    clientName: 'Olivia Davis',
    companyName: 'CodeCrafters',
    requestDateAndTime: '2024-04-01T16:30:00',
    domain: 'codecrafters.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-01T16:30:00' },
      { label: 'Connected', value: '2024-04-01T17:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 8,
    shopId: 'SH008',
    clientName: 'Daniel Wilson',
    companyName: 'TechNest',
    requestDateAndTime: '2024-04-02T17:45:00',
    domain: 'technest.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-02T17:45:00' },
      { label: 'Connected', value: '2024-04-02T18:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 9,
    shopId: 'SH009',
    clientName: 'Isabella Smith',
    companyName: 'InnoTech',
    requestDateAndTime: '2024-04-03T18:00:00',
    domain: 'innotech.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-03T18:00:00' },
      { label: 'Connected', value: '2024-04-03T18:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 10,
    shopId: 'SH010',
    clientName: 'Liam Johnson',
    companyName: 'WebSolutions',
    requestDateAndTime: '2024-04-04T09:00:00',
    domain: 'websolutions.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-04T09:00:00' },
      { label: 'Connected', value: '2024-04-04T09:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 11,
    shopId: 'SH011',
    clientName: 'Ava Williams',
    companyName: 'DigitalDreams',
    requestDateAndTime: '2024-04-05T10:15:00',
    domain: 'digitaldreams.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-05T10:15:00' },
      { label: 'Connected', value: '2024-04-05T10:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 12,
    shopId: 'SH012',
    clientName: 'Mason Brown',
    companyName: 'CodeNest',
    requestDateAndTime: '2024-04-06T11:30:00',
    domain: 'codenest.org',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-06T11:30:00' },
      { label: 'Connected', value: '2024-04-06T12:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 13,
    shopId: 'SH013',
    clientName: 'Luna Smith',
    companyName: 'TechSolutions',
    requestDateAndTime: '2024-04-07T12:45:00',
    domain: 'techsolutions.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-07T12:45:00' },
      { label: 'Connected', value: '2024-04-07T13:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 14,
    shopId: 'SH014',
    clientName: 'Ethan Davis',
    companyName: 'InnovaSoft',
    requestDateAndTime: '2024-04-08T14:00:00',
    domain: 'innovasoft.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-08T14:00:00' },
      { label: 'Connected', value: '2024-04-08T14:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 15,
    shopId: 'SH015',
    clientName: 'Emma Wilson',
    companyName: 'WebCrafters',
    requestDateAndTime: '2024-04-09T15:15:00',
    domain: 'webcrafters.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-09T15:15:00' },
      { label: 'Connected', value: '2024-04-09T15:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 16,
    shopId: 'SH016',
    clientName: 'Oliver Johnson',
    companyName: 'CodeMasters',
    requestDateAndTime: '2024-04-10T16:30:00',
    domain: 'codemasters.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-10T16:30:00' },
      { label: 'Connected', value: '2024-04-10T17:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 17,
    shopId: 'SH017',
    clientName: 'Aria Smith',
    companyName: 'TechNest',
    requestDateAndTime: '2024-04-11T17:45:00',
    domain: 'technest.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-11T17:45:00' },
      { label: 'Connected', value: '2024-04-11T18:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 18,
    shopId: 'SH018',
    clientName: 'Carter Davis',
    companyName: 'DigitalSolutions',
    requestDateAndTime: '2024-04-12T18:00:00',
    domain: 'digitalsolutions.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-12T18:00:00' },
      { label: 'Connected', value: '2024-04-12T18:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 19,
    shopId: 'SH019',
    clientName: 'Charlotte Wilson',
    companyName: 'InnoWeb',
    requestDateAndTime: '2024-04-13T09:00:00',
    domain: 'innoweb.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-13T09:00:00' },
      { label: 'Connected', value: '2024-04-13T09:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 20,
    shopId: 'SH020',
    clientName: 'Liam Williams',
    companyName: 'WebInnovators',
    requestDateAndTime: '2024-04-14T10:15:00',
    domain: 'webinnovators.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-14T10:15:00' },
      { label: 'Connected', value: '2024-04-14T10:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 21,
    shopId: 'SH021',
    clientName: 'Mia Johnson',
    companyName: 'CodeCraft',
    requestDateAndTime: '2024-04-15T11:30:00',
    domain: 'codecraft.org',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-15T11:30:00' },
      { label: 'Connected', value: '2024-04-15T12:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 22,
    shopId: 'SH022',
    clientName: 'Lucas Brown',
    companyName: 'TechSolutions',
    requestDateAndTime: '2024-04-16T12:45:00',
    domain: 'techsolutions.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-16T12:45:00' },
      { label: 'Connected', value: '2024-04-16T13:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 23,
    shopId: 'SH023',
    clientName: 'Evelyn Smith',
    companyName: 'WebCrafters',
    requestDateAndTime: '2024-04-17T14:00:00',
    domain: 'webcrafters.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-17T14:00:00' },
      { label: 'Connected', value: '2024-04-17T14:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 24,
    shopId: 'SH024',
    clientName: 'Harper Davis',
    companyName: 'InnovaSoft',
    requestDateAndTime: '2024-04-18T15:15:00',
    domain: 'innovasoft.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-18T15:15:00' },
      { label: 'Connected', value: '2024-04-18T15:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 25,
    shopId: 'SH025',
    clientName: 'Ella Wilson',
    companyName: 'DigitalDreams',
    requestDateAndTime: '2024-04-19T16:30:00',
    domain: 'digitaldreams.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-19T16:30:00' },
      { label: 'Connected', value: '2024-04-19T17:00:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 26,
    shopId: 'SH026',
    clientName: 'Avery Johnson',
    companyName: 'CodeMasters',
    requestDateAndTime: '2024-04-20T17:45:00',
    domain: 'codemasters.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-20T17:45:00' },
      { label: 'Connected', value: '2024-04-20T18:15:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 27,
    shopId: 'SH027',
    clientName: 'Scarlett Smith',
    companyName: 'TechNest',
    requestDateAndTime: '2024-04-21T18:00:00',
    domain: 'technest.org',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-21T18:00:00' },
      { label: 'Connected', value: '2024-04-21T18:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 28,
    shopId: 'SH028',
    clientName: 'Grace Davis',
    companyName: 'InnoTech',
    requestDateAndTime: '2024-04-22T09:00:00',
    domain: 'innotech.com',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-22T09:00:00' },
      { label: 'Connected', value: '2024-04-22T09:30:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 29,
    shopId: 'SH029',
    clientName: 'Zoey Wilson',
    companyName: 'WebSolutions',
    requestDateAndTime: '2024-04-23T10:15:00',
    domain: 'websolutions.io',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-23T10:15:00' },
      { label: 'Connected', value: '2024-04-23T10:45:00' },
      { label: 'Rejected', value: null },
    ],
  },
  {
    sl: 30,
    shopId: 'SH030',
    clientName: 'Lily Johnson',
    companyName: 'DigitalScape',
    requestDateAndTime: '2024-04-24T11:30:00',
    domain: 'digitalscape.net',
    status: 'Connected',
    timeline: [
      { label: 'Pending', value: '2024-04-24T11:30:00' },
      { label: 'Connected', value: '2024-04-24T12:00:00' },
      { label: 'Rejected', value: null },
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

export default function Page() {
  return (
    <section>
      <Title className="max-md:text-center">Domain Request List</Title>
      <Tabs statuses={statuses} status="connected" baseURL="/domain-request" className="flex items-center max-md:justify-center" />
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
