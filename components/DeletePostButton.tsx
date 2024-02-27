'use client';
// Nexth imports
import { useRouter } from 'next/navigation';

type DeletePostButtonProps = {
  id: string;
  publicId: string;
};

const handleImageRemove = async (publicId: string) => {
  if (!publicId) return;
  try {
    const res = await fetch('api/removeImage', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });

    if (res.ok) {
      console.log('image removed');
    }
  } catch (error) {
    console.log('handle image removal fail ', error);
  }
};

export default function DeletePostButton({ id, publicId }: DeletePostButtonProps) {
  const router = useRouter();

  const deletePost = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/posts/${id}`, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        handleImageRemove(publicId);

        router.push('/dashboard');
        console.log('Post deleted successfully');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className='hover:cursor-pointer hover:underline' onClick={() => deletePost(id)}>
      Delete Post
    </button>
  );
}
