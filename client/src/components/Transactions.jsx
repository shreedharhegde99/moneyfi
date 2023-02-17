import { Box } from "@chakra-ui/react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../store/user/user.action";
import TransactionCard from "./TransactionCard";

export default function Transactions() {
	const { transactions } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTransactions());
	}, []);
	return (
		<Fragment>
			<Box maxW="container.sm" p="6" pb="20">
				{transactions.map((el) => (
					<TransactionCard data={el} key={el.date} />
				))}
			</Box>
		</Fragment>
	);
}
