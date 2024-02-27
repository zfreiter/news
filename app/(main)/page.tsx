// Components imports
import PreviewContainer from '@/components/PreviewContainer';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';

  return <PreviewContainer query={query.trim()}  />;
}
