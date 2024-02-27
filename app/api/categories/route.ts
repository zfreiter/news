// Next imports
import { NextResponse } from 'next/server';
// Next-auth imports
import { authOptions } from '../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
// Prisma imports
import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { categoryName } = await req.json();

  if (!categoryName)
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 500 });

  try {
    const newCategory = await prisma.category.create({
      data: {
        categoryName,
      },
    });
    //console.log('New category created', newCategory);
    return NextResponse.json(newCategory);
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Error, something went wrong' }, { status: 500 });
  }
}
