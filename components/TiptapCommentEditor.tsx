'use client';
// TipTap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// React imports
import { useEffect } from 'react';
// Components imports
import ToolbarCommentMini from './ToolbarCommentMini';

export default function TiptapCommentEditor({ postId }: { postId: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({
        placeholder: 'Comment…',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:absolute text-gray-400 before:pointer-events-none',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'border-2 border-black rounded-lg min-h-[150px] mb-2 px-4 py-2 focus:outline-none whitespace-pre-wrap hover:whitespace-break-spaces',
      },
    },
  });

  // useEffect(() => {
  //   if (editor) {
  //     editor.commands.focus();
  //   }
  // }, [editor]);

  return (
    <>
      <EditorContent editor={editor} />
      <ToolbarCommentMini editor={editor} postId={postId} />
    </>
  );
}
