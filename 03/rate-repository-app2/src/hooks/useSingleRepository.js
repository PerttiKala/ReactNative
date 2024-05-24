import { gql, useQuery } from '@apollo/client';

const GET_URL = gql`
    query($repositoryId: ID!) {
        repository(id: $repositoryId) {
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
`;

const useSignleRepository = (repositoryId) => {

  const  { data, loading, error } = useQuery(GET_URL, {
        variables: { repositoryId },
  });

return [data, loading, error]

}

export default useSignleRepository;