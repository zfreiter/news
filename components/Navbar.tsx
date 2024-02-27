'use client';
// next imports
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// react imports
import { useState, useRef, useEffect, Suspense } from 'react';
// next-auth imports
import { useSession, signOut } from 'next-auth/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
// svg imports
import pen from '../public/pen.svg';
// components imports
import Search from './Search';
import { UserPictureSkeleton } from './skeleton';

export default function Navbar() {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const { status, data: session } = useSession();
  const pathName = usePathname();

  const profileRef = useRef<HTMLDivElement>(null);
  const showRef = useRef<HTMLImageElement>(null);

  // handle click outside profile dropdown to close it
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current?.contains(e.target as Node) &&
        showRef.current &&
        !showRef.current?.contains(e.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleMouseClick);

    if (!showProfile) {
      document.removeEventListener('mousedown', handleMouseClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, [showProfile]);

  // handle navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > window.scrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      setScrollY(window.scrollY);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <nav
      className={`bg-white top-0 z-30 border-b ${showNavbar ? 'sticky' : 'relative shadow-none'}`}
    >
      {/* Logo */}
      <div className='flex min-[305px]:items-center max-[304px]:gap-4 justify-between py-4 min-[600px]:mb-3'>
        <Link href={'/'}>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-8 min-[305px]:w-10 min-[305px]:h-10'>
              <Image src={pen} width={0} height={0} alt='logo' className='w-auto h-auto' />
            </div>
            <h1 className='mb-0 bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent text-4xl font-semibold'>
              Stories
            </h1>
          </div>
        </Link>

        {/* SearchBar */}
        {pathName === '/' && (
          <div className='hidden min-[600px]:block'>
            <Suspense fallback={<>placeholder</>}>
              <Search placeholder='Search...' />
            </Suspense>
          </div>
        )}

        {/* User Options and Sign-in */}
        <div className='flex gap-4'>
          {status === 'authenticated' && (
            <>
              <div
                ref={profileRef}
                className={`z-30 absolute border border-slate-200 bg-white shadow-2xl top-16 right-0 p-6 rounded-lg flex-col gap-2 text-right ${
                  showProfile ? 'flex' : 'hidden'
                }`}
              >
                <div>
                  <span className=''>{session?.user?.name}</span>
                </div>
                <div>
                  <span className=''>{session?.user?.email}</span>
                </div>
                <Link
                  href={'/create-post'}
                  className='flex gap-2 justify-end hover:underline'
                  onClick={() => setShowProfile(false)}
                >
                  <PencilSquareIcon className='w-6 h-6' />
                  Post
                </Link>

                <Link
                  href={'/dashboard'}
                  className='hover:underline'
                  onClick={() => setShowProfile(false)}
                >
                  Dashboard
                </Link>

                <Link
                  href={'/bookmarks'}
                  className='hover:underline'
                  onClick={() => setShowProfile(false)}
                >
                  Bookmarks
                </Link>

                <Link
                  href={'/account'}
                  className='hover:underline'
                  onClick={() => setShowProfile(false)}
                >
                  Account
                </Link>

                <button
                  className='text-right hover:underline hover:text-red-500 '
                  onClick={() => signOut({ callbackUrl: '/sign-in' })}
                >
                  sign-out
                </button>
              </div>
              <Suspense fallback={<UserPictureSkeleton />}>
                <Image
                  ref={showRef}
                  src={session?.user?.image || ''}
                  height={40}
                  width={40}
                  alt='profile image'
                  className='z-50 rounded-full cursor-pointer max-[305px]:w-8 max-[305px]:h-8 max-[305px]:self-center'
                  onClick={() => setShowProfile((current) => !current)}
                />
              </Suspense>
            </>
          )}
          {status !== 'authenticated' && (
            <Link
              className='bg-slate-200 font-semibold px-4 py-2 rounded-lg hover:scale-105 cursor-pointer'
              href={'/sign-in'}
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
      {pathName === '/' && (
        <div className='mb-7 min-[600px]:hidden'>
          <Search placeholder='Search ...' />
        </div>
      )}
    </nav>
  );
}
