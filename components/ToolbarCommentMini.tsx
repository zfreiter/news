'use client';
// TipTap imports
import { Editor } from '@tiptap/react';
// Lucide icons imports
import { Bold, Italic, Strikethrough } from 'lucide-react';
// React imports
import { use, useEffect, useState } from 'react';
// Next imports
import { useRouter } from 'next/navigation';

type Props = {
  editor: Editor | null;
  postId: string;
};

export default function ToolbarMini({ editor, postId }: Props) {
  const [empty, setEmpty] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const editorStrLen = editor?.getHTML().length;
  const router = useRouter();

  useEffect(() => {
    setEmpty(editor ? editor.getHTML().length : null);
  }, [editorStrLen, editor]);

  if (!editor) return null;

  const createComment = async (id: string) => {
    setLoading(true);
    const richText = editor.getHTML();
    if (richText.trim().length === 7) {
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/comments`, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ richText, postId: id }),
    });

    if (res.ok) {
      editor.commands.clearContent();

      router.refresh();
    }
    setLoading(false);
  };

  const cancelUpdate = (editor: Editor) => {
    editor.commands.clearContent();
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-2'>
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
            <Bold size={16} />
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
            <Italic size={16} />
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
            <Strikethrough size={16} />
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
            onClick={() => createComment(postId)}
          >
            {loading ? 'Sending...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
