// Components imports
import PreviewContainer from '@/components/PreviewContainer';
import { Suspense } from 'react';

export default function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <PreviewContainer query={query.trim()} />
    </Suspense>
  );
}
