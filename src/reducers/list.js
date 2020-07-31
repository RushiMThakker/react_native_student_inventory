import {List, fromJS} from 'immutable';
import {
  SET_STUDENTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from '../actions/types';

const initialState = List();

const updateStudent = (state, updatedStudent) => {
  const students = state.toJS();
  const updatedStudentIndex = students.findIndex(
    (student) => student.id === updatedStudent.id,
  );
  return List([
    ...students.slice(0, updatedStudentIndex),
    updatedStudent,
    ...students.slice(updatedStudentIndex + 1),
  ]);
};

const deleteStudent = (state, id) => {
  const students = state.toJS();
  const removedStudentIndex = students.findIndex(
    (student) => student.id === id,
  );
  return List([
    ...students.slice(0, removedStudentIndex),
    ...students.slice(removedStudentIndex + 1),
  ]);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return List(action.payload.map((element) => element));
    case ADD_STUDENT:
      return List([...state, action.payload]);
    case UPDATE_STUDENT:
      return updateStudent(state, action.payload);
    case DELETE_STUDENT:
      return deleteStudent(state, action.payload);
    default:
      return state;
  }
};

export default reducer;
