import {
  LOADING,
  ERROR,
  SUCCESS,
  MESSAGE,
  CLEAR_MESSAGE,
} from "./info.actionTypes";

const setLoadingStatus = (payload) => ({ type: LOADING, payload });
const setErrorStatus = (payload) => ({ type: ERROR, payload });
const setSuccessStatus = (payload) => ({ type: SUCCESS, payload });
const setMessage = (payload) => ({ type: MESSAGE, payload });
const clearMessage = () => ({ type: CLEAR_MESSAGE });

export {
  setLoadingStatus,
  setErrorStatus,
  setSuccessStatus,
  setMessage,
  clearMessage,
};
