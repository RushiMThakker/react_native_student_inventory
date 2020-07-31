import {SET_SEARCH_QUERY, SET_SEARCH_RESULTS} from '../actions/types';
import {Map} from 'immutable';

const initialState = Map([
  ['search_query', ''],
  ['search_results', []],
]);
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return state.updateIn(['search_query'], '', action.payload);
    case SET_SEARCH_RESULTS:
      return state.updateIn(
        ['search_results'],
        '',
        (search_results) => action.payload,
      );
    default:
      return state;
  }
};

export default reducer;
