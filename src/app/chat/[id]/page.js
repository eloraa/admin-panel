import NotFound from '@/app/not-found';
import { ChatToolbar } from '@/components/shared/chat-toolbar';
import { Client } from './client';

const data = [
  {
    sl: 1,
    clientName: 'John Doe',
    ticketNo: 'TCKT-001',
    subjectForTicket: 'Issue with login',
    submissionTime: '2024-03-26T09:30:00',
    assignee: 'Alice',
    timeline: [{ label: 'Pending', value: '2024-03-26T09:30:00' }],
    status: 'pending',
    labels: [
      { title: 'Bug', color: '#FF0000' },
      { title: 'In Progress', color: '#03A9F4' },
      { title: 'Critical', color: 'rgb(227 57 3)' },
      { title: 'Error', color: 'rgb(225 15 0)' },
      { title: 'Warning', color: '#9e9d24' },
    ],
    priority: 'High',
  },
  {
    sl: 2,
    clientName: 'Jane Smith',
    ticketNo: 'TCKT-002',
    subjectForTicket: 'Billing issue',
    submissionTime: '2024-03-26T10:45:00',
    assignee: 'Bob',
    timeline: [
      { label: 'Pending', value: '2024-03-26T10:45:00' },
      { label: 'Open', value: '2024-03-26T11:00:00' },
    ],
    status: 'open',
    labels: [{ title: 'Billing', color: '#0000FF' }],
    priority: 'Medium',
  },
  {
    sl: 3,
    clientName: 'Emily Johnson',
    ticketNo: 'TCKT-003',
    subjectForTicket: 'Product query',
    submissionTime: '2024-03-26T11:20:00',
    assignee: 'Charlie',
    timeline: [
      { label: 'Pending', value: '2024-03-26T11:20:00' },
      { label: 'Open', value: '2024-03-26T11:35:00' },
      { label: 'Processing', value: '2024-03-26T12:00:00' },
    ],
    status: 'processing',
    labels: [{ title: 'Query', color: '#008000' }],
    priority: 'Low',
  },
  {
    sl: 4,
    clientName: 'Michael Williams',
    ticketNo: 'TCKT-004',
    subjectForTicket: 'Service outage',
    submissionTime: '2024-03-26T12:00:00',
    assignee: 'David',
    timeline: [
      { label: 'Pending', value: '2024-03-26T12:00:00' },
      { label: 'Open', value: '2024-03-26T12:30:00' },
      { label: 'Processing', value: '2024-03-26T13:00:00' },
      { label: 'Solved', value: '2024-03-26T14:00:00' },
    ],
    status: 'solved',
    labels: [
      { title: 'Outage', color: '#FF0000' },
      { title: 'Service', color: '#ff8300' },
    ],
    priority: 'High',
  },
  {
    sl: 5,
    clientName: 'Emma Brown',
    ticketNo: 'TCKT-005',
    subjectForTicket: 'Password reset',
    submissionTime: '2024-03-26T13:15:00',
    assignee: 'Ella',
    timeline: [
      { label: 'Pending', value: '2024-03-26T13:15:00' },
      { label: 'Open', value: '2024-03-26T13:30:00' },
      { label: 'Processing', value: '2024-03-26T14:00:00' },
      { label: 'Closed', value: '2024-03-26T15:00:00' },
    ],
    status: 'closed',
    labels: [
      { title: 'Password', color: '#0000FF' },
      { title: 'Reset', color: '#008000' },
    ],
    priority: 'Medium',
  },
  {
    sl: 6,
    clientName: 'William Jones',
    ticketNo: 'TCKT-006',
    subjectForTicket: 'Feature request',
    submissionTime: '2024-03-26T14:30:00',
    assignee: 'Fred',
    timeline: [
      { label: 'Pending', value: '2024-03-26T14:30:00' },
      { label: 'Open', value: '2024-03-26T14:45:00' },
      { label: 'Processing', value: '2024-03-26T15:15:00' },
      { label: 'Solved', value: '2024-03-26T16:00:00' },
    ],
    status: 'solved',
    labels: [
      { title: 'Feature', color: '#ff8300' },
      { title: 'Request', color: '#FFA500' },
    ],
    priority: 'Low',
  },
  {
    sl: 7,
    clientName: 'Olivia Davis',
    ticketNo: 'TCKT-007',
    subjectForTicket: 'Performance issue',
    submissionTime: '2024-03-26T15:45:00',
    assignee: 'Grace',
    timeline: [
      { label: 'Pending', value: '2024-03-26T15:45:00' },
      { label: 'Open', value: '2024-03-26T16:00:00' },
      { label: 'Processing', value: '2024-03-26T16:30:00' },
      { label: 'Closed', value: '2024-03-26T17:30:00' },
    ],
    status: 'closed',
    labels: [
      { title: 'Performance', color: '#FF0000' },
      { title: 'Issue', color: '#ff8300' },
    ],
    priority: 'High',
  },
  {
    sl: 8,
    clientName: 'Sophia Wilson',
    ticketNo: 'TCKT-008',
    subjectForTicket: 'Technical error',
    submissionTime: '2024-03-26T16:30:00',
    assignee: 'Henry',
    timeline: [
      { label: 'Pending', value: '2024-03-26T16:30:00' },
      { label: 'Open', value: '2024-03-26T16:45:00' },
    ],
    status: 'open',
    labels: [
      { title: 'Technical', color: '#0000FF' },
      { title: 'Error', color: '#FF0000' },
    ],
    priority: 'Medium',
  },
  {
    sl: 9,
    clientName: 'Daniel Taylor',
    ticketNo: 'TCKT-009',
    subjectForTicket: 'Login issue',
    submissionTime: '2024-03-26T17:15:00',
    assignee: 'Isabella',
    timeline: [
      { label: 'Pending', value: '2024-03-26T17:15:00' },
      { label: 'Open', value: '2024-03-26T17:30:00' },
    ],
    status: 'open',
    labels: [
      { title: 'Login', color: '#008000' },
      { title: 'Issue', color: '#ff8300' },
    ],
    priority: 'Low',
  },
  {
    sl: 10,
    clientName: 'Liam Anderson',
    ticketNo: 'TCKT-010',
    subjectForTicket: 'Feature request',
    submissionTime: '2024-03-26T18:00:00',
    assignee: 'Jacob',
    timeline: [
      { label: 'Pending', value: '2024-03-26T18:00:00' },
      { label: 'Open', value: '2024-03-26T18:15:00' },
      { label: 'Processing', value: '2024-03-26T18:45:00' },
      { label: 'Closed', value: '2024-03-26T19:45:00' },
    ],
    status: 'closed',
    labels: [
      { title: 'Feature', color: '#ff8300' },
      { title: 'Request', color: '#FFA500' },
    ],
    priority: 'High',
  },
];

const statuses = [
  { label: 'Pending', value: 'pending' },
  { label: 'Open', value: 'open' },
  { label: 'Processing', value: 'processing' },
  { label: 'Solved', value: 'solved' },
  { label: 'Closed', value: 'closed' },
];

const labels = [
  { label: 'Bug', value: 'Bug', color: '#FF0000' },
  { label: 'In Progress', value: 'In Progress', color: '#03A9F4' },
  { label: 'Critical', value: 'Critical', color: 'rgb(227 57 3)' },
  { label: 'Error', value: 'Error', color: 'rgb(225 15 0)' },
  { label: 'Warning', value: 'Warning', color: '#9e9d24' },
  { label: 'Billing', value: 'Billing', color: '#0000FF' },
  { label: 'Query', value: 'Query', color: '#008000' },
  { label: 'Outage', value: 'Outage', color: '#FF0000' },
  { label: 'Service', value: 'Service', color: '#ff8300' },
  { label: 'Password', value: 'Password', color: '#0000FF' },
  { label: 'Reset', value: 'Reset', color: '#008000' },
  { label: 'Feature', value: 'Feature', color: '#ff8300' },
  { label: 'Request', value: 'Request', color: '#FFA500' },
  { label: 'Technical', value: 'Technical', color: '#0000FF' },
  { label: 'Login', value: 'Login', color: '#008000' },
];

export default function Page({ params: { id } }) {
  console.log(id);
  const ticket = data.find(ticket => String(ticket.sl) === String(id));
  console.log(ticket);
  if (!ticket) return <NotFound />;
  return (
    <section className="flex flex-col overflow-hidden h-full">
      <ChatToolbar data={ticket} labels={labels} statuses={statuses.slice(statuses.findIndex(s => s.value === ticket.status))} className="layer pb-6" />
      <Client data={ticket} />
    </section>
  );
}
