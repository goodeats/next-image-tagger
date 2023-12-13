import { Breadcrumbs } from '@/app/components/shared';
import { CreateCollection } from '@/app/components/collections/buttons';
import Table from '@/app/components/collections/table';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Collections',
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Collections', href: '/dashboard/collections' }]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search collections..." />
          <CreateCollection />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Table />
        </Suspense>
      </div>
    </>
  );
}
