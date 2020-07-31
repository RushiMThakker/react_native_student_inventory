import ListReducer from './list';
import SearchReducer from './search';
import {combineReducers} from 'redux';

export default combineReducers({students: ListReducer, search: SearchReducer});
