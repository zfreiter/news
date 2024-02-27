// Next-auth imports
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Account from '@/components/Account';
import { getServerSession } from 'next-auth';
// Next imports
import { redirect } from 'next/navigation';

type Account = {
  name: string;
  email: string;
  likes: number;
  posts: number;
  comments: number;
};

const getAccountInfo = async (email: string): Promise<Account> => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/account/${email}`, {
      cache: 'no-cache',
    });

    const account = await response.json();
    return account;
  } catch (error) {
    console.log(error);
    return { name: 'Error', email: 'Error', likes: 0, posts: 0, comments: 0 };
  }
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!session || !email) {
    redirect('/sign-in');
  }

  const account = await getAccountInfo(email);

  return <Account account={account} />;
}
