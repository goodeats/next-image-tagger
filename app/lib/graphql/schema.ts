export const typeDefs = `#graphql
  scalar DateTime

  type Image {
    id: ID!
    url: String!
    title: String
    alt: String
    createdAt: DateTime
    updatedAt: DateTime
    collectionId: String
    collection: Collection
  }

  type Collection {
    id: ID!
    name: String!
    createdAt: DateTime
    updatedAt: DateTime
    images: [Image]
  }

  type Tag {
    id: ID!
    name: String!
    createdAt: DateTime
    updatedAt: DateTime
    images: [Image]
    categoryId: String
  }

  type Category {
    id: ID!
    name: String!
    createdAt: DateTime
    updatedAt: DateTime
    tags: [Tag]
  }

  type Query {
    hello: String
    images: [Image]
    image(id: ID!): Image
    collections: [Collection]
    collection(id: ID!): Collection
  }

  type Mutation {
    addImage(url: String!, title: String, alt: String, collectionId: String): Image
    updateImage(id: ID!, url: String!, title: String, alt: String, collectionId: String): Image
    deleteImage(id: ID!): Image
    addCollection(name: String!): Collection
  }
`;
