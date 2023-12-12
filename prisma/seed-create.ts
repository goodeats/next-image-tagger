import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createImages = async () => {
  const images = [
    {
      url: 'https://pbs.twimg.com/profile_images/1576682558028382208/k14lH7Xi_400x400.jpg',
      title: 'PPPAAATTT',
      alt: 'Image of Pat as triangles',
    },
  ];

  const promises = images.map(async (image) => {
    const { url, title, alt } = image;
    const exists = await prisma.image.findFirst({
      where: { url },
    });

    if (!exists) {
      await prisma.image.create({
        data: {
          url,
          title,
          alt,
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
  // not that efficient, but it works for seeding
  // could perhaps get category first then all tags for that category
  // easy fix for the intern
  const tags = [
    { name: 'male', categoryId: 'Person' },
    { name: 'female', categoryId: 'Person' },
    { name: 'other', categoryId: 'Person' },
    { name: 'new york', categoryId: 'Place' },
    { name: 'paris', categoryId: 'Place' },
    { name: 'maine', categoryId: 'Place' },
    { name: 'computer', categoryId: 'Thing' },
    { name: 'pencil', categoryId: 'Thing' },
    { name: 'headphones', categoryId: 'Thing' },
    { name: 'other', categoryId: 'Other' },
    { name: 'AI', categoryId: 'Other' },
  ];

  const promises = tags.map(async (tag) => {
    const { name, categoryId } = tag;
    const category = await prisma.category.findUnique({
      where: { name: categoryId },
    });

    if (category) {
      console.log(`Category for tagging: ${category.name}`);
      const exists = await prisma.tag.findFirst({
        where: { name },
      });

      if (!exists) {
        console.log(`Category tag: ${name}`);
        await prisma.tag.create({
          data: {
            name,
            categoryId: category.id,
          },
        });
      }
    }
  });

  await Promise.all(promises);
};