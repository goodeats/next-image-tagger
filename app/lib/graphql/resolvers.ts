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
  },
};
