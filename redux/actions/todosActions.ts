import { ReduxCallbacks } from 'interfaces/redux';
import actionTypes from './actionTypes';

export const getTodosList = (callbacks: ReduxCallbacks) => ({
  type: actionTypes.GET_TODO_LIST,
  payload: { callbacks },
});

export const getTodosListSuccess = (payload: any) => ({
  type: actionTypes.GET_TODO_LIST_SUCCESS,
  payload,
});

export const getTodosListFailed = (payload: any) => ({
  type: actionTypes.GET_TODO_LIST_FAILED,
  payload,
});