// Next imports
import Link from 'next/link';
// Types imports
import { TypeCategory } from '@/app/types/';

const getCategories = async (): Promise<TypeCategory[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, { cache: 'no-cache' });
    const categories = await res.json();
    if (res.ok) {
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function CategoriesList() {
  const categories = await getCategories();

  return (
    <div className='flex flex-wrap gap-2 pt-4 pb-6 border-b'>
      {categories &&
        categories.map((category) => (
          <Link
            href={`/categories/${category.categoryName}`}
            key={category.id}
            className='text-xs lg:text-sm text-gray-800 hover:bg-purple-100 bg-gray-100 px-4 py-1  rounded-full cursor-pointer'
          >
            {category.categoryName}
          </Link>
        ))}
    </div>
  );
}
