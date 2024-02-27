// Next imports
import { NextRequest, NextResponse } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string; page: string } }
) {
  try {
    const email = params.email;
    const page = req.nextUrl.searchParams.get('page') || '1';

    let numberToSkip = 6 * (parseInt(page) - 1);

    const data = await prisma.post.findMany({
      skip: numberToSkip,
      take: 6,
      where: {
        authorEmail: email,
      },
      include: {
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
