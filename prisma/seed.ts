import { PrismaClient } from '@prisma/client';
import {
  createCategories,
  createCollections,
  createImages,
  createTags,
} from './seed-create';
const prisma = new PrismaClient();

const resetDb = async () => {
  await prisma.image.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
};

const seedRun = async () => {
  console.log('Start seeding...');

  console.log('Resetting database...');
  await resetDb();
  console.log('Database reset.');

  console.log('Creating collections...');
  await createCollections();
  console.log('Collections created.');

  console.log('Creating images...');
  await createImages();
  console.log('Images created.');

  console.log('Creating categories...');
  await createCategories();
  console.log('Categories created.');

  console.log('Creating tags...');
  await createTags();
  console.log('Tags created.');

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
