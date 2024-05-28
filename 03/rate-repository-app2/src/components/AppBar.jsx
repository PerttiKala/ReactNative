import { StyleSheet, Pressable, ScrollView, View} from 'react-native';
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
    paddingHorizontal: 10,
    backgroundColor: '#24292e',
    height: 120,
  },
  pressable: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  scrollView: {
    flexGrow: 1,
    gap: 16,
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
      <View style={styles.container}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
          <Pressable style={styles.pressable}>
            <Link to="/">
              <ThemeText fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
                {AppName} 
              </ThemeText>
            </Link>
          </Pressable>
          <Pressable style={styles.pressable}>
            <Link to="/CreateReview">
              <ThemeText fontWeight={"bold"} color={"textSecondary"} fontSize={"subheading"}>
                Create a review</ThemeText>
            </Link>
          </Pressable>
          <Pressable style={styles.pressable}>
            <Link to="/SignIn">
              <ThemeText fontWeight={"bold"} color={"textSecondary"} fontSize={"subheading"}>
                Sign in</ThemeText>
            </Link>
          </Pressable>
          <Pressable style={styles.pressable}>
            <Link to="/SignUp">
              <ThemeText fontWeight={"bold"} color={"textSecondary"} fontSize={"subheading"}>
                Sign up</ThemeText>
            </Link>
          </Pressable>
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Pressable style={styles.pressable}>
          <Link to="/">
            <ThemeText fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
              {AppName} 
            </ThemeText>
          </Link>
        </Pressable>
        <Pressable style={styles.pressable}>
            <Link to="/CreateReview">
              <ThemeText color={"textSecondary"} fontSize={"subheading"}>
                Create a review</ThemeText>
            </Link>
          </Pressable>
          <Pressable style={styles.pressable}>
            <Link to="/MyReviews">
              <ThemeText color={"textSecondary"} fontSize={"subheading"}>
                My reviews</ThemeText>
            </Link>
          </Pressable>
        <Pressable style={styles.pressable}>
          <Link onPress={logOut} to="/SignIn">
            <ThemeText color={"textSecondary"} fontSize={"subheading"}>
              Sign Out</ThemeText>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  )
};


export default AppBar;