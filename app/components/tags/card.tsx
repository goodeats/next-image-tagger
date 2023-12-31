'use client';

import { useQuery } from '@apollo/client';
import { GET_TAG } from '@/app/lib/graphql/queries';
import { IImage, ITag } from '@/app/lib/definitions';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateTag } from './buttons';
import DeleteTagForm from './delete-form';
import {
  Button,
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

type TagCardProps = {
  tag: ITag;
};

export default function TagCard({ tag }: TagCardProps) {
  const { id, name, createdAt, updatedAt, images, category } = tag;

  const Category = () => {
    return (
      <div>
        <h6 className="text-h6 mb-2">Category</h6>
        <Button asChild variant="link">
          <Link href={`/dashboard/categories/${category.id}`}>
            {category.name}
          </Link>
        </Button>
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
    <div className="flex space-x-4">
      <UpdateTag id={id} />
      <DeleteTagForm id={id} />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Tag details</CardDescription>
      </CardHeader>
      <CardContent>
        <Category />
        <Separator className="my-4" />
        <ImagesGrid images={images as IImage[]} />
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
