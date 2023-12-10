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
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query Collections {
    collections {
      id
      name
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
