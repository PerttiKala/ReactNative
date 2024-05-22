import { gql, useMutation } from '@apollo/client';


const MUTATE = gql`
    mutation Mutation($credentials: AuthenticateInput) {
        authenticate(credentials: $credentials) {
        accessToken
        }
    }
`;

const useSignIn = () => {
    const [mutate, { data }] = useMutation(MUTATE);
  
    const signIn = async ({ username, password }) => {
        try {
            await mutate({
                variables: {
                    credentials: {
                        username,
                        password
                    }
                }
            });
        } catch (error) {
            console.log("Error during authentication:", error)
        }
    };
    
    console.log(data)
    return [signIn, data];
  };

export default useSignIn
  