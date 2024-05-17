import { StyleSheet, Pressable, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import ThemeText from './ThemeText';
import { Link } from "react-router-native";

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
};


export default AppBar;