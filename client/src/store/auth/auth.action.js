import axios from "axios";
import baseURL from "../../network/network";
import storeToken from "../../utils/storeToken";
import {
	clearMessage,
	setErrorStatus,
	setLoadingStatus,
	setMessage,
	setSuccessStatus,
} from "../info/info.action";
import { AUTH_USER, USER } from "./auth.actionTypes";

const instance = axios.create({
	baseURL,
});
instance.defaults.headers.post["Content-Type"] = "application/json";

const currentUser = (payload) => ({ type: USER, payload });
const updateUserAuth = (payload) => ({ type: AUTH_USER, payload });

const signupUser = (payload) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "post",
			url: "/signup",
			data: payload,
		}).then((res) => res.data);

		dispatch(setLoadingStatus(false));
		dispatch(setSuccessStatus(true));
		dispatch(setMessage(res.message));
	} catch (e) {
		console.log("ERROR IN USER SIGNUP", e.response.data.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const loginUser = (payload) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let { message, token } = await instance({
			method: "post",
			url: "/login",
			data: payload,
		}).then((res) => res.data);
		dispatch(setLoadingStatus(false));
		storeToken(token);
		dispatch(setSuccessStatus(true));
		dispatch(setMessage(message));
		dispatch(updateUserAuth(true));
	} catch (e) {
		console.log("ERROR IN USER LOGIN", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const tokenAuthUser = (payload) => async (dispatch) => {
	try {
		let res = await instance({
			url: "token-auth",
			headers: {
				Authorization: payload,
			},
		}).then((e) => e.data);
		dispatch(updateUserAuth(true));
		console.log(`=>  res:`, res);
	} catch (e) {
		console.log("ERROR IN RETURN USER SESSION VALIDATE", e.message);
	}
};

export { signupUser, loginUser, currentUser, updateUserAuth, tokenAuthUser };
