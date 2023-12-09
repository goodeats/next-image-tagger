import { Collection, Image } from '@prisma/client';

export interface IImage extends Image {
  collection: Collection;
}

export interface ICollection extends Collection {
  images: Image[];
}

export type CollectionField = {
  id: string;
  name: string;
};
