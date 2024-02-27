'use client';
// React imports
import {  useEffect, useRef } from 'react';
// Next-auth imports
import { useSession } from 'next-auth/react';
// Next imports
import Image from 'next/image';
// Types imports
import type { TypeComment } from '@/app/types';
// Components imports
import { Comment } from './Comment';
import TiptapCommentEditor from './TiptapCommentEditor';

type Props = {
  id: string;
  showComments: boolean;
  setShowComments: (showComments: boolean) => void;
  comments: TypeComment[];
};

export default function CommentContainer({ id, showComments, setShowComments, comments }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // handle clicks ouside comment container to close it
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current?.contains(e.target as Node)) {
        setShowComments(false);
      }
    };

    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, [showComments, setShowComments]);

  return (
    <>
      <div
        ref={containerRef}
        className={`z-50 h-screen w-full sm:w-3/5 md:w-3/5 lg:w-2/6 p-4 bg-white shadow-lg rounded-bl-lg fixed top-0  ${
          showComments ? 'right-0' : '-right-full '
        }  duration-3 transition-all overflow-y-scroll`}
      >
        <div className='flex justify-between'>
          <div className='font-semibold'>{`Responses(${comments.length})`}</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-8 h-8 hover:fill-red-200 hover:scale-105 cursor-pointer'
            onClick={() => setShowComments(false)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <div className='flex items-center gap-2 mt-4 mb-2'>
          <Image
            src={session?.user?.image || ''}
            height={30}
            width={30}
            alt='profile image'
            className='z-50 rounded-full'
          />
          {session?.user?.name}
        </div>
        <TiptapCommentEditor postId={id} />

        {comments.length > 0 &&
          comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        {comments.length === 0 && <div>No Comments to display</div>}
      </div>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 h-full w-full  z-30  ${
          showComments ? '' : 'hidden'
        }  duration-300 transition-all overflow-hidden`}
      ></div>
    </>
  );
}
