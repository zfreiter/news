// Components imports
import PreviewPost from './PreviewPost';
// Types imports
import { TypePost } from '@/app/types';

const getPosts = async (): Promise<TypePost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {cache: 'no-cache' });
    const posts = await res.json();
    if (res.ok) {
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function PostContainer() {
  const posts = await getPosts();
 
  return (
    <div className='mt-6'>
      {posts && posts.length > 0 ? (
        posts.map((article, index) => (
          <PreviewPost
            key={index}
            id={article.id}
            title={article.title}
            content={article.content}
            author={article.author}
            categoryName={article.categoryName}
            createdAt={article.createdAt}
            imageUrl={article.imageUrl}
            userImageUrl={article.authorImageUrl}
          />
        ))
      ) : (
        <div>No Posts to display</div>
      )}
    </div>
  );
}
