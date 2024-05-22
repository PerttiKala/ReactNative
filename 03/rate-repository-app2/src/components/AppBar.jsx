import { StyleSheet, Pressable, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import ThemeText from './ThemeText';
import { Link } from "react-router-native";
import { gql, useQuery } from '@apollo/client';

import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';


const GET_USER = gql`
  query Query {
    me {
      username
    }
  }
`;


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'space-evenly',
    justifyContent: 'space-evenly',
  },
  pressable: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  scrollView: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    justifyContent: 'flex-start',
    flexGrow: 1,
    gap: 10,
    height: 120,
  },

  text: {
    color: "white",
    fontSize: 20,
  }
});


const AppBar = ({AppName}) => {
  
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { loading, error, data } = useQuery(GET_USER)

  const logOut = async () => {
    try {
      console.log("log out plz!!");
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  
  if (loading) {
    return null;
  }

  if (error || !data?.me) {
    console.log(data)
    return (
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Pressable style={styles.pressable}>
          <Link to="/">
            <ThemeText fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
              {AppName} 
            </ThemeText>
          </Link>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Link to="/SignIn">
            <ThemeText color={"textSecondary"} fontSize={"subheading"}>
              Sign in</ThemeText>
          </Link>
        </Pressable>
      </ScrollView>
    )
  }

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollView}>
      <Pressable style={styles.pressable}>
        <Link to="/">
          <ThemeText fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
            {AppName} 
          </ThemeText>
        </Link>
      </Pressable>
      <Pressable style={styles.pressable}>
        <Link onPress={logOut} to="/SignIn">
          <ThemeText color={"textSecondary"} fontSize={"subheading"}>
            Sign Out</ThemeText>
        </Link>
      </Pressable>
    </ScrollView>
  )
};


export default AppBar;