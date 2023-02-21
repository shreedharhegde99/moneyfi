import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import TransactionChart from "../components/TransactionChart";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function AllRoutes() {
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/charts" element={<TransactionChart />} />
			</Routes>
		</Fragment>
	);
}
