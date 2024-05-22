import { gql, useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import useAuthStorage from '../hooks/useAuthStorage';

const MUTATE = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const [mutate, { data, loading, error }] = useMutation(MUTATE);

  const signIn = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          credentials: {
            username,
            password
          }
        }
      });

      if (response && response.data) {
        const token = response.data.authenticate.accessToken;
        console.log(token);
        await authStorage.setAccessToken(token);
        apolloClient.resetStore();
        navigate("/");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
    }
  };

  return [signIn, { data, loading, error }];
};

export default useSignIn;