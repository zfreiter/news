// use-debounce imports
import { useDebouncedCallback } from 'use-debounce';
// Icons: Heroicons imports
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// Next imports
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// 
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className='relative flex-1 flex-shrink-0 min-[600px]:mx-8 flex'>
      <input
        type='text'
        className='peer block w-full rounded-lg border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        name='search'
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
