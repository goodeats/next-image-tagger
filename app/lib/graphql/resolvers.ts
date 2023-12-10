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
  },
};
