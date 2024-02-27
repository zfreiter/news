'use client';
// TipTap imports
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Undo2,
  Redo2,
  List,
  ListOrdered,
  Pilcrow,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  RotateCcw,
  WrapText,
} from 'lucide-react';

type Props = {
  editor: Editor | null;
};

export function ToolbarFull({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className='flex flex-wrap px-2 py-1 gap-1 bg-gray-100 border border-slate-200 rounded-t-lg'>
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
        <Bold size={20} />
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
        <Italic size={20} />
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
        <Strikethrough size={20} />
      </button>

      <button
        aria-label='Highlight'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={
          editor.isActive('highlight')
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Highlighter size={20} />
      </button>

      <button
        aria-label='Code'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive('code')
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Code size={20} />
      </button>

      <button
        aria-label='Heading 1'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive('heading', { level: 1 })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Heading1 size={20} />
      </button>

      <button
        aria-label='Heading 2'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive('heading', { level: 2 })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Heading2 size={20} />
      </button>

      <button
        aria-label='Heading 3'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive('heading', { level: 3 })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Heading3 size={20} />
      </button>

      <button
        aria-label='Paragraph'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive('paragraph')
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <Pilcrow size={20} />
      </button>

      <button
        aria-label='Bullet List'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive('bulletList')
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <List size={20} />
      </button>

      <button
        aria-label='Ordered List'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive('orderedList')
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <ListOrdered size={20} />
      </button>

      <button
        aria-label='Align Left'
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={
          editor.isActive({ textAlign: 'left' })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <AlignLeft size={20} />
      </button>

      <button
        aria-label='Align Center'
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={
          editor.isActive({ textAlign: 'center' })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <AlignCenter size={20} />
      </button>

      <button
        aria-label='Align Right'
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={
          editor.isActive({ textAlign: 'right' })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <AlignRight size={20} />
      </button>

      <button
        aria-label='Align Justify'
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={
          editor.isActive({ textAlign: 'justify' })
            ? 'is-active text-black bg-slate-300 rounded-md p-2'
            : 'hover:bg-slate-300 text-black rounded-md p-2'
        }
      >
        <AlignJustify size={20} />
      </button>

      <button
        aria-label='Remove Alignment'
        onClick={() => editor.chain().focus().unsetTextAlign().run()}
        className='hover:bg-slate-300 text-black rounded-md p-2'
      >
        <RotateCcw size={20} />
      </button>

      <button
        aria-label='Hard Break'
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className='hover:bg-slate-300 text-black rounded-md p-2'
      >
        <WrapText size={20} />
      </button>

      <button
        aria-label='Undo'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className='hover:bg-slate-300 text-black rounded-md p-2'
      >
        <Undo2 size={20} />
      </button>

      <button
        aria-label='Redo'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className='hover:bg-slate-300 text-black rounded-md p-2'
      >
        <Redo2 size={20} />
      </button>
    </div>
  );
}
