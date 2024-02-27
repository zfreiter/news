import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import { TypePost } from '@/app/types';
import EditPostForm from '@/components/EditPostForm';

const getStory = async (id: string): Promise<TypePost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, { cache: 'no-cache' });

    if (res.ok) {
      const story = res.json();
      return story;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in');
  }

  const id = params.id;
  const story = await getStory(id);

  return <>{story ? <EditPostForm story={story} /> : <div>No story</div>}</>;
}
