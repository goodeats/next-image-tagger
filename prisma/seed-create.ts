import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {
  collectionsSeedJson,
  imagesSeedJson,
  categoriesSeedJson,
  tagsSeedJson,
} from './seed-data';

export const createCollections = async () => {
  const promises = collectionsSeedJson.map(async (collection) => {
    const { name } = collection;
    const exists = await prisma.collection.findFirst({
      where: { name },
    });

    if (!exists) {
      await prisma.collection.create({
        data: {
          name,
        },
      });
    }
  });

  await Promise.all(promises);
};

export const createImages = async () => {
  const promises = imagesSeedJson.map(async (image) => {
    const { url, title, alt, collectionName } = image;
    const exists = await prisma.image.findFirst({
      where: { url },
    });

    if (!exists) {
      const collection = collectionName
        ? await prisma.collection.findUnique({
            where: { name: collectionName },
          })
        : null;

      await prisma.image.create({
        data: {
          url,
          title,
          alt,
          collectionId: collection?.id,
        },
      });
    }
  });

  await Promise.all(promises);
};

export const createCategories = async () => {
  const promises = categoriesSeedJson.map(async (category) => {
    const { name } = category;
    const exists = await prisma.category.findUnique({
      where: { name },
    });

    if (!exists) {
      await prisma.category.create({
        data: {
          name,
        },
      });
    }
  });

  await Promise.all(promises);
};

export const createTags = async () => {
  const promises = tagsSeedJson.map(async (tag) => {
    const { name, categoryName, imageName } = tag;
    let exists = await prisma.tag.findFirst({
      where: { name },
    });

    if (!exists) {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });

      if (!category) return;

      const tag = await prisma.tag.create({
        data: {
          name,
          categoryId: category.id,
        },
      });

      if (imageName) {
        const image = await prisma.image.findFirst({
          where: { title: imageName },
        });

        if (image) {
          await prisma.tagsOnImages.create({
            data: {
              imageId: image.id,
              tagId: tag.id,
            },
          });
        }
      }
    }
  });

  await Promise.all(promises);
};
