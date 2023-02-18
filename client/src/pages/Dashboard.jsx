import { Box, Flex, Hide, HStack, Text } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddTransaction from "../components/AddTransaction";
import TransactionChart from "../components/TransactionChart";
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
				<HStack px="6" align="start">
					<Transactions />
					<Hide below="md">
						<TransactionChart />
					</Hide>
				</HStack>
				<AddTransaction />
			</Box>
		</Fragment>
	);
}
