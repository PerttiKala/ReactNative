import ThemeText from "./ThemeText";
import Constants from 'expo-constants';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';


const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#0366d6',
    flexDirection: 'row',
    justifyContent: 'center'
  },
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <ThemeText fontWeight='bold' color='textSecondary'>Sing in</ThemeText>
      </Pressable>
    </View>
  );
};

const SignInVals = () => {
  const onSubmit = values => {
    console.log(values.username);
    console.log(values.password);
  };
  return <SignInForm onSubmit={onSubmit}/>;
};



export default SignInVals;