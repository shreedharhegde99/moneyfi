import { CATEGORIES, TRANSACTIONS } from "./user.actionTypes";

const initState = {
	user: "",
	categories: [],
	transactions: [],
};

const userReducer = (state = initState, { type, payload }) => {
	switch (type) {
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

		default:
			return state;
	}
};

export default userReducer;
