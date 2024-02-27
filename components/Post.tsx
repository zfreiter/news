'use client';
// next imports
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// next-auth imports
import { useSession } from 'next-auth/react';
// react imports
import { useState, useEffect, useRef } from 'react';
// Icons: Lucide imports
import { MoreHorizontal } from 'lucide-react';
// components imports
import CommentContainer from './CommentContainer';
import DeletePostButton from './DeletePostButton';
import Likes from './Likes';
// types imports
import { TypePost } from '@/app/types';
import Follow from './Bookmark';

export default function Post({
  id,
  title,
  content,
  imageUrl,
  publicId,
  categoryName,
  authorEmail,
  links,
  comments,
  createdAt,
  updatedAt,
  author,
  likes,
}: TypePost) {
  // need to replace the image with the image from the database
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const linkRef = useRef<HTMLButtonElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current?.contains(e.target as Node) &&
        dotsRef.current &&
        !dotsRef.current?.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, [showOptions]);

  return (
    <article className='border-b pt-8 pb-6'>
      <div>
        <span className=''>
          {pathName.slice(1, 5) === 'blog' && author.name ? author.name : 'anonymous'}
        </span>
        &#x2022; {createdAt.slice(0, 10)}
      </div>

      <div className='text-2xl font-bold mt-4 mb-3'>{title}</div>

      {/* Open comments */}
      <div className='mb-8 '>
        <hr />
        <div className='flex justify-between py-2'>
          <div className='flex gap-2'>
            <button
              aria-label='Open comment section for art'
              ref={linkRef}
              onClick={(e) => setShowComments(true)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6 stroke-slate-500 hover:stroke-indigo-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                />
              </svg>
            </button>
            <Likes id={id} authorEmail={session?.user?.email ? session?.user?.email : ''} />
          </div>

          {/* three dots */}
          <div className='flex gap-3'>
            <Follow postId={id} />
            {pathName.slice(1, 5) === 'blog' && session?.user?.email === authorEmail && (
              <div ref={dotsRef} className='relative'>
                <MoreHorizontal
                  className='hover:text-emerald-600 text-slate-800'
                  onClick={() => setShowOptions(!showOptions)}
                />

                <div
                  className={`z-40 absolute right-[2.5px] top-8 border-l border-t border-slate-200 bg-white w-4 h-4 rotate-45  ${
                    showOptions ? 'flex' : 'hidden'
                  }`}
                ></div>
                <div
                  ref={optionsRef}
                  className={`z-30 absolute border border-slate-200 bg-white top-10 -right-2 p-6 rounded-lg flex-col gap-2 text-right select-none shadow-2xl ${
                    showOptions ? 'flex' : 'hidden'
                  }`}
                >
                  <ul className='flex flex-col min-w-max'>
                    {session?.user?.email === authorEmail && (
                      <>
                        <li className='hover:underline'>
                          <Link href={`/edit-post/${id}`} className=' hover:cursor-pointer'>
                            Edit Post
                          </Link>
                        </li>
                        <li>
                          <DeletePostButton id={id} publicId={publicId} />
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}{' '}
          </div>
        </div>
        <hr />
      </div>

      <div className='w-full h-72 relative'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            className='rounded-xl'
            alt='Story Image'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='flex justify-center items-center w-full h-full bg-slate-100 rounded-xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-60 h-60'
            >
              <path
                fillRule='evenodd'
                d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        )}
      </div>

      {categoryName && (
        <div className='mt-4'>
          <Link
            href={`/categories/${categoryName}`}
            className='text-sm text-gray-800 bg-gray-200 hover:bg-indigo-200 px-4 py-1 rounded-full cursor-pointer'
          >
            {categoryName}
          </Link>
        </div>
      )}
      <div
        className='mt-4 mb-5 prose max-w-none'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className='flex flex-col'>
        {links.length > 0 &&
          links.map((link, index) => (
            <a key={index} href={link} className='text-purple-700'>
              {link}
            </a>
          ))}
      </div>

      <CommentContainer
        id={id}
        showComments={showComments}
        setShowComments={setShowComments}
        comments={comments}
      />
    </article>
  );
}
