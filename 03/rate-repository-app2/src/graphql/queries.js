import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repository {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          id
          url
        }
      }
    }
  }
`;



// other queries...