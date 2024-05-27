import ThemeText from "./ThemeText";
import Constants from 'expo-constants';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";


const initialValues = {
  username: '',
  passwordFirst: '',
  passwordSecond: '',
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 6,
  },
  inputValid: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    padding: 10,
  },
  inputInvalid: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    padding: 10,
    borderColor: '#d73a4a',
  },
  button: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#0366d6',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#0366d6',
  },
  error: {
    margin: 2,
    padding: 4,
    color: '#d73a4a',
  },
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  passwordFirst: yup
    .string()
    .required('Password is required')
    .min(5, "Password must be over 5 characters long")
    .max(30, 'Password can\'t have over 30 characters'),
  passwordSecond: yup
    .string()
    .oneOf([yup.ref('passwordFirst'), null], 'Passwords don\'t match')
    .required('Password confirmation is required')
    .min(5, "Password must be over 5 characters long")
    .max(30, 'Password can\'t have over 30 characters'),
});


const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[formik.touched.username && formik.errors.username ?
        styles.inputInvalid : styles.inputValid]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[formik.touched.passwordFirst && formik.errors.passwordFirst ?
        styles.inputInvalid : styles.inputValid]}
        secureTextEntry={true}
        placeholder="Password"
        value={formik.values.passwordFirst}
        onChangeText={formik.handleChange('passwordFirst')}
      />
      {formik.touched.passwordFirst && formik.errors.passwordFirst && (
        <Text style={styles.error}>{formik.errors.passwordFirst}</Text>
      )}
      <TextInput
        style={[formik.touched.passwordSecond && formik.errors.passwordSecond ?
        styles.inputInvalid : styles.inputValid]}
        secureTextEntry={true}
        placeholder="Password confirmation"
        value={formik.values.passwordSecond}
        onChangeText={formik.handleChange('passwordSecond')}
      />
      {formik.touched.passwordSecond && formik.errors.passwordSecond && (
        <Text style={styles.error}>{formik.errors.passwordSecond}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <ThemeText fontWeight='bold' color='textSecondary'>Sign up</ThemeText>
      </Pressable>
    </View>
  );
};

const SignUpVals = () => {
  const [signIn] = useSignIn(); // Assume you have a custom hook useSignIn
  const [mutate] = useMutation(CREATE_USER);

  const onSubmit = async (values) => {
    const { username, passwordFirst } = values;
    console.log(username);
    console.log(passwordFirst);

    // Create user and sign in
    try {
      const response = await mutate({
        variables: {
          username,
          password: passwordFirst
        }
      });

      console.log('Created new user:', response);

      // Try signing in the user
      try {
        await signIn({ username, password: passwordFirst });
      } catch (signInError) {
        console.error('Error during sign-in:', signInError);
      }

    } catch (mutationError) {
      console.error('Error during registration:', mutationError);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};



export {SignUpVals, SignUpContainer};