import { Box, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddTransaction from "../components/AddTransaction";
import Transactions from "../components/Transactions";
import { getCategories } from "../store/user/user.action";

export default function Dashboard() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategories());
	}, []);

	return (
		<Fragment>
			<Box>
				<Box>{/* <Text>Welcome {user}</Text> */}</Box>
				<AddTransaction />
				<Transactions />
			</Box>
		</Fragment>
	);
}
