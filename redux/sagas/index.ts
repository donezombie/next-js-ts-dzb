import { Saga } from "redux-saga";
import { all, spawn, call } from "redux-saga/effects";
import todosSaga from "./todosSaga";

export default function* rootSaga() {
  const sagas: Array<Saga> = [todosSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
