// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
// Next imports
import { redirect } from 'next/navigation';
// Components imports
import CreatePostForm from '@/components/CreatePostFormt';

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in');
  }

  return <CreatePostForm />;
}
