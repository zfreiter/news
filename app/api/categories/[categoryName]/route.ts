// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: Request, { params }: { params: { categoryName: string } }) {
  const categoryName = params.categoryName;

  try {
    const posts = await prisma.category.findUnique({
      where: { categoryName },
      include: {
        posts: {
          include: { author: { select: { name: true, email: true } }, comments: { include: { author: { select: { name: true } } } }},
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { categoryName: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const categoryName = params.categoryName;
    const categoryCount = await prisma.post.count({
      where: { categoryName },
    });
    if (categoryCount === 0) {
      const category = await prisma.category.delete({
        where: { categoryName },
      });
      return NextResponse.json({ message: `Category ${categoryName} deleted` });
    }

    return NextResponse.json({ message: `Category ${categoryName} not deleted` });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
