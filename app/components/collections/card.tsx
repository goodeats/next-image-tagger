'use client';

import { ICollection, IImage } from '@/app/lib/definitions';
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
import ImagesGrid from '../images/images-grid';

type CollectionCardProps = {
  collection: ICollection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { id, name, createdAt, updatedAt, images } = collection;

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
        <ImagesGrid images={images as IImage[]} />
        <Separator />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
