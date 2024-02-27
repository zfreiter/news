// This file contains the route for the posts API
// This file is responsible for creating and fetching posts
// Next imports
import { NextRequest, NextResponse } from 'next/server';
// Next-auth imports
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, links, comments, category, imageUrl, publicId } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 500 });
  }

  let catName = null;
  try {
    catName = await prisma.category.findUnique({
      where: { categoryName: category.toUpperCase() },
    });

    if (!catName) {
      catName = await prisma.category.create({
        data: { categoryName: category.toUpperCase() },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const authorEmail = session?.user?.email as string;
  const authorImageUrl = session?.user?.image;
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorImageUrl,
        publicId,
        categoryName: category.toUpperCase(),
        authorEmail,
        links,
        comments,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' });
  }
}

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || '1';

  let numberToSkip = 6 * (parseInt(page) - 1);

  try {
    const posts = await prisma.post.findMany({
      skip: numberToSkip,
      take: 6,
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
