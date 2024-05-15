import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flexGrow: 1,
      flexShrink: 1,
    },
  });

const RepositoryItem = ({name, description, language, stars, forks, reviews, rating}) => {
    return (
      <View style={styles.container}>
        <Text>Full name: {name}</Text>
        <Text>Description: {description}</Text>
        <Text>Language: {language}</Text>
        <Text>Stars: {stars}</Text>
        <Text>Forks: {forks}</Text>
        <Text>Reviews: {reviews}</Text>
        <Text>Rating: {rating}</Text>
      </View>
    );
  };
  
  export default RepositoryItem;