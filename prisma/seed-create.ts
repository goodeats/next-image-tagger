import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCollections = async () => {
  const collections = [{ name: 'Pat' }, { name: 'Celtics' }];

  const promises = collections.map(async (collection) => {
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
  const images = [
    {
      url: 'https://pbs.twimg.com/profile_images/1576682558028382208/k14lH7Xi_400x400.jpg',
      title: 'PPPAAATTT',
      alt: 'Image of Pat as triangles',
      collectionName: 'Pat',
    },
    {
      url: 'https://pbs.twimg.com/profile_images/1729900721695244289/qr4IVsnn_400x400.jpg',
      title: 'Celtics',
      alt: 'Celtics log',
      collectionName: 'Celtics',
    },
    {
      url: 'https://pbs.twimg.com/profile_images/1614721246922514434/_JrJnZ6j_400x400.jpg',
      title: 'Triangles',
      alt: 'Triangles',
    },
  ];

  const promises = images.map(async (image) => {
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
  const categories = [
    { name: 'Person' },
    { name: 'Place' },
    { name: 'Thing' },
    { name: 'Animal' },
    { name: 'Other' },
  ];

  const promises = categories.map(async (category) => {
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
  const tags = [
    { name: 'male', categoryName: 'Person', imageName: 'PPPAAATTT' },
    { name: 'new york', categoryName: 'Place', imageName: 'PPPAAATTT' },
    { name: 'AI', categoryName: 'Other', imageName: 'PPPAAATTT' },
    { name: 'boston', categoryName: 'Place', imageName: 'Celtics' },
    { name: 'logo', categoryName: 'Other', imageName: 'Celtics' },
    { name: 'computer', categoryName: 'Thing', imageName: 'Triangles' },
    { name: 'triangle', categoryName: 'Thing', imageName: 'Triangles' },
    { name: 'dog', categoryName: 'Animal' },
    { name: 'cat', categoryName: 'Animal' },
    { name: 'bird', categoryName: 'Animal' },
  ];

  const promises = tags.map(async (tag) => {
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
