import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import Constants from 'expo-constants';

import { parseISO, format } from 'date-fns';

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

const ItemSeparator = () => <View style={styles.separator} />;


function formatDate(isoDate) {

  const date = parseISO(isoDate)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

const RepositoryInfo = ({ repository }) => {
  return (
    <FlatList
        data={repository}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
            <RepositoryItem
              key={item.id}  // Changed key from item.key to item.id to avoid confusion
              name={item.fullName}
              description={item.description}
              language={item.language}
              stars={item.stargazersCount}
              forks={item.forksCount}
              reviews={item.reviewCount}
              rating={item.ratingAverage}
              image={item.ownerAvatarUrl}
              repoUrl={item.url}
              showLink={true}
            />
        )}
      />
  )
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


const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  console.log(repositoryId);

  const [data, loading, error] = useSingleRepository(repositoryId);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  if (data) {
    const repository = [data.repository]
    const reviews = data.repository.reviews.edges.map(edge => edge.node);

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        // ...
      />
    );
  }
  }


  
    


export default SingleRepositoryView;