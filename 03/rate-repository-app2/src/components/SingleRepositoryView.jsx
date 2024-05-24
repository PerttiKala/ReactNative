import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
  
  const ItemSeparator = () => <View style={styles.separator} />;


const SingleRepositoryView = () => {
  const { repositoryId } = useParams();
  console.log(repositoryId);

  const [data, loading, error] = useSingleRepository(repositoryId);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  if (data) {
    const repositoryNodes = [data.repository]
    return (
      <FlatList
        data={repositoryNodes}
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
    );
  }
  }


  
    


export default SingleRepositoryView;