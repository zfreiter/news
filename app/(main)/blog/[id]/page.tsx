// Types imports
import { TypePost } from '@/app/types';
// Next-auth imports
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
// Next imports
import { redirect } from 'next/navigation';
// React imports
import { Suspense } from 'react';
// Components imports
import { PostSkeleton } from '@/components/skeleton';
import Post from '@/components/Post';

const getPost = async (id: string): Promise<TypePost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, { cache: 'no-cache'});
    const posts = await res.json();
    if (res.ok) {
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in');
  }

  const post = await getPost(params.id);

  return post ? (
    <main>
      <Suspense fallback={<PostSkeleton />}>
        <Post
          id={post?.id}
          title={post?.title}
          content={post?.content}
          imageUrl={post?.imageUrl}
          publicId={post?.publicId}
          categoryName={post?.categoryName}
          authorEmail={post.authorEmail}
          links={post?.links}
          comments={post?.comments}
          createdAt={post?.createdAt}
          updatedAt={post?.updatedAt}
          author={{
            name: post?.author?.name,
          }}
          likes={post?.likes}
        />
      </Suspense>
    </main>
  ) : (
    <main>
      <div>loading</div>
    </main>
  );
}
