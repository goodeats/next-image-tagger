'use client';

import { useQuery } from '@apollo/client';
import { GET_TAG } from '@/app/lib/graphql/queries';
import { ITag } from '@/app/lib/definitions';
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

type TagCardProps = {
  id: string;
};

export default function TagCard({ id }: TagCardProps) {
  const { data, loading, error } = useQuery(GET_TAG, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tag: ITag = data?.tag;
  if (!tag) return <p>Tag not found</p>;
  const { name, createdAt, updatedAt, images, category } = tag;

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
        <Images />
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
