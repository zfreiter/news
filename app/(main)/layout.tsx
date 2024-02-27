// Next imports
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
// Components imports
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NextAuthProvider } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stories for you',
  description: 'Stories for you, written by you.',
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
          <div className='z-30 bg-white max-w-[680px] sm:px-16 mx-auto py-4 shadow-xl flex flex-col min-h-screen px-8'>
            <Navbar />
            {children}
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
