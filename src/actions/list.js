import {
  SET_STUDENTS,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from './types';

export const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    payload: students,
  };
};

export const addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    payload: student,
  };
};

export const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    payload: student,
  };
};

export const deleteStudent = (id) => {
  return {
    type: DELETE_STUDENT,
    payload: id,
  };
};

export const setSearchQuery = (searchQuery) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: searchQuery,
  };
};

export const setSearchResults = (searchResults) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: searchResults,
  };
};
