import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
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