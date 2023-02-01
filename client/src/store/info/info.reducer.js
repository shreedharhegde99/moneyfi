import {
  LOADING,
  ERROR,
  SUCCESS,
  MESSAGE,
  CLEAR_MESSAGE,
} from "./info.actionTypes";

const initState = {
  error: false,
  success: false,
  loading: false,
  message: "",
};

const infoReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
      };
    case SUCCESS:
      return {
        ...state,
        success: payload,
      };

    case MESSAGE:
      return {
        ...state,
        message: "",
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };

    default:
      return state;
  }
};
export default infoReducer;
