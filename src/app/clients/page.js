import { DataTable } from '@/components/ui/data-table/data-table';
import { sanitizeObject } from '@/components/ui/data-table/utils';
import { Title } from '@/components/ui/title';
import { columns } from './column';
import { FilterItem } from '@/components/shared/filterItem';
import { ShieldCheckIcon } from 'lucide-react';

const data = [
  {
    sl: 1,
    shopId: 'SH001',
    companyName: 'Tech Innovators',
    clientName: 'John Doe',
    contactNo: '123-456-7890',
    orders: 15,
    joiningDate: '2023-01-15',
    nextDueDate: '2024-04-15',
    paymentStatus: 'paid',
    status: 'active',
    lastMonthPackage: 'Startup',
    currentPackage: 'Business',
    kamName: 'Kam 1',
    onboardingName: 'Onboarding 1',
    salesFrom: 'Online',
  },
  {
    sl: 2,
    shopId: 'SH002',
    companyName: 'Digital Solutions',
    clientName: 'Jane Smith',
    contactNo: '234-567-8901',
    orders: 10,
    joiningDate: '2023-02-20',
    nextDueDate: '2024-05-20',
    paymentStatus: 'unpaid',
    status: 'inactive',
    lastMonthPackage: 'Free Package',
    currentPackage: 'Startup',
    kamName: 'Kam 2',
    onboardingName: 'Onboarding 2',
    salesFrom: 'Offline',
  },
  {
    sl: 3,
    shopId: 'SH003',
    companyName: 'Innovate Hub',
    clientName: 'Emily Johnson',
    contactNo: '345-678-9012',
    orders: 20,
    joiningDate: '2023-03-10',
    nextDueDate: '2024-06-10',
    paymentStatus: 'overdue',
    status: 'expired',
    lastMonthPackage: 'Business',
    currentPackage: 'Business Plus',
    kamName: 'Kam 3',
    onboardingName: 'Onboarding 3',
    salesFrom: 'Online',
  },
  {
    sl: 4,
    shopId: 'SH004',
    companyName: 'Future Tech',
    clientName: 'William Brown',
    contactNo: '456-789-0123',
    orders: 5,
    joiningDate: '2023-04-05',
    nextDueDate: '2024-07-05',
    paymentStatus: 'paid',
    status: 'active',
    lastMonthPackage: 'Entrepreneur',
    currentPackage: 'Enterprise',
    kamName: 'Kam 4',
    onboardingName: 'Onboarding 4',
    salesFrom: 'Offline',
  },
  {
    sl: 5,
    shopId: 'SH005',
    companyName: 'Tech Wizards',
    clientName: 'Sophia Miller',
    contactNo: '567-890-1234',
    orders: 12,
    joiningDate: '2023-05-15',
    nextDueDate: '2024-08-15',
    paymentStatus: 'unpaid',
    status: 'inactive',
    lastMonthPackage: 'Enterprise Plus',
    currentPackage: 'Startup',
    kamName: 'Kam 5',
    onboardingName: 'Onboarding 5',
    salesFrom: 'Online',
  },
  {
    sl: 6,
    shopId: 'SH006',
    companyName: 'Digital Trends',
    clientName: 'Michael Wilson',
    contactNo: '678-901-2345',
    orders: 18,
    joiningDate: '2023-06-20',
    nextDueDate: '2024-09-20',
    paymentStatus: 'overdue',
    status: 'expired',
    lastMonthPackage: 'Business Plus',
    currentPackage: 'Enterprise',
    kamName: 'Kam 1',
    onboardingName: 'Onboarding 1',
    salesFrom: 'Offline',
  },
  {
    sl: 7,
    shopId: 'SH007',
    companyName: 'NextGen Tech',
    clientName: 'Olivia Davis',
    contactNo: '789-012-3456',
    orders: 25,
    joiningDate: '2023-07-10',
    nextDueDate: '2024-10-10',
    paymentStatus: 'paid',
    status: 'active',
    lastMonthPackage: 'Startup',
    currentPackage: 'Business',
    kamName: 'Kam 2',
    onboardingName: 'Onboarding 2',
    salesFrom: 'Online',
  },
  {
    sl: 8,
    shopId: 'SH008',
    companyName: 'Tech Pioneers',
    clientName: 'Daniel Wilson',
    contactNo: '890-123-4567',
    orders: 8,
    joiningDate: '2023-08-05',
    nextDueDate: '2024-11-05',
    paymentStatus: 'unpaid',
    status: 'inactive',
    lastMonthPackage: 'Business',
    currentPackage: 'Business Plus',
    kamName: 'Kam 3',
    onboardingName: 'Onboarding 3',
    salesFrom: 'Offline',
  },
  {
    sl: 9,
    shopId: 'SH009',
    companyName: 'Innovate IT',
    clientName: 'Isabella Wilson',
    contactNo: '901-234-5678',
    orders: 30,
    joiningDate: '2023-09-15',
    nextDueDate: '2024-12-15',
    paymentStatus: 'overdue',
    status: 'expired',
    lastMonthPackage: 'Free Package',
    currentPackage: 'Startup',
    kamName: 'Kam 4',
    onboardingName: 'Onboarding 4',
    salesFrom: 'Online',
  },
  {
    sl: 10,
    shopId: 'SH010',
    companyName: 'Tech Giants',
    clientName: 'Alexander Garcia',
    contactNo: '012-345-6789',
    orders: 10,
    joiningDate: '2023-10-20',
    nextDueDate: '2025-01-20',
    paymentStatus: 'paid',
    status: 'active',
    lastMonthPackage: 'Business Plus',
    currentPackage: 'Enterprise',
    kamName: 'Kam 5',
    onboardingName: 'Onboarding 5',
    salesFrom: 'Online',
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
  {
    value: 'expired',
    label: 'Expired',
  },
  {
    value: 'locked',
    label: 'Locked',
  },
];

export default function Page() {
  return (
    <div className="space-y-8 layer">
      <section>
        <Title className="max-md:text-center">Clients</Title>
        <div className="mt-4">
          <DataTable
            search="shopId"
            statuses={statuses}
            placeholder="Filter by Shop ID"
            customFilter={[
              {
                label: 'Joining Date',
                filter: FilterItem,
                props: {
                  overrideLabel: true,
                  checkbox: true,
                },
              },
              {
                label: 'Order Date',
                filter: FilterItem,
                props: {
                  overrideLabel: true,
                  checkbox: true,
                },
              },
            ]}
            data={sanitizeObject(data)}
            columns={columns}
          ></DataTable>
        </div>
      </section>
    </div>
  );
}
