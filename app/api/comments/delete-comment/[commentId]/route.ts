// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function DELETE(req: Request, { params }: { params: { commentId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const commentId = params.commentId;

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
