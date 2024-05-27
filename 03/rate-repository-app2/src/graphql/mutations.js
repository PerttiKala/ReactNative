import { gql } from '@apollo/client';

const ADD_REVIEW = gql`
    mutation CreateReview($repoOwnerName: String!, $repoName: String!, $rating: Int!, $review: String) {
      createReview(review: {
        repositoryName: $repoName,
        ownerName: $repoOwnerName,
        rating: $rating,
        text: $review
      }) {
        repository {
          name
          id
        }
      }
    }
  `;


const CREATE_USER = gql`
mutation Mutation($username: String!, $password: String!) {
    createUser(user: {
      username: $username,
      password: $password,
    }) {
      id
    }
  }
    `;
    


export {ADD_REVIEW, CREATE_USER}