import { Tabs } from '@/components/shared/tabs';
import { Title } from '@/components/ui/title';

export const statuses = [
  { label: 'Unpaid', value: 'Unpaid' },
  { label: 'Overdue', value: 'Overdue' },
  { label: 'Paid', value: 'Paid' },
];
export default function Layout({ children }) {
  return (
    <div className="layer">
      <div>
        <Title className="max-md:text-center">Billing List</Title>
        <Tabs statuses={statuses} usePathname status="connected" baseURL="/billing" className="flex items-center max-md:justify-center" />
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
