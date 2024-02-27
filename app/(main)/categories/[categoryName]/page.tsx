// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/authOptions';
// Next imports
import { redirect } from 'next/navigation';
// React imports
import { Suspense } from 'react';
// Components imports
import { PreviewPostSkeleton } from '@/components/skeleton';
import PreviewPost from '@/components/PreviewPost';

const getCategoryPosts = async (category: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${category}`, {
      cache: 'no-cache',
    });

    const posts = await res.json();

    if (res.ok) {
      return posts.posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function page({ params }: { params: { categoryName: string } }) {
  const category = params.categoryName;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  const posts = await getCategoryPosts(category);

  return (
    <>
      <h1 className='text-2xl font-semibold mt-4'>
        <span className=' font-normal'>Category:</span> {decodeURIComponent(category)}
      </h1>
      {posts.map((article: any, index: string) => (
        <Suspense key={index} fallback={<PreviewPostSkeleton />}>
          <PreviewPost
            key={index}
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
      ))}
    </>
  );
}
