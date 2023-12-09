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
