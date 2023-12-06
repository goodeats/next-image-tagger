import { Collection, Image } from '@prisma/client';

export interface IImage extends Image {
  collection: Collection;
}
