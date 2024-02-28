// Next imports
import { NextRequest, NextResponse } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  const email = params.email;
  const page = req.nextUrl.searchParams.get('page') || '1';

  let numberToSkip = 6 * (parseInt(page) - 1);
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        bookmarks: true,
      },
    });

    const posts = await prisma.post.findMany({
      skip: numberToSkip,
      take: 6,
      where: {
        id: {
          in: user?.bookmarks || [],
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
