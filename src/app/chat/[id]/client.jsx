'use client';
import { Chats } from '@/components/shared/chat';
import ChatBottombar from '@/components/shared/chat-bottom-bar';
import { useEffect, useState } from 'react';

const chats = [
  {
    id: '1',
    text: 'Hello, how can I assist you today?',
    attachments: null,
    date: '2024-03-26T09:30:00',
    name: 'Alice',
    email: 'alice@example.com',
    type: 'outgoing',
    repliedTo: null,
    reaction: ['🙂'],
  },
  {
    id: '2',
    text: null,
    attachments: [
      { url: 'https://source.unsplash.com/800x600/?nature', type: 'image' },
      { url: 'https://source.unsplash.com/800x600/?document', type: 'document' },
    ],
    date: '2024-03-26T09:35:00',
    name: 'Bob',
    email: 'bob@example.com',
    type: 'incoming',
    repliedTo: '1',
    reaction: ['📎', '❤️'],
  },
  {
    id: '3',
    text: "I'm facing issues with my account.",
    attachments: null,
    date: '2024-03-26T09:40:00',
    name: 'Alice',
    email: 'alice@example.com',
    type: 'outgoing',
    repliedTo: null,
    reaction: null,
  },
  {
    id: '4',
    text: 'Can you please provide your account details?',
    attachments: null,
    date: '2024-03-26T09:45:00',
    name: 'Bob',
    email: 'bob@example.com',
    type: 'incoming',
    repliedTo: '3',
    reaction: ['🔍'],
  },
  {
    id: '5',
    text: null,
    attachments: [{ url: 'https://source.unsplash.com/800x600/?people', type: 'image' }],
    date: '2024-03-26T09:50:00',
    name: 'Alice',
    email: 'alice@example.com',
    type: 'outgoing',
    repliedTo: null,
    reaction: null,
  },
  {
    id: '6',
    text: 'Thank you for the information.',
    attachments: null,
    date: '2024-03-26T09:55:00',
    name: 'Bob',
    email: 'bob@example.com',
    type: 'incoming',
    repliedTo: '5',
    reaction: ['👍'],
  },
  {
    id: '7',
    text: 'I need help with my recent order.',
    attachments: null,
    date: '2024-03-26T10:00:00',
    name: 'Alice',
    email: 'alice@example.com',
    type: 'outgoing',
    repliedTo: null,
    reaction: ['🤔'],
  },
  {
    id: '8',
    text: null,
    attachments: [{ url: 'https://source.unsplash.com/800x600/?technology', type: 'document' }],
    date: '2024-03-26T10:05:00',
    name: 'Bob',
    email: 'bob@example.com',
    type: 'incoming',
    repliedTo: '7',
    reaction: null,
  },
  {
    id: '9',
    text: 'Sure, what seems to be the issue?',
    attachments: null,
    date: '2024-03-26T10:10:00',
    name: 'Alice',
    email: 'alice@example.com',
    type: 'outgoing',
    repliedTo: null,
    reaction: ['👀'],
  },
  {
    id: '10',
    text: "I'm unable to login to my account.",
    attachments: null,
    date: '2024-03-26T10:15:00',
    name: 'Bob',
    email: 'bob@example.com',
    type: 'incoming',
    repliedTo: '9',
    reaction: ['😟'],
  },
];
export const Client = ({ data }) => {
  const [chatsState, setChatsState] = useState(chats);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);
  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden h-full max-h-screen-compatibility w-full layer">
        <Chats chats={chatsState} />
      </div>
      <ChatBottombar chats={chats} sendMessage={setChatsState} isMobile={isMobile} data={data} className="pb-2 layer" />
    </>
  );
};
