'use client';
import { signOut } from 'next-auth/react';

type Account = {
  name: string;
  email: string;
  likes: number;
  posts: number;
  comments: number;
};

type AccountProps = {
  account: Account;
};

const handleAccountDeletion = async (email: string) => {
  const deleteAccount = confirm(
    'Are you sure you want to delete your account? This action cannot be undone.'
  );
  if (deleteAccount) {
    const response = await fetch(`/api/account/delete/${email}`, {
      cache: 'no-cache',
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok && data.message === 'OK') {
      await signOut({ callbackUrl: '/sign-in' });
    }
  }
};

export default function Account({ account }: AccountProps) {
  console.log(account);
  return (
    <div className='flex flex-col flex-1 mt-8'>
      <div className=' '>
        <h1>Account</h1>
        <p>Name: {account.name}</p>
        <p>Email: {account.email}</p>
        <p>Posts: {account.posts}</p>
        <p>Comments: {account.comments}</p>
        <p>Likes: {account.likes}</p>
      </div>
      <div className='mt-2 '>
        <button
          className='bg-red-500 hover:bg-red-300 px-2 py-1 text-white rounded-lg'
          onClick={(e) => handleAccountDeletion(account.email)}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
