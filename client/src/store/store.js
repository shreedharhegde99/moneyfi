import {
	legacy_createStore as createStore,
	combineReducers,
	compose,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/auth.reducer";
import infoReducer from "./info/info.reducer";

const reducer = combineReducers({ auth: authReducer, info: infoReducer });
const logger =
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, compose(applyMiddleware(thunk), logger));

export default store;
