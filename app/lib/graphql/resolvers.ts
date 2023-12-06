import { Context } from '@/pages/api/graphql';

export const resolvers = {
  Query: {
    hello: () => 'world',
    images: async (parent: any, args: any, context: Context) => {
      return await context.prisma.image.findMany();
    },
  },
};
