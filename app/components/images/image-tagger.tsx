'use client';

import Image from 'next/image';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import ImageTagsForm from './tags-form';

export default function ImageTagger({ image }: { image: IImage }) {
  const { url, alt, tags, collection } = image;

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
      </div>
      <ImageTagsForm image={image} />
    </div>
  );
}
