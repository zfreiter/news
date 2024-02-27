// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function PUT(req: Request, { params }: { params: { commentId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const commentId = params.commentId;
  const { richText } = await req.json();

  if (!richText) {
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 404 });
  }

  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: richText,
      },
    });
   
    return NextResponse.json(updatedComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
