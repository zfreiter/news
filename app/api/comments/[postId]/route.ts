// Next imports
import { NextResponse } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: Request, { params }: { params: { postId: string } }) {
  const postId = params.postId;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error, something went wrong', error: error },
      { status: 500 }
    );
  }
}
