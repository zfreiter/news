'use client';
// React imports
import { useState, useEffect, useRef, memo } from 'react';
// types imports
import { TypeComment } from '@/app/types';
// Lucide icons imports
import { MoreHorizontal } from 'lucide-react';
// Next imports
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// next-auth imports
import { useSession } from 'next-auth/react';
// Components imports
import TiptapUpdateCommentEditor from './TiptapUpdateCommentEditor';

type CommentProps = {
  comment: TypeComment;
};

export const Comment = memo(function Comment({ comment }: CommentProps) {
  const [content, setContent] = useState<string>(comment.content);
  const [editable, setEditable] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const dotsRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const deleteComment = async (commentId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    const res = await fetch(`/api/comments/delete-comment/${commentId}`, {
      cache: 'no-cache',
      method: 'DELETE',
    });

    if (res.ok) {
      console.log('Comment deleted');
      router.refresh();
    }
  };

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

  const handleOptions = () => {
    setShowOptions(false);
    setEditable(true);
  };

  return (
    <div className='relative py-4 border-t'>
      <div className='flex justify-between  '>
        <div className='flex items-center gap-2 text-sm mb-2'>
          <div>
            <Image
              src={comment.authorImageUrl || ''}
              height={35}
              width={35}
              alt='profile image'
              className='z-50 rounded-full'
            />
          </div>
          <div className=''>
            <div>{comment?.author?.name}</div>
            <div>{comment?.createdAt?.slice(0, 10)}</div>
          </div>
        </div>
        {comment.authorEmail === session?.user?.email && !editable && (
          <button
            aria-label='Options button to edit or delete comment'
            ref={dotsRef}
            type='button'
            className='flex'
            onClick={() => setShowOptions(!showOptions)}
          >
            <MoreHorizontal className='hover:text-emerald-600 text-slate-800' />
          </button>
        )}
        <div
          className={
            showOptions
              ? 'z-40 absolute top-12 right-2 border-l-2 border-t-2 border-slate-200 bg-white w-4 h-4 rotate-45 '
              : 'hidden'
          }
        ></div>
        <div
          ref={optionsRef}
          className={
            showOptions
              ? 'absolute flex flex-col items-end border border-slate-200 bg-white shadow-lg p-4 rounded-lg top-14 right-0 z-30  text-slate-500 '
              : 'hidden'
          }
        >
          <button className='' onClick={handleOptions}>
            edit
          </button>
          <button className='' onClick={() => deleteComment(comment.id)}>
            delete
          </button>
        </div>
      </div>

      {editable ? (
        <TiptapUpdateCommentEditor
          content={content}
          oldContent={comment.content}
          onChange={setContent}
          commentId={comment.id}
          setEditable={setEditable}
        />
      ) : (
        <div
          className='mt-4 mb-5 prose break-words whitespace-pre-wrap'
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </div>
  );
});
