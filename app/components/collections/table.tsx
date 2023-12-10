'use client';

import { UpdateImage } from '@/app/components/images/buttons';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS, GET_IMAGES } from '@/app/lib/graphql/queries';
import { ICollection } from '@/app/lib/definitions';
import { DisplayTable } from '../shared';
import Link from 'next/link';
import DeleteImageForm from './delete-form';
import { formatTimeStampsReadable } from '@/app/lib/format-date';

export default function CollectionsTable() {
  const { data, loading, error } = useQuery(GET_COLLECTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const collections: ICollection[] = data?.collections;
  console.log(collections);

  const SmallTable = () => (
    <div className="md:hidden">
      {collections?.map((collection) => (
        <div
          key={collection.id}
          className="mb-2 w-full rounded-md bg-white p-4"
        >
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <p>{collection.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const rows = collections?.map((collection) => ({
    cells: [
      {
        children: (
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/collections/${collection.id}`}>
              <p>{collection.name}</p>
            </Link>
          </div>
        ),
      },
      { children: collection.images?.length },
      { children: formatTimeStampsReadable(collection.createdAt) },
      {
        children: (
          <div className="flex justify-end gap-3">
            <UpdateImage id={collection.id} />
            <DeleteImageForm id={collection.id} />
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
              caption={{ children: `${collections?.length} Collections` }}
              headerRows={[
                { children: 'Name' },
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
