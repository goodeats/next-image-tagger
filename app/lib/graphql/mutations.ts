import { gql } from '@apollo/client';

export const ADD_IMAGE = gql`
  mutation AddImage(
    $url: String!
    $title: String
    $alt: String
    $collectionId: String
  ) {
    addImage(url: $url, title: $title, alt: $alt, collectionId: $collectionId) {
      id
      url
      title
      alt
      createdAt
      updatedAt
      collectionId
    }
  }
`;

export const UPDATE_IMAGE = gql`
  mutation UpdateImage(
    $id: ID!
    $url: String!
    $title: String
    $alt: String
    $collectionId: String
  ) {
    updateImage(
      id: $id
      url: $url
      title: $title
      alt: $alt
      collectionId: $collectionId
    ) {
      id
      url
      title
      alt
      createdAt
      updatedAt
      collectionId
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: ID!) {
    deleteImage(id: $id) {
      id
      url
      title
      alt
      createdAt
      updatedAt
      collectionId
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation AddCollection($name: String!) {
    addCollection(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollection($id: ID!, $name: String!) {
    updateCollection(id: $id, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($id: ID!) {
    deleteCollection(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const ADD_TAG = gql`
  mutation AddTag($name: String!, $categoryId: String) {
    addTag(name: $name, categoryId: $categoryId) {
      id
      name
      createdAt
      updatedAt
      categoryId
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $name: String!, $categoryId: String) {
    updateTag(id: $id, name: $name, categoryId: $categoryId) {
      id
      name
      createdAt
      updatedAt
      categoryId
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id
      name
      createdAt
      updatedAt
      categoryId
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TAGS_TO_IMAGE = gql`
  mutation UpdateTagsOnImage($imageId: ID!, $tagIds: [ID!]!) {
    updateTagsOnImage(imageId: $imageId, tagIds: $tagIds) {
      id
      title
      tags {
        id
        name
      }
    }
  }
`;
