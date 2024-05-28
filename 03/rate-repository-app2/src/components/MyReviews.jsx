import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { parseISO } from 'date-fns';
import { USER_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    marginBottom: Constants.statusBarHeight / 3,
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  containerOutter: {
    marginBottom: Constants.statusBarHeight / 2,
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    flex: 1,
  },
  rowContainer: {
    marginTop: Constants.statusBarHeight / 2,
    marginHorizontal: 15,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    gap: 20,
  },
  circle: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    borderRadius: 25, // Half of the width and height to make it a circle
    backgroundColor: 'white', // Background color of the circle
    borderColor: '#0366d6', // Border color
    borderWidth: 2, // Border width
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  number: {
    color: '#0366d6', // Text color
    fontSize: 18, // Adjust the size as needed
    fontWeight: 'bold', // Make the text bold
  },
});



function formatDate(isoDate) {

  const date = parseISO(isoDate)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}


const ReviewItem = ({ review }) => {

  const isoDate = review.createdAt
  const formattedDate = formatDate(isoDate);
  console.log(formattedDate);

  return (
  <View style={styles.containerOutter}>
    <View style={styles.rowContainer}>
      <View style={styles.circle}>
        <Text style={styles.number}>{review.rating}</Text>
      </View>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{fontWeight: 700, fontSize: 16}}>{review.user.username}</Text>
            <Text style={{color: 'grey', fontSize: 15}} >{formattedDate}</Text>
          </View>
          <Text style={{fontSize: 15}}>Review: {review.text}</Text>
        </View>
    </View>
  </View>
  )
}


const MyReviews = () => {

  const {loading, error, data} = useQuery(USER_REVIEWS)

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  if (data) {
    console.log(data)
    const reviews = data.me.reviews.edges.map(edge => edge.node);

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    );
  }
  }


export default MyReviews;