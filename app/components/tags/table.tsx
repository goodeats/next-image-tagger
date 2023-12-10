'use client';

import { useQuery } from '@apollo/client';
import { GET_TAGS } from '@/app/lib/graphql/queries';
import { ITag } from '@/app/lib/definitions';
import { DisplayTable } from '../shared';
import Link from 'next/link';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { Button } from '../ui';
// import DeleteCollectionForm from './delete-form';

export default function TagsTable() {
  const { data, loading, error } = useQuery(GET_TAGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tags: ITag[] = data?.tags;
  console.log(tags);

  const SmallTable = () => (
    <div className="md:hidden">
      {tags?.map((tag) => (
        <div key={tag.id} className="mb-2 w-full rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <p>{tag.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const rows = tags?.map((tag) => ({
    cells: [
      {
        children: (
          <div className="flex items-center gap-3">
            <Button asChild variant="link">
              <Link href={`/dashboard/tags/${tag.id}`}>
                <p>{tag.name}</p>
              </Link>
            </Button>
          </div>
        ),
      },
      { children: tag.category?.name || 'n/a' },
      { children: tag.images?.length },
      { children: formatTimeStampsReadable(tag.createdAt) },
      {
        children: (
          <div className="flex justify-end gap-3">
            {/* <UpdateCollection id={tag.id} />
            <DeleteCollectionForm id={tag.id} /> */}
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
              caption={{ children: `${tags?.length} Tags` }}
              headerRows={[
                { children: 'Name' },
                { children: 'Category' },
                { children: 'Images' },
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
