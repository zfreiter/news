// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
// Next imports
import { redirect } from 'next/navigation';
// Types imports
import { TypePost } from '../../types';
// React imports
import { Suspense } from 'react';
// Components imports
import { PreviewPostSkeleton } from '@/components/skeleton';
import LoadMoreBookmark from '@/components/LoadMoreBookmark';
import PreviewPost from '@/components/PreviewPost';

const getPosts = async (email: string): Promise<TypePost[] | []> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/bookmarks/${email}`, {
      cache: 'no-cache',
    });
    const posts = await res.json();

    return posts;
  } catch (error) {
    return [];
  }
};

export default async function page() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let authorPosts: TypePost[] = [];

  if (!session) {
    redirect('/sign-in');
  }

  if (email) {
    authorPosts = await getPosts(email);
  }

  return (
    <main className='mt-6'>
      {authorPosts && authorPosts.length > 0 ? (
        authorPosts.map((article) => (
          <Suspense key={article.id} fallback={<PreviewPostSkeleton />}>
            <PreviewPost
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
              author={article.author}
              categoryName={article.categoryName}
              createdAt={article.createdAt}
              imageUrl={article.imageUrl}
              userImageUrl={article.authorImageUrl}
            />
          </Suspense>
        ))
      ) : (
        <div>No Bookmarks</div>
      )}
        {authorPosts && authorPosts.length > 0 && <LoadMoreBookmark email={email || ''} />}
    </main>
  );
}
