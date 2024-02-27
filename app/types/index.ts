// Type definitions for the app
export type TypeCategory = {
  id: string;
  categoryName: string;
  postds: string[];
};

type TypeAuthor = {
  name: string;
};

export type TypeComment = {
  id: string;
  author: {
    name: string;
  };
  authorEmail: string;
  authorImageUrl: string;
  content: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
};

type TypeLike = {
  id: string;
  postId: string;
  like: boolean;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type TypePost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  authorImageUrl?: string;
  publicId: string;
  categoryName: string;
  authorEmail: string;
  links: string[];
  comments: TypeComment[];
  createdAt: string;
  updatedAt: string;
  author: TypeAuthor;
  likes: TypeLike[];
};

export type TypeSamplePost = {
  id: string;
  title: string;
  content: string;
  author: TypeAuthor;
  categoryName: string;
  imageUrl: string;
  userImageUrl?: string;
  createdAt: string;
};
