'use client';

import Image from 'next/image';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import ImageTagsForm from './tags-form';
import { Badge } from '../ui';

export default function ImageTagger({ image }: { image: IImage }) {
  const { url, alt, tags, collection } = image;

  const Tags = () => (
    <div>
      <p>Tags:</p>
      {tags?.map((tag) => (
        <Badge key={tag.id} className="mr-2 mb-2">
          {tag.name}
        </Badge>
      ))}
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Image
          loader={customLoader}
          src={url}
          alt={alt || 'no alt'}
          width={500}
          height={500}
          objectFit="contain"
          className="rounded-md mb-4"
        />
        <div>Collection: {collection?.name || 'n/a'}</div>
        <Tags />
      </div>
      <ImageTagsForm image={image} />
    </div>
  );
}
