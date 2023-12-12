'use client';

import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_IMAGE } from '@/app/lib/graphql/queries';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateImage } from './buttons';
import DeleteImageForm from './delete-form';
import Link from 'next/link';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '../ui';

type ImageCardProps = {
  id: string;
};

export default function ImageCard({ id }: ImageCardProps) {
  const { data, loading, error } = useQuery(GET_IMAGE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const image: IImage = data?.image;
  if (!image) return <p>Image not found</p>;
  const { title, url, alt, createdAt, updatedAt, tags, collection } = image;

  const CardImage = () => (
    <Image
      loader={customLoader}
      src={url}
      alt={alt || 'no alt'}
      width={500}
      height={500}
      objectFit="contain"
      className="rounded-md mb-4"
    />
  );

  const Collection = () => {
    const NoCollection = () => (
      <div className="text-muted-foreground">none</div>
    );

    const WithCollection = () => (
      <Button asChild variant="link">
        <Link href={`/dashboard/collections/${collection?.id}`}>
          {collection.name}
        </Link>
      </Button>
    );

    return (
      <div className="">
        <h6 className="text-h6 mb-2">Collection</h6>
        {collection ? <WithCollection /> : <NoCollection />}
      </div>
    );
  };

  const Tags = () => (
    <div className="flex flex-col space-y-4">
      <h6 className="text-h6 mb-2">Tags</h6>
      <div>
        {tags?.map((tag) => (
          <Link key={tag.id} href={`/dashboard/tags/${tag.id}`}>
            <Badge className="mr-2 mb-2">{tag.name}</Badge>
          </Link>
        ))}
      </div>
      <div>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/images/${id}/tags`}>Edit Tags</Link>
        </Button>
      </div>
    </div>
  );

  const TimeStamps = () => (
    <div className="text-body-xs text-muted-foreground">
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const Buttons = () => (
    <div className="flex space-x-4">
      <UpdateImage id={id} />
      <DeleteImageForm id={id} />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || '(no title)'}</CardTitle>
        <CardDescription>Image details</CardDescription>
      </CardHeader>
      <CardContent>
        <CardImage />
        <Collection />
        <Separator className="my-4" />
        <Tags />
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
