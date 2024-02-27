'use client';
// React-Intersection-Observer imports
import { useInView } from 'react-intersection-observer';
// React imports
import { Suspense, useEffect, useState } from 'react';
// Types imports
import { TypePost } from '../app/types';
// Components imports
import { PreviewPostSkeleton } from './skeleton';
import PreviewPost from '@/components/PreviewPost';

export default function LoadMore({ email }: { email: string }) {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [page, setPage] = useState(2);
  const [finished, setFinished] = useState(false);
  const [ref, inView] = useInView();

  // Creates the infinite scroll effect
  useEffect(() => {
    const seachTitles = async (currentPage: string) => {
      const response = await fetch(`/api/bookmarks/${email}/?page=${currentPage}`, {
        cache: 'no-cache',
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return [];
      }

      const data = await response.json();

      setPosts([...posts, ...data]);
      setPage(page + 1);
      if (data.length === 0) {
        setFinished(true);
      }
    };
    if (inView) {
      seachTitles(page.toString());
    }
  }, [inView]);

  return (
    <>
      {posts.map((article) => (
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
      ))}
      {finished ? null : <div ref={ref}>Load more ...</div>}
    </>
  );
}
