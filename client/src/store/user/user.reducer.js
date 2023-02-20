import { USER } from "../auth/auth.actionTypes";
import { CATEGORIES, CHART_DATA, TRANSACTIONS } from "./user.actionTypes";

const initState = {
	user: "",
	categories: [],
	transactions: [],
	chartData: [],
};

const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case USER:
			return {
				...state,
				user: payload,
			};
		case CATEGORIES:
			return {
				...state,
				categories: payload,
			};
		case TRANSACTIONS:
			return {
				...state,
				transactions: payload,
			};
		case CHART_DATA:
			return {
				...state,
				chartData: payload,
			};

		default:
			return state;
	}
};

export default userReducer;
