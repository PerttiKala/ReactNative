import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';

import { useQuery } from '@apollo/client';
import  {GET_REPOSITORIES}  from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  
const {data, loading, error} = useQuery(GET_REPOSITORIES)

if (loading) return <Text>Loading...</Text>;
if (error) return <Text>Error: {error.message}</Text>;

  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
    <RepositoryItem
      key={item.key}
      name={item.fullName}
      description={item.description}
      language={item.language}
      stars={item.stargazersCount}
      forks={item.forksCount}
      reviews={item.reviewCount}
      rating={item.ratingAverage}
      image={item.ownerAvatarUrl}>
    </RepositoryItem>
  )}
  />
  );
};

export default RepositoryList;