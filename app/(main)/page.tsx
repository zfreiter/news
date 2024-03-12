// Components imports
import PreviewContainer from '@/components/PreviewContainer';

export default function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return <PreviewContainer query={query.trim()} />;
}
