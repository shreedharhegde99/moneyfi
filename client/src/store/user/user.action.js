import axios from "axios";
import baseURL from "../../network/network";
import getToken from "../../utils/getToken";
import { CATEGORIES, TRANSACTIONS } from "./user.actionTypes";

const token = getToken();
const instance = axios.create({
	baseURL,
	headers: {
		Authorization: token,
	},
});

instance.defaults.headers.post["Content-Type"] = "application/json";

const setUserDetails = (payload) => ({ type: USER, payload });
const setCategories = (payload) => ({ type: CATEGORIES, payload });
const setTransactions = (payload) => ({ type: TRANSACTIONS, payload });

const getCategories = () => async (dispatch) => {
	try {
		let {
			user: { name, categories },
		} = await instance({
			url: "/categories",
			headers: {
				Authorization: token,
			},
		});
		dispatch(setCategories(categories));
	} catch (e) {
		console.log("ERROR IN FETCHING USER CATEGORIES", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const addNewCategory = (payload) => async (dispatch) => {
	try {
		let res = await instance({
			method: "post",
			url: "/categories",
		});
	} catch (e) {
		console.log("ERROR IN ADDING NEW CATEGORY", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const removeCategory = (id) => async (dispatch) => {
	try {
	} catch (e) {
		console.log("ERROR IN DELETING THE CATEGORY", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

export { getCategories, addNewCategory, removeCategory };
