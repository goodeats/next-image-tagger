'use client';

import Image from 'next/image';
import { UpdateImage } from '@/app/components/images/buttons';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '@/app/lib/graphql/queries';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import { DisplayTable } from '../shared';
import Link from 'next/link';
import DeleteImageForm from './delete-form';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { Button } from '../ui';
import { DisplayTableCellLink } from '../shared/display-table';

export default function ImagesTable() {
  const { data, loading, error } = useQuery(GET_IMAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const images: IImage[] = data?.images;

  const TableImage = ({ image }: { image: IImage }) => (
    <Image
      loader={customLoader}
      src={image.url}
      className="rounded-full"
      width={28}
      height={28}
      alt={image.alt || 'image'}
    />
  );

  const SmallTable = () => (
    <div className="md:hidden">
      {images?.map((image) => (
        <div key={image.id} className="mb-2 w-full rounded-md bg-white p-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <div className="mb-2 flex items-center">
                <TableImage image={image} />
                <p>{image.title}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const CollectionCell = ({ image }: { image: IImage }) => {
    if (!image.collectionId) return <p>n/a</p>;

    const { collection } = image;

    return (
      <DisplayTableCellLink href={`/dashboard/collections/${collection.id}`}>
        {collection?.name || 'Collection'}
      </DisplayTableCellLink>
    );
  };

  const rows = images?.map((image) => ({
    cells: [
      {
        children: (
          <DisplayTableCellLink href={`/dashboard/images/${image.id}`}>
            <TableImage image={image} />
          </DisplayTableCellLink>
        ),
      },
      {
        children: (
          <DisplayTableCellLink href={`/dashboard/images/${image.id}`}>
            {image.title || '(no title)'}
          </DisplayTableCellLink>
        ),
      },
      { children: <CollectionCell image={image} /> },
      { children: formatTimeStampsReadable(image.createdAt) },
      { children: image.tags?.length || 0 },
      {
        children: (
          <div className="flex justify-end gap-3">
            <UpdateImage id={image.id} />
            <DeleteImageForm id={image.id} />
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
              caption={{ children: `${images?.length} Images` }}
              headerRows={[
                { children: 'Image', className: 'w-[100px]' },
                { children: 'Title' },
                { children: 'Collection' },
                { children: 'Date Added' },
                { children: 'Tags' },
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
