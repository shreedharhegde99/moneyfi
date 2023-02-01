import { AUTH_USER, USER } from "./auth.actionTypes";

const initState = {
  user: [],
  userData: [],
  isAuth: false,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER:
      return {
        ...state,
        user: payload,
      };

    case AUTH_USER:
      return {
        ...state,
        isAuth: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
