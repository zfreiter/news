// Icons: Heroicons imports
import { ChatBubbleLeftIcon, HeartIcon } from '@heroicons/react/24/outline';

export function UserPictureSkeleton() {
  return <div className='h-10 rounded-full bg-gray-200  dark:bg-gray-700 w-10 '></div>;
}

export function PreviewPostSkeleton() {
  return (
    <div role='status' className='flex flex-col max-w-[552px] animate-pulse mt-6 mb-4'>
      <div className='flex items-center'>
        <div className='h-6 rounded-full bg-gray-200  dark:bg-gray-700 w-6 mb-4 mr-2'></div>
        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
      </div>
      <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4'></div>

      <div className='animate-pulse flex justify-between max-w-[552px] '>
        <div className='w-full pr-4'>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
          <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
        </div>

        <svg
          className='rounded-xl max-w-[200px] max-h-[200px] text-gray-200 dark:text-gray-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
      </div>

      <div className='h-6 flex bg-gray-200 animate-pulse rounded-full dark:bg-gray-700 w-28 mb-4'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div role='status' className='flex flex-col max-w-[552px] animate-pulse pt-8 pb-6'>
      <div className='h-2.5 bg-gray-200 rounded-full w-48 mb-4'></div>
      <div className='h-2.5 bg-gray-200 rounded-full w-full mb-4'></div>
      <div className='border-b bg-gray-200 w-full'></div>
      <div className='flex gap-4 my-4'>
        <ChatBubbleLeftIcon className='w-6 h-6 text-gray-200' />
        <HeartIcon className='w-6 h-6 text-gray-200' />
      </div>
      <div className='border-b bg-gray-200 '></div>
      <svg
        className='mx-auto my-6 w-60 h-60 rounded text-gray-200 dark:text-gray-600'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 18'
      >
        <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
      </svg>
      <div className='h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
    </div>
  );
}
