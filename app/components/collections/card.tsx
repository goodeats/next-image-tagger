'use client';

import { ICollection } from '@/app/lib/definitions';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateCollection } from './buttons';
import DeleteCollectionForm from './delete-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '../ui';
import Link from 'next/link';
import Image from 'next/image';
import { customLoader } from '@/app/lib/image-utils';

type CollectionCardProps = {
  collection: ICollection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { id, name, createdAt, updatedAt, images } = collection;

  const Images = () => {
    const NoImages = () => <div className="text-muted-foreground">none</div>;

    const WithImages = () => (
      <div className="grid grid-cols-4 gap-6">
        {images.map((image) => {
          const { url, alt } = image;
          return (
            <Link key={image.id} href={`/dashboard/images/${image.id}`}>
              <div className="border rounded-md">
                <Image
                  loader={customLoader}
                  src={url}
                  alt={alt || 'no alt'}
                  width={500}
                  height={500}
                  objectFit="contain"
                  className="flex rounded-md mb-4"
                />
              </div>
            </Link>
          );
        })}
      </div>
    );

    return (
      <div>
        <h6 className="text-h6 mb-2">Images</h6>
        {images.length ? <WithImages /> : <NoImages />}
      </div>
    );
  };

  const TimeStamps = () => (
    <div className="text-body-xs text-muted-foreground">
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const Buttons = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateCollection id={id} />
      <DeleteCollectionForm id={id} />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Collection Details</CardDescription>
      </CardHeader>
      <CardContent>
        <Images />
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
