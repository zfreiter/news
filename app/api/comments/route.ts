// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { richText, postId } = await req.json();

  if (!richText || !postId || !session?.user?.email) {
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 404 });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: richText,
        postId,
        authorEmail: session?.user?.email,
        authorImageUrl: session?.user?.image,
      },
    });

    return NextResponse.json(newComment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
