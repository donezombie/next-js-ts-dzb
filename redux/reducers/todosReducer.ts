import ReducerInterface from 'interfaces/reducerInterface';
import produce from 'immer';
import actionTypes from 'redux/actions/actionTypes';


const initialState = {
  todos: {
    data: [],
    loading: false,
    error: null,
  },
};

const todosReducer = (state = initialState, action: ReducerInterface) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case actionTypes.GET_TODO_LIST:
        draftState.todos.loading = true;
        break;

      case actionTypes.GET_TODO_LIST_SUCCESS:
        draftState.todos.loading = false;
        draftState.todos.data = action.payload;
        break;

      case actionTypes.GET_TODO_LIST_FAILED:
        draftState.todos.loading = false;
        draftState.todos.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default todosReducer;