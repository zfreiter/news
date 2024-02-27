'use client';
// Next-Auth imports
import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
