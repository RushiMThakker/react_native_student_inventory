import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Realm from 'realm';
import Table from '../components/Table';
import {Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setStudents} from '../actions';

const ListScreen = (props) => {
  const headings = ['ID', 'Name', 'Food', 'Age'];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const realmStudents = useRef(null);
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
      realmStudents.current = realm.objects('Student');
    });
    if (!props.students.size > 0) {
      const studentsList = [];
      for (let student of realmStudents.current) {
        const plainStudent = {
          id: student.id,
          name: student.name,
          age: student.age,
          food: student.food,
        };
        studentsList.push(plainStudent);
      }
      props.setStudents(studentsList);
    }
    setSearchResults(props.students);
  }, [props]);

  const onChangeSearch = (query) => {
    const filteredResults = realmStudents.current.filtered(
      'name CONTAINS $0 || age CONTAINS $0 || food CONTAINS $0',
      query,
    );
    setSearchQuery(query);
    setSearchResults(filteredResults);
  };

  return (
    <View style={{flex: 1}}>
      {props.students ? (
        <ScrollView>
          <Searchbar
            style={styles.searchbarStyle}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Table
            headings={headings}
            data={searchResults.map((student) => [
              student.id,
              student.name,
              student.food,
              student.age,
            ])}
            detailCallback={(item) => {
              let clickedStudent = realmStudents.current.filtered(
                'id=$0',
                item,
              );
              console.log('List Screen: Selected student', clickedStudent);
              if (clickedStudent != null) {
                const plainObjectStudent = {
                  id: clickedStudent[0].id,
                  name: clickedStudent[0].name,
                  age: clickedStudent[0].age,
                  food: clickedStudent[0].food,
                };
                console.log(
                  'List Screen: Plain Object Student',
                  plainObjectStudent,
                );
                props.navigation.navigate('Add', {
                  plainObjectStudent,
                  passedName: 'Rushi',
                });
              }
            }}
            style={styles.tableStyle}
          />
        </ScrollView>
      ) : (
        <Text>Loading from database...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tableStyle: {
    margin: 10,
  },
  searchbarStyle: {
    justifyContent: 'center',
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    students: state.students,
  };
};
export default connect(mapStateToProps, {
  setStudents,
})(ListScreen);
