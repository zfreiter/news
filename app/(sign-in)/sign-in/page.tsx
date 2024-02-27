// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
// Next imports
import { redirect } from 'next/navigation';
// Components imports
import SignIn from '@/components/SignIn';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return <SignIn />;
}
