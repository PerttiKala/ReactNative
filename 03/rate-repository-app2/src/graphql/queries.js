import { gql } from '@apollo/client';

const GET_REPOSITORIES = gql`
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

const GET_REPOSITORIES_ORDER = gql`
  query Query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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

export {GET_REPOSITORIES, GET_REPOSITORIES_ORDER}


// other queries...