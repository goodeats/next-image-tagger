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
