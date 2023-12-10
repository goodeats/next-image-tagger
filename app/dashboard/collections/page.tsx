import { lusitana } from '@/app/components/fonts';
import { CreateCollection } from '@/app/components/collections/buttons';
import ImagesTable from '@/app/components/collections/table';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Collections',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Collections</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search collections..." />
        <CreateCollection />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ImagesTable />
      </Suspense>
    </div>
  );
}
