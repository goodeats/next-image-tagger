import { Category, Collection, Image, Tag } from '@prisma/client';

export interface IImage extends Image {
  collection: Collection;
  tags: Tag[];
}

export interface ICollection extends Collection {
  images: Image[];
}

export interface ITag extends Tag {
  images: Image[];
  category: Category;
}

export interface ICategory extends Category {
  tags: Tag[];
}
