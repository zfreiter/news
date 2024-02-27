'use client';
// Next imports
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Next auth imports
import { useSession } from 'next-auth/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
// types imports
import { TypeSamplePost } from '@/app/types';

export default function PreviewPost({
  id,
  title,
  content,
  author,
  categoryName,
  createdAt,
  imageUrl,
  userImageUrl,
}: TypeSamplePost) {
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleRouter = () => {
    if (session !== null || undefined) {
      router.push(`/blog/${id}`);
    } else {
      alert('You need to login to view this post');
    }
  };

  return (
    <article className={`border-b pb-8`}>
      <div className='flex items-center mt-6 mb-4 text-sm'>
        {pathName !== '/dashboard' ? (
          <>
            <Image
              src={userImageUrl ? userImageUrl : '/images/placeholder.png'}
              width={25}
              height={25}
              className='mr-2  rounded-full'
              alt='Profile picture'
            />
            <span className='text-sm'>
              {author?.name ? author.name : 'anonymous'} &#x2022; {createdAt.slice(0, 10)}
            </span>
          </>
        ) : (
          <span>Created: {createdAt.slice(0, 10)}</span>
        )}
      </div>
      {/* Main content */}

      <div
        className={`flex justify-between h-28 w-full overflow-hidden ${
          session !== null || undefined ? 'cursor-pointer' : ''
        }`}
        onClick={handleRouter}
      >
        {/* Title and preview of the post */}
        <div>
          <div className='line-clamp-[4] font-bold mb-1'>{title}</div>
          <div
            className='hidden sm:line-clamp-[4] pr-4 text-sm prose-h1:text-base prose-h1:m-0 prose-h2:text-base prose-h2:m-0 prose-h3:text-base prose-h3:m-0 '
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>

        {/* Image */}
        <div className=''>
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={112}
              height={112}
              className={` min-w-[112px] w-28 h-28 ${
                session !== null || undefined ? 'cursor-pointer' : ''
              }`}
              alt='Place holder'
            />
          ) : (
            <div className={`flex flex-col justify-center items-center w-28 h-28 rounded-xl `}>
              <div className='flex items-center justify-center w-28 h-28 bg-gray-200 rounded-xl'>
                <PhotoIcon className='w-20 h-20 text-gray-400' />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div className='flex justify-between items-center mt-4 min-w-min'>
        {categoryName && (
          <Link
            href={`/categories/${categoryName}`}
            className='text-xs lg:text-sm text-gray-800 bg-gray-100 hover:bg-indigo-200 px-4 py-1 rounded-full cursor-pointer'
          >
            {categoryName}
          </Link>
        )}
      </div>
    </article>
  );
}
