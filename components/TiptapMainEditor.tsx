'use client';
// Tiptap React imports
import { useEditor, EditorContent } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
// Components imports
import { ToolbarFull } from './ToolbarFull';

export default function TiptapMainEditor({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const extensions = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        HTMLAttributes: {
          class: 'list-disc  ml-8',
        },
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        HTMLAttributes: {
          class: 'list-decimal ml-8',
        },
      },
    }),
    Placeholder.configure({
      // Use a placeholder:
      placeholder: 'Write your story...',
      emptyEditorClass:
        'before:content-[attr(data-placeholder)] before:absolute text-gray-400 before:pointer-events-none',
    }),
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ];

  const editor = useEditor({
    extensions: extensions,
    content: description,
    editorProps: {
      attributes: {
        class:
          'border-t-0 border border-slate-200 rounded-b-lg min-h-[150px] mb-2 px-4 py-2 focus:outline-none prose max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <ToolbarFull editor={editor} />
      <EditorContent editor={editor} required/>
    </>
  );
}
