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

export default function LoadMore({ query }: { query: string }) {
  const [posts, setPosts] = useState<TypePost[]>([]);
  const [page, setPage] = useState(2);
  const [finished, setFinished] = useState(false);
  const [ref, inView] = useInView();

  // Creates the infinite scroll effect
  useEffect(() => {
    const seachTitles = async (query: string, currentPage: string) => {
      const url = query
        ? `/api/search/?query=${query}&page=${currentPage}`
        : `/api/posts/?page=${currentPage}`;

      const response = await fetch(url, { cache: 'no-cache' });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return [];
      }

      const data = await response.json();

      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
      if (data.length === 0) {
        setFinished(true);
      }
    };
    if (inView) {
      seachTitles(query, page.toString());
    }
  }, [inView, query, page]);

  // reset the page and posts when the query changes
  useEffect(() => {
    setPage(2);
    setPosts([]);
    setFinished(false);
  }, [query]);

  return (
    <>
      {posts.map((article, index) => (
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
      {finished ? null : <div ref={ref}>Load more ...</div>}
    </>
  );
}
