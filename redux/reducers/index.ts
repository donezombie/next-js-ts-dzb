
import { combineReducers } from 'redux';
import todosReducer from './todosReducer';

const rootReducers = combineReducers({
  todosReducer,
});

export default rootReducers;