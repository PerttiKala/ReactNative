import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const toSingleRepo = ( id ) => {
    navigate(`/repository/${id}`);
  }

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
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