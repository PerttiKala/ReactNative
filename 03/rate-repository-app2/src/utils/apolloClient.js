import { ApolloClient, InMemoryCache } from '@apollo/client';


const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://153.1.154.177:4000/graphql',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

// 'http://192.168.1.103:4000/graphql'



