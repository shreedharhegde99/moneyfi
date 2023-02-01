import axios from "axios";
import baseURL from "../../network/network";
import { AUTH_USER, USER } from "./auth.actionTypes";

const instance = axios.create({
  baseURL,
});
instance.defaults.headers.post["Content-Type"] = "application/json";

const currentUser = (payload) => ({ type: USER, payload });
const updateUserAuth = (payload) => ({ type: AUTH_USER, payload });

const signupUser = (payload) => async (dispatch) => {
  try {
    let res = await instance({
      method: "post",
      url: "/signup",
      data: payload,
    }).then((res) => res.data);
  } catch (e) {
    console.log("ERROR IN FETCHING", e.message);
  }
};

const loginUser = (payload) => async (dispatch) => {
  try {
    let res = await instance({
      method: "post",
      url: "/login",
      data: payload,
    });
  } catch (e) {
    console.log("ERROR IN FETCHING", e.message);
  }
};

export { signupUser, loginUser, currentUser, updateUserAuth };
