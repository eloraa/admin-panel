import { DataTable } from '@/components/ui/data-table/data-table';
import { sanitizeObject } from '@/components/ui/data-table/utils';
import { Title } from '@/components/ui/title';
import { FilterItem } from '@/components/shared/filterItem';
import { columns } from '../column';
import NotFound from '@/app/not-found';
import { AddUser } from '../add-user';

const data = [
  {
    sl: 1,
    name: 'John Doe',
    phoneNumber: '+1 (123) 456-7890',
    emailAddress: 'johndoe@example.com',
    employeeId: 'E001',
    joiningDate: '2022-01-05',
    role: 'Developer',
    activated: true,
  },
  {
    sl: 2,
    name: 'Jane Smith',
    phoneNumber: '+1 (234) 567-8901',
    emailAddress: 'janesmith@example.com',
    employeeId: 'E002',
    joiningDate: '2021-03-15',
    role: 'Manager',
    activated: true,
  },
  {
    sl: 3,
    name: 'Emily Johnson',
    phoneNumber: '+1 (345) 678-9012',
    emailAddress: 'emilyjohnson@example.com',
    employeeId: 'E003',
    joiningDate: '2020-07-20',
    role: 'Designer',
    activated: false,
  },
  {
    sl: 4,
    name: 'Michael Williams',
    phoneNumber: '+1 (456) 789-0123',
    emailAddress: 'michaelwilliams@example.com',
    employeeId: 'E004',
    joiningDate: '2023-02-10',
    role: 'Engineer',
    activated: true,
  },
  {
    sl: 5,
    name: 'Emma Brown',
    phoneNumber: '+1 (567) 890-1234',
    emailAddress: 'emmabrown@example.com',
    employeeId: 'E005',
    joiningDate: '2022-11-30',
    role: 'Analyst',
    activated: false,
  },
  {
    sl: 6,
    name: 'William Jones',
    phoneNumber: '+1 (678) 901-2345',
    emailAddress: 'williamjones@example.com',
    employeeId: 'E006',
    joiningDate: '2021-05-25',
    role: 'Developer',
    activated: true,
  },
  {
    sl: 7,
    name: 'Olivia Davis',
    phoneNumber: '+1 (789) 012-3456',
    emailAddress: 'oliviadavis@example.com',
    employeeId: 'E007',
    joiningDate: '2020-09-18',
    role: 'Manager',
    activated: false,
  },
  {
    sl: 8,
    name: 'James Miller',
    phoneNumber: '+1 (890) 123-4567',
    emailAddress: 'jamesmiller@example.com',
    employeeId: 'E008',
    joiningDate: '2023-04-03',
    role: 'Designer',
    activated: true,
  },
  {
    sl: 9,
    name: 'Sophia Wilson',
    phoneNumber: '+1 (901) 234-5678',
    emailAddress: 'sophiawilson@example.com',
    employeeId: 'E009',
    joiningDate: '2022-08-15',
    role: 'Engineer',
    activated: true,
  },
  {
    sl: 10,
    name: 'Liam Taylor',
    phoneNumber: '+1 (012) 345-6789',
    emailAddress: 'liamtaylor@example.com',
    employeeId: 'E010',
    joiningDate: '2021-01-01',
    role: 'Analyst',
    activated: false,
  },
  {
    sl: 11,
    name: 'Ava Anderson',
    phoneNumber: '+1 (123) 456-7890',
    emailAddress: 'avaanderson@example.com',
    employeeId: 'E011',
    joiningDate: '2020-12-10',
    role: 'Developer',
    activated: true,
  },
  {
    sl: 12,
    name: 'Noah Thomas',
    phoneNumber: '+1 (234) 567-8901',
    emailAddress: 'noahthomas@example.com',
    employeeId: 'E012',
    joiningDate: '2023-03-05',
    role: 'Manager',
    activated: true,
  },
  {
    sl: 13,
    name: 'Isabella White',
    phoneNumber: '+1 (345) 678-9012',
    emailAddress: 'isabellawhite@example.com',
    employeeId: 'E013',
    joiningDate: '2022-04-20',
    role: 'Designer',
    activated: false,
  },
  {
    sl: 14,
    name: 'Ethan Clark',
    phoneNumber: '+1 (456) 789-0123',
    emailAddress: 'ethanclark@example.com',
    employeeId: 'E014',
    joiningDate: '2021-06-15',
    role: 'Engineer',
    activated: true,
  },
  {
    sl: 15,
    name: 'Mia Hall',
    phoneNumber: '+1 (567) 890-1234',
    emailAddress: 'miahall@example.com',
    employeeId: 'E015',
    joiningDate: '2020-10-30',
    role: 'Analyst',
    activated: false,
  },
  {
    sl: 16,
    name: 'Lucas Adams',
    phoneNumber: '+1 (678) 901-2345',
    emailAddress: 'lucasadams@example.com',
    employeeId: 'E016',
    joiningDate: '2023-01-25',
    role: 'Developer',
    activated: true,
  },
  {
    sl: 17,
    name: 'Ella Harris',
    phoneNumber: '+1 (789) 012-3456',
    emailAddress: 'ellaharris@example.com',
    employeeId: 'E017',
    joiningDate: '2022-07-18',
    role: 'Manager',
    activated: false,
  },
  {
    sl: 18,
    name: 'Benjamin Scott',
    phoneNumber: '+1 (890) 123-4567',
    emailAddress: 'benjaminscott@example.com',
    employeeId: 'E018',
    joiningDate: '2021-09-03',
    role: 'Designer',
    activated: true,
  },
  {
    sl: 19,
    name: 'Chloe Green',
    phoneNumber: '+1 (901) 234-5678',
    emailAddress: 'chloegreen@example.com',
    employeeId: 'E019',
    joiningDate: '2020-11-15',
    role: 'Engineer',
    activated: true,
  },
  {
    sl: 20,
    name: 'Henry King',
    phoneNumber: '+1 (012) 345-6789',
    emailAddress: 'henryking@example.com',
    employeeId: 'E020',
    joiningDate: '2023-05-01',
    role: 'Analyst',
    activated: false,
  },
];

const statuses = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'inactive',
    label: 'Inactive',
  },
];

export default function Kam({ params }) {
  const defaultStatus = statuses.find(item => item.value === params.status)?.value;
  if (!defaultStatus) return <NotFound />;
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <Title>Team Member List</Title>
        <AddUser />
      </div>
      <DataTable
        search="emailAddress"
        filterWith="activated"
        disableFilter
        statuses={statuses}
        defaultStatus={defaultStatus}
        customFilter={[
          {
            label: 'Joining Date',
            filter: FilterItem,
            props: {
              overrideLabel: true,
              checkbox: true,
            },
          },
        ]}
        placeholder="Filter by Email"
        data={sanitizeObject(data)}
        columns={columns}
      ></DataTable>
    </section>
  );
}
