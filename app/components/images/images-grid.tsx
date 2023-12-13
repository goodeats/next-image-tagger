'use client';

import Image from 'next/image';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';
import Link from 'next/link';

type Props = {
  images: IImage[];
};

export default function ImagesGrid({ images }: Props) {
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
}
