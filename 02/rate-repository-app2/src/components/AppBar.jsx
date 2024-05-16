import { StyleSheet, Pressable, View } from 'react-native';
import Constants from 'expo-constants';
import ThemeText from './ThemeText';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-evenly',
  },
  pressable: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-evenly',
  },

  text: {
    color: "white",
    fontSize: 20,
  }
  // ...
});

const AppBar = ({AppName}) => {
  return (
  <View style={styles.container}>
    <Pressable style={styles.pressable}>
      <ThemeText fontWeight={"bold"} fontSize={"subheading"} color={"textSecondary"}>
        {AppName} 
      </ThemeText>
     </Pressable>
  </View>
  )
};


export default AppBar;