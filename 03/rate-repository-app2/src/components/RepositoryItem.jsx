import Constants from 'expo-constants';
import { Text, StyleSheet, View, Image } from 'react-native';
import ThemeText from './ThemeText';


const styles = StyleSheet.create({
    container: {
      marginBottom: Constants.statusBarHeight / 2,
      flexGrow: 1,
      backgroundColor: 'white',
      alignItems: 'flex-start',
      flex: 1,
      
    },
    rowContainer: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      gap: 10,
    },
    wrapContainer: {
      marginBottom: Constants.statusBarHeight / 2,
      backgroundColor: 'white',
      flexDirection: 'row',
      flexShrink: 1,
    },
    descText: {
      colour:'grey',
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 13,
    },
    tinyLogo: {
      width: 70,
      height: 70,
    },
  });

const RepositoryItem = ({name, description, language, stars, forks, reviews, rating, image}) => {
    const url = image
    let starsStr = stars
    let forksStr = forks
    if (stars > 1000) {
      let thousands = Math.floor(stars / 1000)
      let hundreds = stars % 1000 - (stars % 100) 
      hundreds = Math.floor(hundreds / 100)
      starsStr = thousands + "." + hundreds + "k"

    }
    if (forks > 1000) {
      let thousands = Math.floor(forks / 1000)
      let hundreds = stars % 1000 - (forks % 100) 
      hundreds = Math.floor(hundreds / 100)
      forksStr = thousands + "." + hundreds + "k"
    }

    return (
      <View testID='repositoryItem' style={styles.container}>
        <View style={styles.rowContainer}>
        <View>
          <Image
                source={{uri: url}}
                style={styles.tinyLogo}
            />
        </View>
          <View style={styles.container}>
            <ThemeText fontWeight='bold'>{name}</ThemeText>
            <View style={styles.container}>
              <Text style={styles.descText}>{description}</Text>
            </View>
            <ThemeText style={{backgroundColor: '#0366d6', color: 'white'}}>{language}</ThemeText>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.container}>
            <Text style={{fontWeight: '700'}}> {starsStr}</Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: '700'}}>{forksStr}</Text>
          <Text>Forks</Text>
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: '700'}}> {reviews}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.container}>
            <Text style={{fontWeight: '700'}}>{rating}</Text>
            <Text>Rating</Text>
          </View>
      </View>

      </View>
    );
  };
  
  export default RepositoryItem;