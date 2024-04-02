'use client';
// Next imports
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Types imports
import { TypePost } from '@/app/types';
// React imports
import { useEffect, useState } from 'react';
// Icons: Heroicons
import { PhotoIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
// Cloudinary imports
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
// Components imports
import TiptapMainEditor from './TiptapMainEditor';

export default function Page({ story }: { story: TypePost }) {
  // State
  const [titleInput, setTitleInput] = useState(story.title);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryInput, setCategoryInput] = useState(story.categoryName);
  const [links, setLinks] = useState<string[]>(story.links);
  const [linkInput, setLinkInput] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(story.imageUrl);
  const [publicId, setPublicId] = useState<string>(story.publicId);
  const [richText, setRichText] = useState<string>(story.content);
  const [error, setError] = useState<{
    titleError: string;
    categoryError: string;
    contentError: string;
  }>({
    titleError: '',
    categoryError: '',
    contentError: '',
  });

  const router = useRouter();

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let foundError = false;
    setLoading(true);
    if (
      titleInput.trim().length === 0 ||
      richText.trim().length < 8 ||
      categoryInput.trim().length === 0
    ) {
      foundError = true;
      setError({
        titleError: titleInput.trim().length === 0 ? 'Title cannot be empty' : '',
        categoryError: categoryInput.trim().length === 0 ? 'Category cannot be empty' : '',
        contentError: richText.trim().length < 8 ? 'Content cannot be empty' : '',
      });
    }

    if (foundError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/posts/${story.id}`, {
        cache: 'no-cache',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleInput,
          content: richText,
          category: categoryInput.trim().toUpperCase(),
          links: links,
          imageUrl: imageUrl,
          publicId: publicId,
          authorEmail: story.authorEmail,
        }),
      });

      if (res.ok) {
        router.refresh();
        router.push('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Handle Links
  const handleLinkAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const trimmed = linkInput.trim();

    if (trimmed.length > 0) {
      console.log('trimmed ', trimmed);
      setLinks([...links, trimmed]);
      setLinkInput('');
    }
  };

  // remove link
  const handleLinkRemove = (index: number) => {
    setLoading(true);
    setLinks(links.filter((link, i) => i !== index));
    setLoading(false);
  };

  // handle image upload
  const onImageUpload = (result: CldUploadWidgetResults) => {
    setLoading(true);
    const info = result.info as Object;
    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string;
      const publc_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(publc_id);
    }
    setLoading(false);
  };

  // handle image removal
  const handleImageRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/removeImage', {
        cache: 'no-cache',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        setImageUrl('');
        setPublicId('');
        console.log('image removed');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setError({
      titleError: titleInput.trim().length !== 0 ? '' : error.titleError,
      categoryError: categoryInput.trim().length !== 0 ? '' : error.categoryError,
      contentError: richText.trim().length > 8 ? '' : error.contentError,
    });
  }, [
    titleInput,
    richText,
    categoryInput,
    error.titleError,
    error.categoryError,
    error.contentError,
  ]);

  return (
    <div role='main' className='my-8'>
      <h2 className='text-2xl font-medium mb-2'>Edit Post</h2>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label htmlFor='title' className='sr-only'>
          Title
        </label>
        <input
          type='text'
          id='title'
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className='border border-slate-200 mb-2 px-4 py-2 rounded-lg'
        />
        {error && <div className='text-red-600 mb-2'>{error.titleError}</div>}

        <TiptapMainEditor description={richText} onChange={setRichText} />
        {error && <div className='text-red-600 mb-2'>{error.contentError}</div>}

        <label htmlFor='category' className='sr-only'>
          Category
        </label>
        <input
          type='text'
          id='category'
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className='border border-slate-200 mb-2 px-4 py-2 rounded-lg'
        />
        {error && <div className='text-red-600 mb-2'>{error.categoryError}</div>}

        <label htmlFor='links' className='sr-only'>
          links
        </label>
        <div className='flex gap-2'>
          <div className='flex-auto'>
            <input
              type='text'
              id='links'
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder='Copy and paste links here'
              className='w-full border border-slate-200 px-4 py-2 rounded-lg'
            />
          </div>
          <button
            className={`w-[6.25rem] bg-blue-600 hover:bg-blue-300 text-white m-auto px-4 py-2 rounded-lg disabled:opacity-75 
              disabled:bg-gray-300 disabled:cursor-not-allowed
            `}
            disabled={loading}
            onClick={handleLinkAdd}
          >
            + add
          </button>
        </div>

        {links.map((link, index) => (
          <div key={index} className='flex gap-2 my-2'>
            <Link
              href={link}
              target='_blank'
              className='flex-auto bg-slate-200 px-4 py-2 rounded-lg'
            >
              {link}
            </Link>
            <TrashIcon
              className='flex my-auto w-8 h-8 hover:scale-110 hover:fill-red-500'
              onClick={() => handleLinkRemove(index)}
            />
          </div>
        ))}

        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          className={`flex flex-col relative justify-center items-center h-40  mt-2 ${
            !imageUrl && 'rounded-lg bg-slate-100 border border-dotted border-black'
          } cursor-pointer ${imageUrl && 'pointer-events-none'}`}
          onUpload={onImageUpload}
        >
          <PhotoIcon className='w-28 h-28 text-gray-400' />
          <div className='font-semibold text-gray-600'>Post picture</div>
          {imageUrl && (
            <Image src={imageUrl} fill alt={titleInput} className='object-coverrounded-lg' />
          )}
        </CldUploadButton>
        {imageUrl && (
          <button
            className={`bg-red-600 hover:bg-red-300 text-white w-fit mt-2 px-4 py-2 rounded-lg ${
              loading && 'bg-blue-300 cursor-not-allowed'
            }`}
            disabled={loading}
            onClick={handleImageRemove}
          >
            Remove Image
          </button>
        )}

        <div className='flex gap-x-6'>
          <button
            type='submit'
            className={`mt-4 bg-blue-600 hover:bg-blue-300 text-white w-full m-auto px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
            disabled={loading}
          >
            Update
          </button>
          <button
            className={`mt-4 border border-slate-500 hover:border-red-300 hover:bg-red-300 text-slate-500 hover:text-white w-full m-auto px-4 py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
            disabled={loading}
            onClick={() => router.push(`/blog/${story.id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
