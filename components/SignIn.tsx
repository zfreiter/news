'use client';
// Next imports
import Image from 'next/image';
// Next-auth imports
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className='bg-white pt-10 pb-20 rounded-lg mt-20'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <p className='text-2xl font-bold bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-2 mx-4 text-center mb-10'>
          Your place to create your Story
        </p>
        <p className='text-xl mt-6 pb-0 mb-4'>Sign in</p>
        <button
          className='flex items-center w-56 px-4 py-2 gap-2 rounded-full border'
          onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000' })}
        >
          <span>
            <Image src={'/github-icon.svg'} width={30} height={30} alt='GitHub Logo' />
          </span>
          Log in with Github
        </button>
        <button
          className='flex items-center w-56 px-4 py-2 gap-2 rounded-full border'
          onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000' })}
        >
          <span>
            <Image src={'/google-icon.svg'} width={30} height={30} alt='Google Logo' />
          </span>
          Log in with Google
        </button>
      </div>
    </div>
  );
}
