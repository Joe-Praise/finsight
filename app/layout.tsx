import type { Metadata } from 'next';
import { Geist, Geist_Mono, Karla, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import SidebarContent from '@/components/sidebar/SidebarContent';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const karla = Karla({
  variable: '--font-karla',
  subsets: ['latin'],
});
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Interest visualization',
  description:
    'Calculate your return on an investment on a particular interest rate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} 
        ${geistMono.variable}
        ${karla.variable}
        ${spaceGrotesk.variable}
         antialiased`}
      >
        <ThemeProvider>
          <main className='flex bg-background'>
            <aside className='md:block h-screen sticky top-0 bottom-0 z-50 '>
              <Sidebar>
                <SidebarContent />
              </Sidebar>
            </aside>
            <main className='w-full md:pt-10 px-2 overflow-y-hidden'>
              {children}
            </main>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
