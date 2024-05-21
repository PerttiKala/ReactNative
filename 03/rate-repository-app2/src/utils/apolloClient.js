import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';


const createApolloClient = () => {
  console.log(Constants.expoConfig.extra.apolloUri)
  return new ApolloClient({
    uri: Constants.expoConfig.extra.apolloUri,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

// 'http://192.168.1.103:4000/graphql'



