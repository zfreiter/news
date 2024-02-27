// Next imports
import { NextRequest, NextResponse } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  const email = params.email;
  console.log('email response', email);
  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        email: true,
      },
    });

    const likesCount = await prisma.like.count({
      where: {
        authorEmail: email,
      },
    });

    const postsCount = await prisma.post.count({
      where: {
        authorEmail: email,
      },
    });

    const commentsCount = await prisma.comment.count({
      where: {
        authorEmail: email,
      },
    });

    const data = {
      ...user,
      likes: likesCount,
      posts: postsCount,
      comments: commentsCount,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}

