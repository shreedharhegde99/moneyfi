import axios from "axios";
import baseURL from "../../network/network";
import getToken from "../../utils/getToken";
import {
	setErrorStatus,
	setLoadingStatus,
	setMessage,
} from "../info/info.action";
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
		}).then((res) => res.data);

		dispatch(setCategories(categories));
		dispatch(setUserDetails(name));
	} catch (e) {
		console.log("ERROR IN FETCHING USER CATEGORIES", e.message);
		dispatch(setLoadingStatus(false));
	}
};

const addNewCategory = (payload) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "post",
			url: "/categories",
			data: payload,
		}).then((res) => res.data);
		dispatch(setLoadingStatus(false));
		dispatch(setSuccessStatus(true));
		dispatch(setMessage(res.message));
	} catch (e) {
		console.log("ERROR IN ADDING NEW CATEGORY", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const removeCategory = (id) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		dispatch(setLoadingStatus(true));
	} catch (e) {
		console.log("ERROR IN DELETING THE CATEGORY", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const getTransactions = () => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			url: "/transactions",
		}).then((res) => res.data);
		dispatch(setLoadingStatus(false));
		dispatch(setTransactions(res.data));
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const addNewTransaction = (payload) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "post",
			url: "/transactions",
			data: payload,
		}).then((res) => res.data);

		dispatch(setLoadingStatus(false));
		dispatch(setMessage(res.message));
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

const updateTransaction = (payload) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "patch",
			url: "/transactions",
			data: payload,
		}).then((res) => res.data);

		dispatch(setLoadingStatus(false));
		dispatch(setMessage(res.message));
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};
const removeTransaction = (id) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "patch",
			url: `/transactions/${id}`,
		}).then((res) => res.data);

		dispatch(setLoadingStatus(false));
		dispatch(setMessage(res.message));
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		dispatch(setLoadingStatus(false));
		dispatch(setErrorStatus(true));
		dispatch(setMessage(e.response.data.message));
	}
};

export {
	getCategories,
	addNewCategory,
	removeCategory,
	getTransactions,
	addNewTransaction,
	updateTransaction,
	removeTransaction,
};
