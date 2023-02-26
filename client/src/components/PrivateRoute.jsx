import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
	const { isAuth } = useSelector((state) => state.auth);

	if (isAuth) {
		return <Fragment>{props.children}</Fragment>;
	}
	return <Navigate to="/login" />;
}
