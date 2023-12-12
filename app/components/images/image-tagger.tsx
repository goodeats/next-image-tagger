'use client';

import Image from 'next/image';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import ImageTagsForm from './tags-form';
import { Badge } from '../ui';

export default function ImageTagger({ image }: { image: IImage }) {
  const { url, alt, tags } = image;
  const imageTagIds = tags.map((tag) => tag.id);

  const ColumnImage = () => (
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

  const Tags = () => (
    <div className="flex flex-col space-y-4">
      <h6 className="text-h6 mb-2">Current Tags</h6>
      <div>
        {tags?.map((tag) => (
          <Badge key={tag.id} className="mr-2 mb-2">
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <ColumnImage />
        <Tags />
      </div>
      <ImageTagsForm image={image} tagIds={imageTagIds} />
    </div>
  );
}
