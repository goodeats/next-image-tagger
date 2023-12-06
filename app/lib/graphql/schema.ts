export const typeDefs = `#graphql
  type Image {
    id: ID!
    url: String!
    title: String
    alt: String
    createdAt: String
    updatedAt: String
    collectionId: String
  }

  type Collection {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    images: [Image]
  }

  type Tag {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    images: [Image]
    categoryId: String
  }

  type Category {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    tags: [Tag]
  }

  type Query {
    hello: String
    images: [Image]
  }
`;
