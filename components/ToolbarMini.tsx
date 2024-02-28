'use client';
// TipTap imports
import { Editor } from '@tiptap/react';
// Lucide icons imports
import { Bold, Italic, Strikethrough } from 'lucide-react';
// React imports
import { useEffect, useState } from 'react';
// Next imports
import { useRouter } from 'next/navigation';

type Props = {
  editor: Editor | null;
  commentId: string;
  setEditable: (showOptions: boolean) => void;
  originalContent: string;
  onChange: (richText: string) => void;
};

export default function ToolbarMini({
  editor,
  commentId,
  setEditable,
  originalContent,
  onChange,
}: Props) {
  const [empty, setempty] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const editorStrLen = editor?.getHTML().length;
  const router = useRouter();

  useEffect(() => {
    setempty(editor ? editor.getHTML().length : null);
  }, [editorStrLen, editor]);

  if (!editor) return null;

  const originalContentString = originalContent;

  const updateComment = async (commentId: string) => {
    setLoading(true);
    const richText = editor.getHTML();
    const res = await fetch(`/api/comments/update-comment/${commentId}`, {
      cache: 'no-cache',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ richText: richText }),
    });

    if (res.ok) {
      setEditable(false);
      router.refresh();
    } else {
      console.log('error');
    }
    setLoading(false);
  };

  const cancelUpdate = (editor: Editor) => {
    !editor.can().chain().focus().toggleBold().run();
    !editor.can().chain().focus().toggleItalic().run();
    !editor.can().chain().focus().toggleStrike().run();
    onChange(originalContentString);
    setEditable(false);
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-1'>
        <button
          aria-label='Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive('bold')
              ? 'is-active text-black bg-slate-300 rounded-md p-2'
              : 'hover:bg-slate-300 text-black rounded-md p-2'
          }
        >
          <Bold className='w-4 h-4' />
        </button>

        <button
          aria-label='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic')
              ? 'is-active text-black bg-slate-300 rounded-md p-2'
              : 'hover:bg-slate-300 text-black rounded-md p-2'
          }
        >
          <Italic className='w-4 h-4' />
        </button>

        <button
          aria-label='Strikethrough'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive('strike')
              ? 'is-active text-black bg-slate-300 rounded-md p-2'
              : 'hover:bg-slate-300 text-black rounded-md p-2'
          }
        >
          <Strikethrough className='w-4 h-4' />
        </button>
      </div>
      <div className='flex gap-2'>
        <button
          type='button'
          disabled={loading}
          className={`disabled:bg-gray-400 bg-orange-400 hover:bg-orange-200
        } text-white font-medium px-2 py-1 rounded-lg`}
          onClick={() => cancelUpdate(editor)}
        >
          {loading ? 'loading' : 'Cancel'}
        </button>
        <button
          type='button'
          disabled={loading || empty === 7}
          className={` disabled:bg-gray-400 bg-blue-400 hover:bg-blue-200
          } text-white px-2 py-1 rounded-lg`}
          onClick={() => updateComment(commentId)}
        >
          {loading ? 'Sending...' : 'Update'}
        </button>
      </div>
    </div>
  );
}
