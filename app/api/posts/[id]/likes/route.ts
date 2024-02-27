// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = params.id;
  const { authorEmail } = await req.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: id,
        authorEmail: authorEmail,
      },
    });
    // If the Like record is found, delete it. If it's not found, create it.
    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          like: true,
          postId: id,
          authorEmail: authorEmail,
        },
      });
    }

    // Count the total number of Like records associated with the post
    const totalLikes = await prisma.like.count({
      where: {
        postId: id,
      },
    });

    return NextResponse.json({ totalLikes: totalLikes, like: !like }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function GET(reg: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = params.id;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: id,
        authorEmail: session?.user?.email || '',
      },
    });

    // Count the total number of Like records associated with the post
    const totalLikes = await prisma.like.count({
      where: {
        postId: id,
      },
    });

    return NextResponse.json({ like: like, totalLikes: totalLikes }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
