import { FlatList, View, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORIES_ORDER } from '../graphql/queries';
import { useNavigate } from "react-router-dom";
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#24292e',
    height: 120,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryListContainer = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState('latest');
  
  let orderBy = ''
  let orderDirection = ''

  const toSingleRepo = ( id ) => {
    navigate(`/repository/${id}`);
  }

  if (selectedOrder === 'latest') {
    orderBy = 'CREATED_AT'
    orderDirection = 'DESC'
  }

  if (selectedOrder === 'topRating') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'DESC'
  }

  if (selectedOrder === 'lowestRating') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'ASC'
  }

  const { loading, error, data } = useQuery(GET_REPOSITORIES_ORDER, {
    variables: { orderBy, orderDirection },
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = data.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
      <FlatList
            ListHeaderComponent={
            <Picker
              prompt='Select an item...'
              selectedValue={selectedOrder}
              onValueChange={(itemValue) =>
                setSelectedOrder(itemValue)
              }>
              <Picker.Item label="Latest repositories" value="latest" />
              <Picker.Item label="Highest rated repositories" value="topRating" />
              <Picker.Item label="Lowest rated repositories" value="lowestRating" />
            </Picker>}
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
            <Pressable onPress={() => toSingleRepo(item.id)} >
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
              />
          </Pressable>
        )}
      />
  );
};

const RepositoryList = () => {
  
  const { data, loading, error } = useQuery(GET_REPOSITORIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <RepositoryListContainer repositories={data.repositories} />;
};

export { RepositoryList, RepositoryListContainer };