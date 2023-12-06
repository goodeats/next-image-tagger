import { lusitana } from '@/app/components/fonts';
import { CreateImage } from '@/app/components/images/buttons';
import ImagesTable from '@/app/components/images/table';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Images',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Images</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search images..." />
        <CreateImage />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ImagesTable />
      </Suspense>
    </div>
  );
}
