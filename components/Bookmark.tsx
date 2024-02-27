// Icon: Heroicons
import { BookmarkIcon } from '@heroicons/react/24/outline';
// Next imports
import { useRouter } from 'next/navigation';
// React imports
import { useEffect, useState } from 'react';

type TypeBookmarks = {
  postId: string;
};

export default function Bookmark({ postId }: TypeBookmarks) {
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const router = useRouter();
  const updateBookmarks = async (postId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts/${postId}/bookmark`,
        { cache: 'no-cache', method: 'POST', headers: { 'Content-Type': 'application/json' } }
      );
      const bookmark = await res.json();
      setIsBookmark(bookmark.update);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getBookmarks = async (postId: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts/${postId}/bookmark`,
          {
            cache: 'no-cache',
          }
        );
        const bookmark = await res.json();

        if (bookmark.update) {
          setIsBookmark(true);
        } else {
          setIsBookmark(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarks(postId);
  }, [postId]);

  return (
    <BookmarkIcon
      className={`h-6 w-6 text-gray-500 ${isBookmark && 'fill-indigo-500 text-indigo-500'}`}
      onClick={() => updateBookmarks(postId)}
    />
  );
}
