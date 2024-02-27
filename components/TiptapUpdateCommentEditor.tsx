'use client';
// TipTap imports
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// Components imports
import ToolbarMini from './ToolbarMini';
// React imports
import { useEffect } from 'react';

export default function TiptapUpdateCommentEditor({
  content,
  oldContent,
  onChange,
  commentId,
  setEditable,
}: {
  content: string;
  oldContent: string;
  onChange: (richText: string) => void;
  commentId: string;
  setEditable: (showOptions: boolean) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
      }),
      Placeholder.configure({
        placeholder: 'Comment…',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:absolute text-gray-400 before:pointer-events-none',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'border-black border-2 border-dashed rounded-lg min-h-[150px] mb-2 px-4 py-2 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });


  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  return (
    <>
      <EditorContent editor={editor} />
      <ToolbarMini
        editor={editor}
        commentId={commentId}
        setEditable={setEditable}
        originalContent={oldContent}
        onChange={onChange}
      />
    </>
  );
}
