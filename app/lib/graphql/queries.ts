import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query Images {
    images {
      id
      url
      title
      alt
      createdAt
      updatedAt
      collectionId
      collection {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query Collections {
    collections {
      id
      name
      createdAt
      updatedAt
      images {
        id
        url
        title
        alt
      }
    }
  }
`;

export const GET_IMAGE = gql`
  query Image($id: ID!) {
    image(id: $id) {
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

export const GET_COLLECTION = gql`
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      name
      createdAt
      updatedAt
      images {
        id
        url
        title
        alt
      }
    }
  }
`;

export const GET_TAGS = gql`
  query Tags {
    tags {
      id
      name
      createdAt
      updatedAt
      categoryId
      category {
        id
        name
      }
      images {
        id
        url
        title
        alt
      }
    }
  }
`;

export const GET_TAG = gql`
  query Tag($id: ID!) {
    tag(id: $id) {
      id
      name
      createdAt
      updatedAt
      categoryId
      category {
        id
        name
      }
      images {
        id
        url
        title
        alt
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      createdAt
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      name
      createdAt
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;
