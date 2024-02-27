// React imports
import { Suspense } from 'react';
// Next imports
import { unstable_noStore as noStore } from 'next/cache';
// Types imports
import { TypePost } from '../app/types';
// Components imports
import PreviewPost from '@/components/PreviewPost';
import LoadMore from './LoadMore';
import { PreviewPostSkeleton } from './skeleton';

const seachTitles = async (title: string): Promise<TypePost[] | []> => {
  noStore();

  const url = title
    ? `${process.env.NEXTAUTH_URL}/api/search/?query=${title}`
    : `${process.env.NEXTAUTH_URL}/api/posts`;

  const response = await fetch(url, { cache: 'no-cache' });

  if (!response.ok) {
    console.error(`Error: ${response.status}`);
    return [];
  }

  const data = await response.json();

  return data;
};

export default async function PreviewContainer({ query }: { query: string }) {
  const posts = await seachTitles(query);

  return (
    <main className='mt-6'>
      {posts && posts.length > 0 ? (
        posts.map((article) => (
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
        <div>No Posts to display</div>
      )}
      {posts && posts.length > 5 && <LoadMore query={query} />}
    </main>
  );
}
