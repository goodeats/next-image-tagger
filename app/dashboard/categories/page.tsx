import { Breadcrumbs } from '@/app/components/shared';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateCategory } from '@/app/components/categories/buttons';
import CategoriesTable from '@/app/components/categories/table';

export const metadata: Metadata = {
  title: 'Tags',
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[{ label: 'Categories', href: '/dashboard/categories' }]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search categories..." />
          <CreateCategory />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesTable />
        </Suspense>
      </div>
    </>
  );
}
