import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resetDb = async () => {
  await prisma.image.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
};

const createImages = async () => {
  const images = [
    {
      url: 'https://pbs.twimg.com/profile_images/1576682558028382208/k14lH7Xi_400x400.jpg',
      title: 'Image 1',
      alt: 'Image 1',
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

const createCategories = async () => {
  const categories = [
    {
      name: 'Person',
    },
    {
      name: 'Place',
    },
    {
      name: 'Thing',
    },
    {
      name: 'Other',
    },
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

const seedRun = async () => {
  console.log('Start seeding...');

  console.log('Resetting database...');
  await resetDb();
  console.log('Database reset.');

  console.log('Creating images...');
  await createImages();
  console.log('Images created.');

  console.log('Creating categories...');
  await createCategories();
  console.log('Categories created.');

  console.log('Seeding finished.');
};

export async function seed() {
  await seedRun();
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
