import React, {useState, useEffect, useRef, memo} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import Realm from 'realm';
import {addStudent, updateStudent, deleteStudent} from '../actions';
import {connect} from 'react-redux';

const AddScreen = memo((props) => {
  const plainObjectStudent = props.route.params
    ? props.route.params.plainObjectStudent
    : null;
  const realmRef = useRef();
  useEffect(() => {
    const StudentSchema = {
      name: 'Student',
      primaryKey: 'id',
      properties: {
        id: 'int',
        name: 'string',
        age: 'string',
        food: 'string',
      },
    };
    Realm.open({schema: [StudentSchema], schemaVersion: 1}).then((realm) => {
      realmRef.current = realm;
    });
    props.route.params ? props.navigation.setOptions({title: 'Edit'}) : null;
  }, [props.navigation, props.route.params]);

  const [name, setName] = useState(
    plainObjectStudent ? plainObjectStudent.name : '',
  );
  const [food, setFood] = useState(
    plainObjectStudent ? plainObjectStudent.food : '',
  );
  const [age, setAge] = useState(
    plainObjectStudent ? plainObjectStudent.age : '',
  );
  console.log('Add Screen: Selected student', plainObjectStudent);

  return (
    <View style={styles.centeredView}>
      <View style={styles.formStyle}>
        <View style={styles.fieldStyle}>
          <Text style={styles.textStyle}> Enter name: </Text>
          <TextInput
            style={styles.inputStyle}
            value={name}
            onChangeText={(newText) => setName(newText)}
          />
        </View>
        <View style={styles.fieldStyle}>
          <Text style={styles.textStyle}> Enter favorite food: </Text>
          <TextInput
            style={styles.inputStyle}
            value={food}
            onChangeText={(newText) => setFood(newText)}
          />
        </View>
        <View style={styles.fieldStyle}>
          <Text style={styles.textStyle}> Enter age: </Text>
          <TextInput
            style={styles.inputStyle}
            value={age}
            onChangeText={(newText) => setAge(newText)}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        {plainObjectStudent ? (
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              try {
                realmRef.current.write(() => {
                  realmRef.current.create(
                    'Student',
                    {id: plainObjectStudent.id, name, age, food},
                    'modified',
                  );
                });
                props.updateStudent({
                  id: plainObjectStudent.id,
                  name,
                  age,
                  food,
                });
                props.navigation.navigate('List');
              } catch (err) {
                console.log(err);
              }
            }}>
            <Text style={styles.buttonTextStyle}>Update Student</Text>
          </Pressable>
        ) : null}

        {!plainObjectStudent ? (
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              if (name && food && age) {
                realmRef.current.write(() => {
                  const students = realmRef.current.objects('Student');
                  const student = realmRef.current.create('Student', {
                    id: students.length * 2,
                    name,
                    age,
                    food,
                  });
                  console.log(student);
                  props.addStudent(student);
                });
              } else {
                ToastAndroid.show(
                  'All three fields are required',
                  ToastAndroid.LONG,
                );
              }
            }}>
            <Text style={styles.buttonTextStyle}>Add Student</Text>
          </Pressable>
        ) : null}

        {plainObjectStudent ? (
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              Alert.alert(
                'Delete Student',
                `Are you sure you want to delete ${name} from database?`,
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      try {
                        realmRef.current.write(() => {
                          const deletedStudent = realmRef.current
                            .objects('Student')
                            .filtered('id=$0', plainObjectStudent.id);
                          realmRef.current.delete(deletedStudent);
                        });
                        props.deleteStudent(plainObjectStudent.id);
                        props.navigation.navigate('List');
                      } catch (err) {
                        console.log(err);
                      }
                    },
                  },
                  {
                    text: 'No',
                  },
                ],
              );
            }}>
            <Text style={styles.buttonTextStyle}>Delete Student</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  formStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fieldStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 14,
    flex: 0.4,
  },
  inputStyle: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 0.6,
    marginStart: 10,
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    margin: 20,
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 14,
  },
});

export default connect(null, {addStudent, updateStudent, deleteStudent})(
  AddScreen,
);
