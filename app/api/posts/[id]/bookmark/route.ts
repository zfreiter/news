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

  if (!session || !session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    const found = user?.bookmarks.find((bookmark) => bookmark === id);
    const update = found !== undefined ? false : true;
    if (found !== undefined) {
      // update the user by removing the id from the following array
      try {
        await prisma.user.update({
          where: {
            email: session?.user?.email,
          },
          data: {
            bookmarks: {
              set: user?.bookmarks.filter((bookmark) => bookmark !== id),
            },
          },
        });
      } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
      }
    } else {
      // update the user by adding the id to the following array
      try {
        await prisma.user.update({
          where: {
            email: session?.user?.email,
          },
          data: {
            bookmarks: {
              set: [...(user?.bookmarks || []), id],
            },
          },
        });
      } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
      }
    }
    return NextResponse.json({ update: update }, { status: 200 });
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
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });

    const found = user?.bookmarks.find((bookmark) => bookmark === id);
    if (found !== undefined) {
      return NextResponse.json({ update: true }, { status: 200 });
    } else {
      return NextResponse.json({ update: false }, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
