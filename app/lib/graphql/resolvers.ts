import { Context } from '@/pages/api/graphql';

export const resolvers = {
  Query: {
    hello: () => 'world',
    images: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.findMany();
    },
    image: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    collections: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.findMany();
    },
    collection: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    tags: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.findMany();
    },
    tag: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    categories: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.findMany();
    },
    category: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Image: {
    tags: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.findMany({
        where: {
          images: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
    collection: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.findUnique({
        where: {
          id: parent.collectionId,
        },
      });
    },
  },
  Collection: {
    images: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.findMany({
        where: {
          collectionId: parent.id,
        },
      });
    },
  },
  Tag: {
    images: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.findMany({
        where: {
          tags: {
            some: {
              id: parent.id,
            },
          },
        },
      });
    },
    category: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.findUnique({
        where: {
          id: parent.categoryId,
        },
      });
    },
  },
  Category: {
    tags: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.findMany({
        where: {
          categoryId: parent.id,
        },
      });
    },
  },
  Mutation: {
    addImage: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.create({
        data: {
          url: args.url,
          title: args.title,
          alt: args.alt,
          collectionId: args.collectionId,
        },
      });
    },
    updateImage: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.update({
        where: {
          id: args.id,
        },
        data: {
          url: args.url,
          title: args.title,
          alt: args.alt,
          collectionId: args.collectionId,
        },
      });
    },
    deleteImage: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.delete({
        where: {
          id: args.id,
        },
      });
    },
    addCollection: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.create({
        data: {
          name: args.name,
        },
      });
    },
    updateCollection: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    deleteCollection: async (parent: any, args: any, context: Context) => {
      return await context.prisma.collection.delete({
        where: {
          id: args.id,
        },
      });
    },
    addTag: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.create({
        data: {
          name: args.name,
          categoryId: args.categoryId,
        },
      });
    },
    updateTag: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          categoryId: args.categoryId,
        },
      });
    },
    deleteTag: async (parent: any, args: any, context: Context) => {
      return await context.prisma.tag.delete({
        where: {
          id: args.id,
        },
      });
    },
    addCategory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.create({
        data: {
          name: args.name,
        },
      });
    },
    updateCategory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    deleteCategory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.category.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
