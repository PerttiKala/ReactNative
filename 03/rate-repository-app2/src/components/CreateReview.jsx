import ThemeText from "./ThemeText";
import Constants from 'expo-constants';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { ADD_REVIEW } from "../graphql/mutations";
import {useMutation} from '@apollo/client';

const initialValues = {
  repoOwnerName: '',
  repoName: '',
  rating: 0,
  review: '',
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
});

const validationSchema = yup.object().shape({
  repoOwnerName: yup
    .string()
    .required('Repository owner name is required'),
  repoName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating can\'t be less than 0 ')
    .max(100, 'Rating can\'t be more than 100'),
  review: yup
    .string()
});

const CreateReviewContainer = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={formik.touched.repoOwnerName && formik.errors.repoOwnerName ?
          styles.inputInvalid : styles.inputValid}
        placeholder="Repository owner name"
        value={formik.values.repoOwnerName}
        onChangeText={formik.handleChange('repoOwnerName')}
      />
      {formik.touched.repoOwnerName && formik.errors.repoOwnerName && (
        <Text style={styles.error}>{formik.errors.repoOwnerName}</Text>
      )}
      <TextInput
        style={formik.touched.repoName && formik.errors.repoName ?
          styles.inputInvalid : styles.inputValid}
        placeholder="Repository name"
        value={formik.values.repoName}
        onChangeText={formik.handleChange('repoName')}
      />
      {formik.touched.repoName && formik.errors.repoName && (
        <Text style={styles.error}>{formik.errors.repoName}</Text>
      )}
      <TextInput
        style={formik.touched.rating && formik.errors.rating ?
          styles.inputInvalid : styles.inputValid}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={formik.touched.review && formik.errors.review ?
          styles.inputInvalid : styles.inputValid}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline={true}
        textAlignVertical="top"
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.error}>{formik.errors.review}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <ThemeText fontWeight='bold' color='textSecondary'>Create a review</ThemeText>
      </Pressable>
    </View>
  );
};

const CreateReviewVals = () => {
  
  const [mutate] = useMutation(ADD_REVIEW);
  const navigate = useNavigate();

  const addReview = async ({ repoOwnerName, repoName, rating, review }) => {
    try {
      const response = await mutate({
        variables: {
            repoOwnerName,
            repoName,
            rating: parseInt(rating, 10), // Ensure the rating is an integer
            review
        }
      });

      if (response && response.data) {
        console.log("Review added successfully:", response.data);
        const repoId = response.data.createReview.repository.id
        navigate(`/repository/${repoId}`);
      }

    } catch (e) {
      console.log("Error:", e);
    }
  };

  const onSubmit = async (values) => {
    const { repoOwnerName, repoName, rating, review } = values;
    console.log(repoOwnerName);
    console.log(repoName);
    console.log(rating);
    console.log(review);

    await addReview({ repoOwnerName, repoName, rating, review });
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export { CreateReviewVals, CreateReviewContainer };
