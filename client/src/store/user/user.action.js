import axios from "axios";
import baseURL from "../../network/network";
import getToken from "../../utils/getToken";
import {
	setErrorStatus,
	setLoadingStatus,
	setMessage,
	setSuccessStatus,
} from "../info/info.action";
import { CATEGORIES, CHART_DATA, TRANSACTIONS, USER } from "./user.actionTypes";

const instance = axios.create({
	baseURL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

const setUserDetails = (payload) => ({ type: USER, payload });
const setCategories = (payload) => ({ type: CATEGORIES, payload });
const setTransactions = (payload) => ({ type: TRANSACTIONS, payload });
const setChartData = (payload) => ({ type: CHART_DATA, payload });

const getCategories = (token) => async (dispatch) => {
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

const addNewCategory = (payload, token) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "post",
			url: "/categories",
			data: payload,
			headers: {
				Authorization: token,
			},
		}).then((res) => res.data);
		dispatch(setLoadingStatus(false));
		dispatch(setSuccessStatus(true));
		dispatch(setMessage(res.message));
		dispatch(getCategories(token));
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

const getTransactions = (payload, token) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			url: "/transactions",
			params: payload,
			headers: {
				Authorization: token,
			},
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

const addNewTransaction = (payload, token) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "post",
			url: "/transactions",
			data: payload,
			headers: {
				Authorization: token,
			},
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

const updateTransaction = (payload, token) => async (dispatch) => {
	dispatch(setLoadingStatus(true));
	try {
		let res = await instance({
			method: "patch",
			url: "/transactions",
			data: payload,
			headers: {
				Authorization: token,
			},
		}).then((res) => res.data);

		dispatch(setLoadingStatus(false));
		dispatch(setMessage(res.message));
		dispatch(getTransactions());
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

const getChartData = (payload, token) => async (dispatch) => {
	try {
		let chartData = await instance({
			url: "/chart-data",
			params: payload,
			headers: {
				Authorization: token,
			},
		}).then((res) => res.data.data);
		dispatch(setChartData(chartData));
	} catch (e) {
		console.log("ERROR IN CHART DATA FETCHING", e.message);
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
	getChartData,
};
