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
