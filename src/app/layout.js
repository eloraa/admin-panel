import { Anek_Bangla, Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/shared/sidebar';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });
const anek_bangla = Anek_Bangla({ subsets: ['bengali'] });

export const metadata = {
  title: 'Dashboard',
};
const font = { fontFamily: `${inter.style.fontFamily}, ${anek_bangla.style.fontFamily}` };
export default function RootLayout({ children }) {
  const layout = cookies().get('react-resizable-panels:layout');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body style={font}>
        <Sidebar defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
