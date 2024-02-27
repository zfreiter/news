// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { name: true } },
        likes: true,
        comments: { include: { author: { select: { name: true } } } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, links, comments, category, imageUrl, publicId, authorEmail } =
    await req.json();
  const id = params.id;

  try {
    // get the current category of the post
    const postCat = await prisma.post.findUnique({
      where: { id },
    });

    // Checking if the category of the post has changed
    // If it has, we need to check if the old category is empty
    // If it is, we delete it
    if (postCat?.categoryName !== category) {
      // get the old category count
      const categoryOldCount = await prisma.post.count({
        where: { categoryName: postCat?.categoryName },
      });

      if (categoryOldCount === 1) {
        await prisma.category.delete({
          where: { categoryName: postCat?.categoryName || '' },
        });
      }

      // check if the new category exists
      const newCategory = await prisma.category.findUnique({
        where: { categoryName: category },
      });

      if (!newCategory) {
        await prisma.category.create({
          data: {
            categoryName: category,
          },
        });
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        comments,
        categoryName: category,
        imageUrl,
        publicId,
        authorEmail: authorEmail,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const id = params.id;

    // Delete all Like records associated with the Post
    await prisma.like.deleteMany({
      where: {
        postId: id,
      },
    });

    // Delete all Comment records associated with the Post
    await prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });

    // Delete all Comment records associated with the Post
    const post = await prisma.post.delete({ where: { id } });

    const categoryName: string | null = post.categoryName;

    const categoryCount = await prisma.post.count({
      where: { categoryName },
    });

    if (categoryCount === 0 && categoryName !== null) {
      const category = await prisma.category.delete({
        where: { categoryName },
      });
    }

    return NextResponse.json({ post: post, category: categoryName });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
