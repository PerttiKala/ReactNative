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

const GET_REPOSITORIES_FILTER = gql`
  query Query($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          name
          ownerAvatarUrl
          ownerName
          ratingAverage
          reviewCount
          stargazersCount
        }
      }
    }
  }
`;

const USER_REVIEWS = gql`
  query GetReviews {
    me {
      reviews {
        edges {
          node {
            createdAt
            id
            rating
            repository {
              fullName
              url
            }
            text
            user {
              username
            }
          }
        }
      }
    }
  }
  `;


export {GET_REPOSITORIES, GET_REPOSITORIES_ORDER, GET_REPOSITORIES_FILTER, USER_REVIEWS}


// other queries...