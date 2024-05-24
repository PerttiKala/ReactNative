import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import {RepositoryList} from './RepositoryList';
import AppBar from './AppBar';
import {SignInVals} from './SignIn';
import SingleRepositoryView from './SingleRepositoryView';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    justifyContent: 'space-around',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar AppName={"Repositories"}/>
      <View style={styles.container}>
      <Routes>
        <Route path="/" element={<RepositoryList />} />      
        <Route path='/SignIn' element={<SignInVals />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repository/:repositoryId" element={<SingleRepositoryView />} />
      </Routes>
      </View>
    </View>
  );
};

export default Main;