import { ReduxCallbacks } from "interfaces/redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useSagaCreators = () => {
  const dispatchRedux = useDispatch();

  const dispatch = useCallback(
    (
      type: string,
      payload?: {
        [key: string | number]: any;
        callbacks: ReduxCallbacks;
      }
    ) => {
      return dispatchRedux({ type, payload });
    },
    [dispatchRedux]
  );

  return {
    dispatch,
  };
};

export default useSagaCreators;
