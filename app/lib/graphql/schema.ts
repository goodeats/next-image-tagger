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
    tags: [Tag]
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
    categoryId: String!
    category: Category
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
    tags: [Tag]
    tag(id: ID!): Tag
    categories: [Category]
    category(id: ID!): Category
  }

  type Mutation {
    addImage(url: String!, title: String, alt: String, collectionId: String): Image
    updateImage(id: ID!, url: String!, title: String, alt: String, collectionId: String): Image
    deleteImage(id: ID!): Image
    addCollection(name: String!): Collection
    updateCollection(id: ID!, name: String!): Collection
    deleteCollection(id: ID!): Collection
    addTag(name: String!, categoryId: String): Tag
    updateTag(id: ID!, name: String!, categoryId: String): Tag
    deleteTag(id: ID!): Tag
    addCategory(name: String!): Category
    updateCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): Category
    updateTagsOnImage(imageId: ID!, tagIds: [ID!]!): Image
  }
`;
