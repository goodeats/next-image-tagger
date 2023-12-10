'use client';

import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_IMAGE } from '@/app/lib/graphql/queries';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { DeleteImage, UpdateImage } from './buttons';
import { DisplayCard } from '../shared';

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
  const { title, url, alt, createdAt, updatedAt } = image;

  const ImageTimestamps = () => (
    <>
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </>
  );

  const CardContent = () => (
    <>
      <Image
        loader={customLoader}
        src={url}
        alt={alt || 'no alt'}
        width={500}
        height={500}
        objectFit="contain"
        className="rounded-md mb-4"
      />
      <div>Tags: none</div>
    </>
  );

  const CardFooter = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateImage id={id} />
      <DeleteImage id={id} />
    </div>
  );

  return (
    <DisplayCard
      cardHeaderProps={{
        title: title || '(no title)',
        description: <ImageTimestamps />,
      }}
      cardContentProps={{
        children: <CardContent />,
      }}
      cardFooterProps={{
        children: <CardFooter />,
      }}
    />
  );
}
