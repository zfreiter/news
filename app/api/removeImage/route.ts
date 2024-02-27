// Cloudinary imports
import { v2 as cloudinary } from 'cloudinary';
// Next imports
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const removeImage = async (publicId: string) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    console.log('image removed');
  } catch (error) {
    console.log(error);
  }
};

export async function POST(req: Request) {
  const { publicId } = await req.json();

  await removeImage(publicId);
  return NextResponse.json({ message: 'success' });
}
