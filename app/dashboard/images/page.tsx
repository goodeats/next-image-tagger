import { Breadcrumbs } from '@/app/components/shared';
import { CreateImage } from '@/app/components/images/buttons';
import ImagesTable from '@/app/components/images/table';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Images',
};

type PageProps = {
  searchParams?: {
    filter?: string;
    page?: number;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const filter = searchParams?.filter || '';
  const page = searchParams?.page || 1;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Images', href: '/dashboard/images' }]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search images..." />
          <CreateImage />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ImagesTable filter={filter} page={page} />
        </Suspense>
      </div>
    </>
  );
}
