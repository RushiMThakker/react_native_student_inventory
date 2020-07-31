import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Formik} from 'formik';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';

const FormScreen = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid Email Address').required('Required'),
      })}
      onSubmit={(values) => console.log(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        getFieldProps,
      }) => (
        <View style={styles.rootViewStyle}>
          <Text style={styles.headerStyle}> Student Entry Form</Text>
          <View style={styles.fieldContainerStyle}>
            <Text style={styles.fieldStyle}>First Name :</Text>
            <TextInput
              style={styles.inputStyle}
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
            />
          </View>
          {touched.firstName && errors.firstName ? (
            <Text>{errors.firstName}</Text>
          ) : null}
          <View style={styles.fieldContainerStyle}>
            <Text style={styles.fieldStyle}>Last Name :</Text>
            <TextInput
              style={styles.inputStyle}
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
          </View>
          {touched.lastName && errors.lastName ? (
            <Text>{errors.lastName}</Text>
          ) : null}
          <View style={styles.fieldContainerStyle}>
            <Text style={styles.fieldStyle}>Email Address :</Text>
            <TextInput
              style={styles.inputStyle}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </View>
          {touched.email && errors.email ? <Text>{errors.email}</Text> : null}
          <Button
            onPress={handleSubmit}
            style={styles.buttonStyle}
            mode="contained">
            Submit
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  rootViewStyle: {
    padding: 20,
  },
  headerStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
    textAlign: 'center',
  },
  fieldContainerStyle: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  fieldStyle: {
    fontSize: 20,
    flex: 0.4,
  },
  inputStyle: {
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 0.5,
    marginStart: 5,
    flex: 0.6,
  },
  buttonStyle: {
    marginTop: 20,
    marginHorizontal: 40,
  },
});

export default FormScreen;
