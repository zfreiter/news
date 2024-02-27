// Next imports
import { NextRequest, NextResponse } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';
// Next-auth imports
import { authOptions } from '../../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export async function DELETE(req: NextRequest, { params }: { params: { email: string } }) {
  const email = params.email;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json('User not found', { status: 404 });
  }

  try {
    // Get all posts of the user
    const userPosts = await prisma.post.findMany({
      where: {
        authorEmail: user?.email ?? '',
      },
      select: {
        id: true,
      },
    });

    // Extract the post IDs
    const userPostIds = userPosts.map((post) => post.id);

    // Delete likes and comments associated with the user's posts
    await prisma.$transaction([
        prisma.like.deleteMany({
          where: {
            postId: {
              in: userPostIds,
            },
          },
        }),
        prisma.comment.deleteMany({
          where: {
            postId: {
              in: userPostIds,
            },
          },
        }),
        prisma.post.deleteMany({
          where: {
            id: {
              in: userPostIds,
            },
          },
        }),
        prisma.like.deleteMany({
          where: {
            authorEmail: user?.email ?? '',
          },
        }),
        prisma.comment.deleteMany({
          where: {
            authorEmail: user?.email ?? '',
          },
        }),
        prisma.user.delete({
          where: {
            email: user?.email ?? '',
          },
        }),
      ]);
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('An error occurred while deleting the user and their data:', error);

    return NextResponse.json({ message: 'Error, unable to delete user' }, { status: 500 });
  }
}
