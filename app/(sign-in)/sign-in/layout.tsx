// Next imports
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../globals.css';
// Components imports
import { NextAuthProvider } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login to Stories for you',
  description: 'Login page for Stories for you',
  icons: {
    icon: '/_next/static/media/metadata/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-gradient-to-r from-indigo-200 from-10% via-sky-200 via-30% to-emerald-200 to-90% -z-20`}
      >
        <NextAuthProvider>
          <div className='z-30  max-w-[450px] sm:px-16 mx-auto py-4 flex flex-col min-h-screen px-8'>
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
