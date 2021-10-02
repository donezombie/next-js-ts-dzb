import { ResponseGenerator } from 'interfaces';
import { call, put, takeLatest } from 'redux-saga/effects'
import todoServices from 'services/todoServices'
import actionTypes from '../actions/actionTypes';

function* loadTodoList() {
  try {
    const response: ResponseGenerator = yield call(todoServices.getTodos);
    console.log({ response });
    yield put({ type: actionTypes.GET_TODO_LIST_SUCCESS, payload: response?.data });
  } catch (error) {
    yield put({ type: actionTypes.GET_TODO_LIST_FAILED, error });
  }
}

export default function* watchSaga() {
  yield takeLatest(actionTypes.GET_TODO_LIST, loadTodoList)
}