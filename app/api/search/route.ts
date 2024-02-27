// This is the route file for the search API
// This file is responsible for searching and fetching posts
// Next imports
import { NextResponse, NextRequest } from 'next/server';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest, res: NextResponse) {
  const title = req.nextUrl.searchParams.get('query') || '';
  const page = req.nextUrl.searchParams.get('page') || '1';

  let numberToSkip = 6 * (parseInt(page) - 1);

  const posts = await prisma.post.findMany({
    skip: numberToSkip,
    take: 6,
    where: {
      OR: [
        {
          title: {
            startsWith: title,
            mode: 'insensitive',
          },
        },
        {
          category: {
            is: {
              categoryName: {
                startsWith: title,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          author: {
            name: {
              startsWith: title,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: { author: { select: { name: true } } },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(posts);
}
