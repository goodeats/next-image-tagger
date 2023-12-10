'use client';

import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/app/lib/graphql/queries';
import { ICategory } from '@/app/lib/definitions';
import { DisplayTable } from '../shared';
import Link from 'next/link';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { Button } from '../ui';
import { UpdateCategory } from './buttons';
import DeleteCategoryForm from './delete-form';

export default function CategoriesTable() {
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const categories: ICategory[] = data?.categories;

  const SmallTable = () => (
    <div className="md:hidden">
      {categories?.map((category) => (
        <div key={category.id} className="mb-2 w-full rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <p>{category.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const rows = categories?.map((category) => ({
    cells: [
      {
        children: (
          <div className="flex items-center gap-3">
            <Button asChild variant="link">
              <Link href={`/dashboard/categories/${category.id}`}>
                <p>{category.name}</p>
              </Link>
            </Button>
          </div>
        ),
      },
      { children: category.tags?.length },
      { children: formatTimeStampsReadable(category.createdAt) },
      {
        children: (
          <div className="flex justify-end gap-3">
            <UpdateCategory id={category.id} />
            <DeleteCategoryForm id={category.id} />
          </div>
        ),
      },
    ],
  }));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary text-foreground-secondary p-2 md:pt-2 md:px-4">
          {/* display for small screens */}
          <SmallTable />

          {/* display for medium and larger screens */}
          <div className="my-4">
            <DisplayTable
              caption={{ children: `${categories?.length} Categories` }}
              headerRows={[
                { children: 'Name' },
                { children: 'Tags' },
                { children: 'Date Added' },
                { children: 'Edit or Delete', className: 'sr-only' },
              ]}
              rows={rows}
              className="hidden md:table"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
