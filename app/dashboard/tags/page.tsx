import { Breadcrumbs } from '@/app/components/shared';
import Search from '@/app/components/search';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateTag } from '@/app/components/tags/buttons';
import TagsTable from '@/app/components/tags/table';

export const metadata: Metadata = {
  title: 'Tags',
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs breadcrumbs={[{ label: 'Tags', href: '/dashboard/tags' }]} />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search tags..." />
          <CreateTag />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TagsTable />
        </Suspense>
      </div>
    </>
  );
}
